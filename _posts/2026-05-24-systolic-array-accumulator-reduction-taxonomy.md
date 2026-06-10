---
title: "Systolic Array 里的 Accumulator 归约，到底有几类？"
date: 2026-05-24 20:00:00 +0800
excerpt: "从时域归约、阵列内波前归约、树形归约到 3D 分层归约，结合 MAERI、SIGMA、STONNE 和 3D Mapping 几篇论文梳理 systolic array 的 partial sum 组织方式。"
categories:
  - blog
tags:
  - systolic-array
  - accelerator-architecture
  - dataflow
  - dnn-accelerator
  - reduction-network
published: false
---

在看 systolic array 相关内容的时候，大家通常先讨论 dataflow: output-stationary、weight-stationary、input-stationary。  
但如果再往下追一层，会发现真正决定时延、利用率和可扩展性的，往往不是乘法本身，而是 **partial sum 到底在哪里归约、以什么路径归约、以及归约完之后还要不要再回写**。

这篇文章想专门梳理这个问题。结论先放前面：

> 如果把 systolic array 的 accumulator 设计按“归约发生的位置”来分类，大致可以分成四类：`PE 内时域归约`、`阵列内波前归约`、`独立空间归约网络`、`分层/跨子阵列归约`。  
> 其中 `MAERI` 和 `SIGMA` 代表的是把归约从刚性的阵列传播里“拿出来”，做成可重构的独立网络；`Mapping Systolic Arrays Onto 3D Circuit Structures` 则进一步把分层归约延伸到第三维；`STONNE` 则说明了一个很重要的工程事实：**归约网络如果不为 folding 设计好，理论吞吐和实际吞吐会差很多。**

## 为什么“归约”是 systolic array 的核心问题

对一个输出元素来说，乘法只是第一步，后面一定跟着加法归并：

```text
out(i, j) = sum_k[A(i, k) * B(k, j)]
```
加法的归约方式不同会导致不同的 memory access， 从而导致energy的增加。

当 `k` 很大时，问题就变成了：

- 这些乘积是在同一个 PE 里累加，还是边流动边累加？
- 如果一个子阵列装不下完整 dot-product，partial sum 要不要写回 buffer 再回来？
- 如果 workload 是稀疏的、形状不规则的，固定拓扑的 adder tree 还能不能高利用率地工作？
- 当阵列被切成多个 subarray 之后，跨 subarray 的归约是在二维平面上走长线，还是在更高层次上做？

所以，“accumulator 归约方式”其实决定了 accelerator 的三个基本性质：

- 延迟复杂度是线性的还是对数级的
- 对规则/不规则 workload 的适应能力
- psum 是否会频繁离开计算阵列，造成额外带宽和利用率损失

## 一个更实用的分类框架

### 1. PE 内时域归约

第一类最直观：一个 PE 或一个小 cluster 反复接收属于同一输出的乘积，然后在本地 accumulator 里逐拍累加。这也是Output Stationary的累加方式。

它的特点是：

- 归约位置在本地寄存器或本地 buffer
- 不需要复杂的全局加法网络
- 延迟通常随 dot-product 长度线性增长
- 当一个输出需要很多轮折叠计算时，容易出现 psum 存回再读回的问题

这类方式的优点是控制简单、局部性好；缺点是当 `k` 很大、或者一个输出必须分多轮完成时，归约路径虽然短，但总时间并不短。

`SIGMA` 对这类方式有一个很清楚的描述：它把这种方式称为 **Temporal Reduction**，即在时间维度上就地累加，并指出其复杂度与 dot-product 长度线性相关。  
论文链接：[SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)

### 2. 阵列内波前归约

这是大家最熟悉的 Weight Stationary 的 systolic 风格。Partial sum 不停在一个 PE 里，而是沿着行、列或者对角线传播，在传播过程中逐步累加。

它的特点是：

- 归约和数据移动绑定在一起
- psum 的路径天然嵌入阵列拓扑
- 很适合规则 dense GEMM / CONV
- 一旦矩阵形状不规则，或者有效乘法分布不均，利用率会明显下降

`SIGMA` 把这一类称为 **Spatio-Temporal Reduction**。它特别指出，像 TPU 这类 weight-stationary systolic array，本质上就是通过列方向的 forwarding 来完成归约。这类方式很优雅，但归约延迟仍然会跟阵列尺度绑定。

这类方案最大的优点是“乘法阵列就是归约阵列”，不需要额外的独立 adder fabric；但代价是 **归约拓扑太刚性**。一旦 workload 不是标准、饱满、规则的方阵映射，wavefront 就会出现空泡、偏斜和利用率损失。

### 3. 独立空间归约网络

第三类是我认为这几篇论文里最值得单独拎出来的一类：**把归约从固定的 systolic wavefront 里解耦，交给独立的空间归约网络**。

这类设计的关键思想是：

- 乘法阵列负责生成乘积
- 归约交给一个独立 adder tree 或其变体
- 归约在空间上并行展开，而不是完全依赖时序传播
- 目标是把归约延迟从线性压到对数级，并且支持不规则规模的 dot-product

`SIGMA` 直接把它称为 **Spatial Reduction**，并明确指出树形空间归约的复杂度是 `O(log2 m)`，明显优于前两类线性归约。  
对应论文中，为了解决“非 2 的幂大小归约”和“多个不规则 dot-product 同时映射”这两个问题，作者提出了 **FAN (Forwarding Adder Network)**。FAN 的核心不是简单的 binary tree，而是在不同层级之间加入 forwarding link，让不规则归约也能高效地映射。

论文链接：[SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)

## MAERI 为什么重要：它把“可重构归约网络”做成了方法论

如果说 `SIGMA` 更强调 sparse / irregular GEMM 下为什么需要灵活归约，那么 `MAERI` 更像是在回答一个更底层的问题：

> 能不能把 DNN accelerator 的乘法和归约都抽象成一套可重构互连，让同一块硬件支持多种 dataflow 和多种归约形状？

`MAERI` 的答案是 **ART (Augmented Reduction Tree)**。

根据论文描述，ART 的核心并不是仅仅用一棵 binary tree 做 reduction，而是在同层节点之间增加 forwarding links，并在靠近根部的地方引入更高带宽的 “chubby links”，从而支持：

- 任意大小的 adder tree 映射
- 多个彼此不重叠的 reduction 同时进行
- 不同 virtual neuron 在同一物理树上并行归约

这很关键，因为传统固定 adder tree 的问题不在于“不能做归约”，而在于：

- 当一个 neuron 的输入数小于树宽度时，树会浪费
- 当多个 neuron 同时归约时，链路容易冲突
- 当映射尺度不规则时，tree 的固定父子关系会限制利用率

`MAERI` 的贡献，就是把这些问题从“编译时尽量绕开”变成“硬件互连本身允许灵活映射”。

论文链接：[MAERI: Enabling Flexible Dataflow Mapping over DNN Accelerators via Reconfigurable Interconnects](https://anands09.github.io/papers/maeri_asplos2018.pdf)

## 第四类：分层归约和跨子阵列归约

前三类都可以理解成“一个阵列内部怎么把乘积加起来”。但当阵列变大、或者因为版图/工艺原因必须切成多个子阵列时，还会出现第四类问题：

> 不同 subarray 先各自算出 partial sum，最后这些 partial sum 在哪里合并？

这就进入了 **分层归约** 或 **跨子阵列归约**。

在 [Mapping Systolic Arrays Onto 3D Circuit Structures](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf) 里，作者考虑的是一个“宽 systolic array 被切成多个窄 subarray”的场景。每个 subarray 只处理一部分输入通道，因此会先得到自己的局部 partial sum；后续 subarray 再把前一个 subarray 的结果作为初始 accumulation value 接着算。

这篇论文最有意思的地方在于，它没有把跨 subarray 的归约继续放在二维平面里走长线，而是提出：

- 把 subarray 映射到 3D 结构的不同物理层
- 沿第三维传递和累加 intermediate results
- 用更短的跨层互连来做 partition-accumulation

这样做的意义有两层：

- 从逻辑上看，它属于一种 **hierarchical reduction**：先局部算，再跨层合并
- 从物理实现上看，它把“全局归约”从长距离二维布线，变成了短距离垂直互连

论文还强调，这种 **partition-accumulation** 可以减少数据 skew，从而降低延迟。这个点很值得注意，因为它说明归约拓扑不仅影响加法本身，也影响前端数据进入阵列时的同步成本。

论文链接：[Mapping Systolic Arrays Onto 3D Circuit Structures: Accelerating Convolutional Neural Network Inference](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf)

## STONNE 提醒我们：分类之外，还要看 folding 怎么实现

如果只看论文结构图，很多归约网络都很漂亮；但 `STONNE` 做了一件很有价值的事：它把 `MAERI` 风格的灵活 accelerator 拉进 cycle-level simulator 里，去看这些归约策略在真实 execution 中到底会怎样。

`STONNE` 的一个核心结论是：

- `MAERI` 风格架构在理论上很灵活
- 但当一个 virtual neuron 装不下完整计算、必须启用 **folding** 时
- partial sum 需要暂存、再分发、再继续归约
- 这会把 reduction network 变成实际瓶颈

论文给出的结果很扎实：作者指出，当前 folding 策略会让 compute unit utilization 在 5 个 DNN 模型上平均只有 **25%** 左右，并且问题根源主要在 reduction network 对 folding 的支持不够高效。  
这说明一个非常现实的设计原则：

> 归约方式不能只按“拓扑是否优雅”来评价，还必须看它是否让 partial sum 频繁离阵列、回 buffer、再返场。

换句话说，**folding 友好性** 应该被视为归约分类之外的第二维评价标准。

论文链接：

- [STONNE: A Detailed Architectural Simulator for Flexible Neural Network Accelerators](https://arxiv.org/abs/2006.07137)
- [STONNE project page](https://stonne-simulator.github.io/)

## 把四类方案放在一起看

| 归约类型 | 归约发生位置 | 延迟趋势 | 规则 workload | 不规则/稀疏 workload | 代表论文 |
| --- | --- | --- | --- | --- | --- |
| PE 内时域归约 | 本地寄存器或本地 buffer | 线性 | 好 | 一般 | SIGMA 中对 temporal reduction 的讨论 |
| 阵列内波前归约 | 行/列/对角传播路径 | 线性，且依赖阵列推进 | 很好 | 较差 | SIGMA 中对 spatio-temporal reduction 的讨论 |
| 独立空间归约网络 | 外挂 adder tree / 可重构树 | 对数级为主 | 好 | 很好 | MAERI, SIGMA |
| 分层/跨子阵列归约 | subarray 之间、层间或 3D 垂直方向 | 分层决定 | 好 | 取决于映射策略 | 3D Mapping |

如果再把 `STONNE` 的观察加进去，我觉得还可以补充一列“folding 代价”：

- 本地时域归约：通常最容易出现多轮回写
- 波前归约：当单次映射装不下完整输出时，也可能退化成多轮分块
- 树形归约：性能上更强，但如果 psum 需要回到全局 buffer 再进入树，收益会被侵蚀
- 分层归约：最好把“局部归约”和“全局归约”边界定义清楚，避免每一层都频繁落地

## 我自己的理解：最值得记住的不是四个名字，而是两个判断问题

看一篇 accelerator 论文时，我现在更愿意先问两个问题：

### 问题 1：partial sum 有没有离开“生产它的那片空间”？

如果乘积一生成就能在邻近 PE、同一个树、或者同一个垂直 stack 中完成归约，通常说明这个设计在带宽和延迟上比较健康。  
如果 partial sum 必须频繁写回全局 buffer，再重新分发回来，那大概率吞吐会受伤。

### 问题 2：归约拓扑是否和 workload 形状强绑定？

固定 wavefront 对规则 dense workload 很强，但一遇到：

- 稀疏
- 非方阵
- 小 batch
- irregular tile

它的刚性就会暴露出来。  
这也是为什么 `MAERI` 和 `SIGMA` 都不满足于传统 systolic forwarding，而要引入可重构归约网络。

## 结语

所以，如果要给 “systolic array 的 accumulator 归约方式” 做一个简洁分类，我会这样总结：

1. **Local temporal accumulation**：在 PE 内慢慢加，简单但常常线性。
2. **In-array spatio-temporal accumulation**：边流边加，是经典 systolic 的灵魂，也是它刚性的来源。
3. **Spatial tree-based accumulation**：把归约独立出来，用 adder tree/ART/FAN 做高并行合并。
4. **Hierarchical accumulation**：先子阵列内归约，再跨子阵列、跨层甚至跨 3D die 归约。

而 `STONNE` 给我的补充是第五句提醒：

> **任何归约分类，如果不讨论 folding 和 psum 回流路径，都还不算完整。**

## References

1. [Mapping Systolic Arrays Onto 3D Circuit Structures: Accelerating Convolutional Neural Network Inference](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf)
2. [STONNE: A Detailed Architectural Simulator for Flexible Neural Network Accelerators](https://arxiv.org/abs/2006.07137)
3. [STONNE project page](https://stonne-simulator.github.io/)
4. [SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)
5. [MAERI: Enabling Flexible Dataflow Mapping over DNN Accelerators via Reconfigurable Interconnects](https://anands09.github.io/papers/maeri_asplos2018.pdf)
