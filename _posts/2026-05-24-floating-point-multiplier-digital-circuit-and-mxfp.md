---
title: "从 IEEE 754 到 MXFP：浮点数乘法器的数字电路实现"
date: 2026-05-24 22:30:00 +0800
excerpt: "一篇偏教学风格的笔记：从标准浮点乘法器的拆包、尾数乘法、规格化、舍入与异常处理讲起，再延伸到 MXFP 这种共享尺度的低比特浮点格式。"
categories:
  - blog
tags:
  - floating-point
  - digital-circuit
  - fpu
  - mxfp
  - fp8
published: false
---

这篇文章想回答一个很具体的问题：

> 一个“浮点数乘法器”在数字电路里到底是怎么实现的？

很多时候，我们在算法或体系结构层面写 `a * b` 很自然，但真到了 RTL 或微架构设计里，这个乘法并不是一个黑盒。  
它通常会被拆成几条并行的数据路径：

- 符号位路径
- 指数路径
- 尾数路径
- 规格化与舍入路径
- 特殊值与异常路径

如果再往前一步，进入 `FP8`、`MXFP8`、`MXFP6`、`MXFP4` 这些 AI 常见低精度格式，你会发现“浮点乘法器”的结构又会变一下。  
尤其是 `MXFP`，它已经不只是一个传统意义上的“标量浮点格式”，而是 **共享尺度 + 私有元素** 的块状数值格式。

这篇文章分两部分：

1. 先把标准 IEEE 风格浮点乘法器讲清楚。
2. 再把这个思路迁移到 `MXFP`，看它对电路实现提出了什么新要求。

## 1. 先统一语言：一个浮点数到底长什么样

以 IEEE 754 的二进制浮点数为例，一个正常数通常写成：

```text
value = (-1)^sign × 2^(E-bias) × (1.fraction)
```

也就是说，它由三部分组成：

- `sign`：符号位
- `exponent`：带 bias 的指数
- `fraction`：尾数字段，默认隐藏最高位 `1`

例如 `binary32`，也就是常见的单精度：

- 1 bit 符号位
- 8 bit 指数位
- 23 bit 尾数字段

内部真正参与乘法的有效数位精度，其实是 `24 bit`，因为规格化正常数有一个隐含的最高位 `1`。

IEEE 754 标准本身定义了格式、运算和异常语义，而且明确说明这些实现可以完全由硬件、完全由软件，或者软硬结合来完成。  
来源：[IEEE 754-2019 标准页面](https://standards.ieee.org/ieee/754/6210/)

## 2. 浮点乘法在数学上怎么分解

两个正常浮点数相乘：

```text
a = (-1)^sa × 2^(Ea-bias) × Ma
b = (-1)^sb × 2^(Eb-bias) × Mb
```

则乘积可以写成：

```text
a × b = (-1)^(sa xor sb) × 2^((Ea+Eb)-2*bias) × (Ma × Mb)
```

把它重新整理成浮点格式之后，电路里真正要做的事情就是：

1. 符号位异或
2. 指数相加，再减去 bias
3. 尾数相乘
4. 对尾数乘积做规格化
5. 做舍入
6. 检查是否溢出、下溢、无效、非精确

所以你可以把一个浮点乘法器粗略理解为：

```text
unpack + classify
   + sign xor
   + exponent adder
   + significand multiplier
   + normalize
   + round
   + pack
```

## 3. 一个标准浮点乘法器的典型数据通路

### 3.1 拆包与分类

乘法器的第一个阶段通常不是“乘”，而是 **拆包**：

- 取出 `sign / exponent / fraction`
- 判断输入属于哪一类：
  - `zero`
  - `subnormal`
  - `normal`
  - `infinity`
  - `NaN`

这个阶段非常重要，因为 IEEE 754 的特殊值语义不能靠后面的普通乘法自动得到。

例如：

- `NaN * anything = NaN`
- `inf * 0 = invalid -> NaN`
- `inf * finite_nonzero = inf`
- `0 * finite = 0`

也就是说，很多输入根本不应该走到“正常尾数乘法”那条主数据通路里，而是应该被前面的 classify 逻辑直接短路掉。

## 3.2 符号位路径

这一条最简单：

```text
sign_out = sign_a xor sign_b
```

它通常只是一颗异或门加上一些异常路径上的覆盖逻辑。  
真正复杂的不是符号本身，而是特殊值情况下，最终结果是不是还保留这个符号。

## 3.3 指数路径

对正常数来说，指数路径看起来像这样：

```text
exp_tmp = exp_a + exp_b - bias
```

但真实电路里一般还会多出几件事：

- 子正常数要先补偿它们的“真实指数”
- 规格化时如果尾数乘积产生进位，指数要再 `+1`
- 如果后续舍入导致尾数再进位，指数可能还要再 `+1`
- 最后还要检查是否上溢或下溢

这条路径本质上是一条“中等位宽的整数加法链”，通常不像尾数乘法那样成为主关键路径，但它和规格化、舍入之间的联动很紧。

## 3.4 尾数路径：真正昂贵的地方

如果两个输入都是正常数，那么单精度乘法其实是在做：

```text
24-bit × 24-bit -> 48-bit
```

双精度则大得多：

```text
53-bit × 53-bit -> 106-bit
```

这就是浮点乘法器真正的面积和延迟大头。

从硬件结构上看，尾数乘法器和定点乘法器没有本质区别，常见实现包括：

- 直接 array multiplier
- Booth recoding
- Wallace tree
- Dadda tree
- 厂商综合器映射到 DSP block

如果目标是 ASIC，高性能实现常见做法是：

1. 用 Booth 编码减少部分积数量
2. 用 Wallace/Dadda 压缩树做 carry-save reduction
3. 最后用一次 carry-propagate adder 得到最终乘积

很多文献都会把浮点乘法器的优化重点放在这里，因为指数和异常处理相对“窄”，而尾数乘法是真正的大位宽并行乘法。  
来源之一：[FPnew](https://arxiv.org/abs/2007.01530)；以及 Berkeley [HardFloat 文档](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)

## 4. 为什么乘完之后还要规格化

两个规格化尾数都在区间 `[1, 2)` 内，所以它们的乘积一定在：

```text
[1, 4)
```

这意味着乘积的最高两位只有两种主要情况：

- 在 `[1, 2)`：形如 `1.xxxxx`
- 在 `[2, 4)`：形如 `10.xxxxx` 或 `11.xxxxx`

因此对于“正常数 × 正常数”，规格化通常只需要判断：

- 如果乘积最高位落在第 2 位，右移 1 位，同时指数 `+1`
- 否则不移位

这是浮点乘法比浮点加法更“规整”的地方。  
浮点加法做完以后，结果可能需要大范围左移；而浮点乘法对正常数而言，规格化通常只涉及至多一次右移。

不过要注意两点：

1. 如果输入里有 `subnormal`，内部路径就没这么简单。
2. 如果舍入后尾数再次溢出，还要做一次“第二轮规格化”。

## 5. 为什么很多设计喜欢先把 subnormal 变成“内部规格化格式”

`subnormal` 是硬件实现里最烦的一类数。

因为它们没有隐含最高位 `1`，数值形式是：

```text
value = (-1)^sign × 2^(1-bias) × (0.fraction)
```

这样会让主数据通路出现很多分支判断：

- 这个数有没有 hidden 1？
- 真实指数该怎么算？
- 乘积后规格化位落在哪里？

因此，一个非常常见的工程技巧是：

> 先把 IEEE 编码转换成内部 recoded / raw 格式，把 subnormal 预先左规到“看起来像正常数”的样子。

Berkeley HardFloat 就明确采用了这种思路。它的文档说明：

- 内部会使用 `recFN` 这种重编码格式
- 对 subnormal，会同时变换指数和有效数，使内部运算统一到“规格化后”的形式
- 运算过程中还会使用拆解后的 raw form，而不是一直抱着原始 IEEE 编码做运算

来源：[HardFloat 文档](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)

这是很值得借鉴的设计习惯，因为它能显著降低主乘法路径上的条件分支复杂度。

## 6. 舍入：真正决定“是否 IEEE 兼容”的地方

很多初学设计会把浮点乘法理解为“乘完截断一下”。  
这在工程上通常是不够的。

IEEE 754 要求的是 **按指定舍入模式得到正确结果**。  
最常见默认模式是：

- `round to nearest, ties to even`

IEEE 754 还定义了其他常用模式，比如：

- toward zero
- toward +inf
- toward -inf

来源：[IEEE 754-2019 标准页面](https://standards.ieee.org/ieee/754/6210/)；NVIDIA 也在其浮点白皮书中列出了这些模式：[CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)

### 6.1 GRS 位为什么重要

硬件里最常见的做法，是在目标精度之外再多保留几位：

- `G`：guard bit
- `R`：round bit
- `S`：sticky bit

其中 `sticky bit` 不是单独某一位，而是“所有被截掉低位的 OR”。

举个直观理解：

- 如果被截掉的部分全是 0，那么结果其实是精确可表示的
- 只要被截掉的部分里有任何一个 `1`，`sticky` 就会变成 `1`

这样，舍入单元就可以根据：

- 当前保留位最低位
- G/R/S
- 舍入模式

决定是否加 `1 ulp`。

### 6.2 舍入本身也可能引发进位

这是很多人第一次画 datapath 容易漏掉的地方。

例如尾数已经接近：

```text
1.111111...111
```

舍入时如果需要 `+1`，结果会变成：

```text
10.000000...000
```

这意味着：

- 尾数又需要右移 1 位
- 指数再 `+1`

所以一个 IEEE 兼容的乘法器，规格化和舍入通常不是两个完全独立的盒子，而是存在反馈关系。

## 7. 异常处理不能事后补

IEEE 754 强调的不只是“结果值”，还包括异常条件。  
在浮点乘法里最常见的几个是：

- `invalid`
- `overflow`
- `underflow`
- `inexact`

标准页面明确提到它定义了这些异常条件及其默认处理。  
来源：[IEEE 754-2019 标准页面](https://standards.ieee.org/ieee/754/6210/)

对于乘法器来说，常见触发方式可以这样记：

- `invalid`：`0 * inf` 或 `inf * 0`
- `overflow`：最终指数超过最大可表示范围
- `underflow`：结果太小，进入 subnormal 甚至变成 0
- `inexact`：任何非精确舍入

如果你的设计目标是“教学级能跑”，很多时候只先做数值结果。  
但如果目标是“兼容 IEEE”或者未来要接软硬件生态，异常标志最好一开始就放进微架构里。

## 8. 一个单精度浮点乘法器可以怎样分流水

下面给一个非常常见、也很适合 RTL 起步的四级结构：

### Stage 0: Unpack + Classify

- 提取 `sign/exponent/fraction`
- 判断 `zero / subnormal / normal / inf / NaN`
- 生成 hidden bit
- 为 subnormal 计算前导零数或转成内部 recoded 格式

### Stage 1: Significand Multiply + Exponent Precompute

- `sign_out = sign_a xor sign_b`
- `exp_tmp = exp_a_real + exp_b_real`
- 尾数进入 Booth / Wallace / DSP 乘法器

### Stage 2: Normalize

- 得到乘积高位
- 判断是否右移 1 位
- 形成保留位与 G/R/S
- 调整指数

### Stage 3: Round + Pack

- 根据舍入模式决定是否加 1
- 处理舍入后进位
- 检查 overflow / underflow / inexact
- 重新打包为 IEEE 编码

这类划分的好处是：

- `Stage 1` 可以把关键路径集中在大乘法器
- `Stage 2/3` 负责后处理
- 结构清晰，便于后续再扩成 FMA

## 9. 现代实现里，乘法器常常不是独立存在，而是 FMA 的一部分

在很多 CPU、GPU、AI 加速器里，真正高价值的不是单独 `mul`，而是 `fma`：

```text
rn(a × b + c)
```

IEEE 754 在 2008 修订中加入了 FMA；NVIDIA 的文档也明确强调：

- FMA 只做一次舍入
- 因而通常比“先乘再加，各舍入一次”更准确
- 硬件 FMA 会在乘法阶段保留更宽的中间乘积

来源：[CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)

从电路角度说，这意味着：

- 乘法器通常输出的不是“已经截短的最终尾数”
- 而是更宽的未舍入乘积
- 后面直接接对齐、加法、再统一舍入

所以如果你的最终目标是 AI PE 或 CPU FPU，单独乘法器最好一开始就按“能接 FMA”来规划接口。

## 10. 到这里为止，我们讲的还是“标量浮点”

上面这些讨论都默认一个前提：

> 一个数，就是一个自包含的浮点编码。

但 `MXFP` 不是这样。

`MXFP` 的关键思想是：

- 每个元素只有很低的位宽，比如 8/6/4 bit
- 一个 block 内多个元素共享同一个尺度因子 `X`

这不是单个标量浮点数，而更像是：

```text
{shared scale X, private elements P0, P1, ..., Pk-1}
```

Open Compute Project 的 MX 规范把它定义得很清楚：

- 一个 MX-compliant 格式由三部分组成：
  - 共享 scale `X`
  - 私有元素 `Pi`
  - block size `k`
- block 中所有 `k` 个元素共享同一个 scale
- 具体数值满足 `vi = X * Pi`

来源：[OCP Microscaling Formats (MX) Specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

## 11. MXFP 到底有哪些格式

根据 OCP MX 规范，具体格式包括：

| 格式 | 元素类型 | 元素位宽 | block size | scale 类型 | scale 位宽 |
| --- | --- | --- | --- | --- | --- |
| MXFP8 | FP8(E5M2) 或 FP8(E4M3) | 8 | 32 | E8M0 | 8 |
| MXFP6 | FP6(E3M2) 或 FP6(E2M3) | 6 | 32 | E8M0 | 8 |
| MXFP4 | FP4(E2M1) | 4 | 32 | E8M0 | 8 |
| MXINT8 | INT8 | 8 | 32 | E8M0 | 8 |

来源：[OCP MX 规范](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

这张表里最关键的两个信息是：

1. `block size` 是 32
2. `scale` 用的是 `E8M0`

### 11.1 E8M0 是什么

`E8M0` 可以理解为：

- 8 bit 指数字段
- 0 bit 尾数字段
- 只表示 2 的整数次幂

OCP MX 规范明确写到：

- `E8M0` 是 conventional biased Float32 exponent 的无符号表示
- bias 是 `127`
- 支持指数范围 `-127` 到 `127`
- 没有 `Inf`
- 只有一个 `NaN` 编码，即全 1

来源：[OCP MX 规范](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

这个设计非常巧妙，因为它意味着：

> 共享尺度路径不需要尾数乘法，只需要指数相加。

从硬件角度看，这会让 `MXFP` 的“scale 通路”便宜很多。

## 12. MXFP8 和普通 FP8 有什么关系

`MXFP8` 的元素本身是 `FP8`，但外面再包了一个共享尺度。

而 OCP 的 `FP8` 规范又定义了两种 8-bit 浮点编码：

- `E4M3`
- `E5M2`

其中：

- `E4M3`：1 符号位，4 指数位，3 尾数位，bias = 7
- `E5M2`：1 符号位，5 指数位，2 尾数位，bias = 15

并且两者有一个很重要的差别：

- `E5M2` 支持 `Inf` 和 `NaN`
- `E4M3` 不表示 `Inf`，只保留 NaN 编码，以换取更大的 `emax`

来源：[OCP FP8 规范](https://www.opencompute.org/documents/ocp-8-bit-floating-point-specification-ofp8-revision-1-0-2023-12-01-pdf-1)

这意味着在做 `MXFP8` 乘法器时，特殊值逻辑也要跟着元素编码走：

- 如果元素格式是 `E5M2`，你要处理 `Inf/NaN`
- 如果元素格式是 `E4M3`，逻辑会稍微不一样

## 13. 从电路角度看，MXFP 乘法器其实是“两条指数路径 + 一条低比特尾数路径”

如果把 MXFP 元素值写成：

```text
v = X × P
```

那么两个 MXFP 元素相乘就是：

```text
v1 × v2 = (X1 × P1) × (X2 × P2)
        = (X1 × X2) × (P1 × P2)
```

由于 `X1` 和 `X2` 都是 `E8M0`，也就是纯 2 的幂，所以：

```text
X1 × X2
```

在硬件上几乎等价于：

- 取出两个 scale 的指数
- 做一次整数相加

没有额外尾数乘法。

于是一个 MXFP 乘法 lane 的 datapath 可以理解为：

1. 解码元素 `P1/P2`
2. 解码共享尺度 `X1/X2`
3. 元素走“小型浮点乘法器”
4. scale 走“指数加法器”
5. 两边在 exponent 域合并
6. 如果输出到更宽格式，直接写 widened result
7. 如果输出还要回到 MXFP，则再做 block 级重标定和量化

这和传统 IEEE 浮点乘法器最大的不同在于：

> `MXFP` 的难点不只在“乘”，更在“block 级 scale 的生成、传播和回写”。

## 14. OCP 对 MXFP 的 dot product 语义给了很好的硬件提示

OCP MX 规范对两个 MX block 的点积给出了最小语义：

```text
Dot(A, B) = X(A) × X(B) × Σ(Pi(A) × Pi(B))
```

来源：[OCP MX 规范](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

这条式子其实几乎直接就是硬件架构图：

- 先在 lane 内做 `Pi(A) × Pi(B)`
- 在树上做 `Σ`
- 共享尺度 `X(A) × X(B)` 单独处理

于是你会发现，很多 MXFP 矩阵乘或点积单元天然适合下面这种实现：

- 元素乘法在低精度 lane 中完成
- 累加在更宽精度中完成
- shared scale 作为指数补偿项在前后单独处理

这也是为什么实际 AI 硬件里，低比特浮点常常不是“低比特乘、低比特加、低比特累”，而是：

```text
low-precision multiply + wider accumulation
```

## 15. MXFP 乘法器最值得注意的，不是乘法核心，而是量化边界

如果结果直接输出到 `FP16/BF16/FP32`，那么 MXFP datapath 相对简单：

- 输入端解码元素和 scale
- 中间在更宽格式里乘或累加
- 输出端按宽格式打包

但如果你希望结果重新写回 `MXFP8/MXFP6/MXFP4`，事情就复杂了，因为你还需要：

1. 统计一个 block 的动态范围
2. 选出新的共享尺度 `X`
3. 把每个元素除以该尺度
4. 再量化到目标元素格式

OCP MX 规范在“从标量向量转换到 MX-compliant format”一节里，本质上描述的就是这个过程：

- 先选择 block scale
- 再把各元素除以 scale
- 再量化到元素格式
- 量化至少要支持 `roundTiesToEven`

来源：[OCP MX 规范](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

所以，如果说普通 IEEE 浮点乘法器的核心问题是：

> “如何正确地产生一个浮点乘积？”

那么 MXFP 乘法器在系统层面的真正问题更像是：

> “如何在 block 范围内管理共享尺度，并把 widened result 稳定地重新量化回去？”

## 16. NVIDIA 的 MXFP8 实践，说明了 scale 的粒度为什么重要

NVIDIA 在 Transformer Engine 文档中给出了非常具体的 `MXFP8` 实践定义：

- `x = x_fp8 * s_block`
- `x_fp8` 默认是 `E4M3`
- `s_block` 是共享给 32 个连续元素的 `E8M0`

来源：[Transformer Engine MXFP8 文档](https://nvidia.github.io/TransformerEngine/features/low_precision_training/mxfp8/mxfp8.html)

这和 OCP MX 规范的 block 大小 `32` 是一致的。  
从硬件实现角度看，block 越小：

- 动态范围适配越细
- 数值精度通常越好
- 但 metadata 与 scale 管理开销更高

block 越大则反过来：

- scale 开销更低
- 但同一 block 内不同元素共享一个尺度，量化误差更容易拉大

所以 MXFP 的电路设计，不只是一个算术设计问题，还是一个 **格式-带宽-控制复杂度** 联合权衡问题。

## 17. 如果你要自己写 RTL，我建议先做哪个版本

如果目标是教学或课程项目，我会建议按下面顺序来：

### 路线 A：先做最小 IEEE 风格单精度乘法器

第一版只支持：

- normal number
- zero
- round-to-nearest-even

先把主通路跑通：

- unpack
- hidden bit
- exponent add
- 24x24 significand multiply
- normalize
- GRS rounding
- pack

### 路线 B：补 subnormal / inf / NaN / exceptions

这一版开始像一个真正的 FPU：

- 分类器
- 特殊值短路
- underflow / overflow / invalid / inexact
- 舍入后再规格化

### 路线 C：改写成“内部 recoded 格式”

这一步会显著改善架构整洁度。  
你会更容易继续做：

- FMA
- 可配置位宽
- 多格式支持

### 路线 D：再做 MXFP lane

MXFP 最适合作为“第二代设计”来做，而不是第一版就上。  
原因很简单：

- 它复用了浮点乘法核心
- 但又增加了 block scale 的控制与重量化

如果底层 scalar FP datapath 还没稳，直接上 MXFP 会把问题缠在一起。

## 18. 我自己会怎么概括“浮点乘法器”的设计重点

如果让我把这篇文章压缩成几句话，我会这样记：

### 重点 1：浮点乘法器不是一个大乘法器

它是：

- 一个整数指数加法器
- 一个大位宽尾数乘法器
- 一个规格化器
- 一个舍入器
- 一个特殊值/异常控制器

其中真正重的是尾数乘法，真正容易写错的是舍入和特殊值。

### 重点 2：subnormal 处理方式，决定了你的 datapath 是否整洁

如果一直拿原始 IEEE 编码硬算，主通路会很乱。  
如果先 recode，很多事情会顺得多。

### 重点 3：现代硬件里，乘法往往服务于 FMA

所以中间结果保宽、延后舍入，是非常自然的微架构选择。

### 重点 4：MXFP 不是“小浮点”，而是“块浮点”

它的核心不是把 32-bit float 缩成 8/6/4 bit；  
而是把数值表示拆成：

- block 共享尺度
- 元素私有编码

这会把算术电路和 metadata 管理绑在一起。

## 19. 结语

如果你以前只从软件角度看浮点乘法，那么最容易低估的两件事通常是：

- 舍入比乘法本身更“决定兼容性”
- `MXFP` 这种格式的难点往往不在单个 lane 的乘法器，而在 block 级 scale 的处理

对我来说，一个好的学习顺序是：

1. 先完全理解 IEEE 风格单个乘法器。
2. 再理解 FMA 为什么要保留更宽中间结果。
3. 最后再看 `FP8/MXFP` 这种低精度格式，理解它们为什么把“数值表示”和“数据组织”放到了一起。

这样再去看 AI accelerator 里的 Tensor Core、PE lane、低精度 MAC，很多设计就会顺眼很多。

## References

1. [IEEE 754-2019 标准页面](https://standards.ieee.org/ieee/754/6210/)
2. [Berkeley HardFloat Verilog Modules](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)
3. [CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)
4. [OCP 8-bit Floating Point Specification (OFP8)](https://www.opencompute.org/documents/ocp-8-bit-floating-point-specification-ofp8-revision-1-0-2023-12-01-pdf-1)
5. [OCP Microscaling Formats (MX) Specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)
6. [NVIDIA Transformer Engine: MXFP8](https://nvidia.github.io/TransformerEngine/features/low_precision_training/mxfp8/mxfp8.html)
7. [FPnew: An Open-Source Multi-Format Floating-Point Unit Architecture for Energy-Proportional Transprecision Computing](https://arxiv.org/abs/2007.01530)
