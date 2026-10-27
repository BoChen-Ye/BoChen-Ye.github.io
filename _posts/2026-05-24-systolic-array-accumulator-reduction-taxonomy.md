---
title: "Accumulator Reduction in Systolic Arrays: A Practical Taxonomy"
date: 2026-10-28 00:30:38 +0800
excerpt: "A guide to partial-sum organization, from temporal and in-array wavefront reduction to tree networks and 3D hierarchical reduction, drawing on MAERI, SIGMA, STONNE, and 3D systolic-array mapping."
categories:
  - blog
tags:
  - systolic-array
  - accelerator-architecture
  - dataflow
  - dnn-accelerator
  - reduction-network
published: true
---

Discussions of systolic arrays usually begin with dataflow: output-stationary, weight-stationary, or input-stationary. Looking one level deeper, however, latency, utilization, and scalability often depend on **where partial sums are reduced, which paths they follow, and whether they must be written back along the way**.

This article focuses on that question. The main idea is:

> Accumulator designs can be grouped by where reduction takes place: `temporal reduction within a PE`, `in-array wavefront reduction`, `independent spatial reduction networks`, and `hierarchical or cross-subarray reduction`.
>
> `MAERI` and `SIGMA` separate reduction from rigid array forwarding through reconfigurable networks. `Mapping Systolic Arrays Onto 3D Circuit Structures` extends hierarchical reduction into the third dimension. `STONNE` highlights an engineering constraint: **when a reduction network handles folding poorly, measured throughput can fall far short of theoretical throughput.**

These four categories are a comparison framework for this article, rather than a standard set of mutually exclusive classes. Hierarchical reduction can combine local accumulation, wavefronts, and trees. MAERI and SIGMA provide comparisons with flexible spatial accelerators; they should not be treated as conventional two-dimensional systolic arrays.

## Why Reduction Is Central to Systolic Arrays

For each output element, multiplication is only the first step. The products must then be added together:

$$
\operatorname{out}(i,j) = \sum_k A(i,k)\,B(k,j)
$$

The reduction scheme changes where partial sums reside and how often memory is accessed, affecting energy consumption. Additional interconnects and adders also have costs, so topology alone does not establish which design is more energy-efficient.

When `k` is large, several questions arise:

- Are the products accumulated in one PE, or accumulated as they move?
- If a subarray cannot hold a complete dot product, must partial sums be written to a buffer and read back?
- Can a fixed adder-tree topology maintain high utilization for sparse or irregular workloads?
- When an array is divided into subarrays, are their partial sums combined over long wires in a two-dimensional plane, or through a higher-level structure?

The accumulator reduction scheme therefore affects three basic accelerator properties:

- Reduction-path depth and the cycles needed for a complete dot product under resource constraints.
- Adaptability to regular and irregular workloads.
- Whether partial sums frequently leave the compute array, consuming bandwidth and reducing utilization.

## A Practical Classification Framework

### 1. Temporal Reduction Within a PE

The simplest approach is for a PE or small cluster to receive products belonging to the same output repeatedly and accumulate them locally over successive cycles. This is a typical output-stationary implementation. A dataflow name describes operand residency, however, and does not uniquely specify a reduction circuit.

Its main characteristics are:

- Reduction takes place in local registers or a local buffer.
- No complex global adder network is required.
- Latency usually grows linearly with dot-product length.
- Across multiple folds, partial sums can remain local as long as their state is retained. Writeback and reload may be needed when local state capacity is insufficient or output contexts are switched.

This approach offers simple control and good locality. Its limitation is that a short local path does not necessarily mean a short execution time when `k` is large or an output requires several folds.

`SIGMA` calls this **Temporal Reduction**: in-place accumulation over time, with complexity proportional to dot-product length.

Paper: [SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)

### 2. In-Array Wavefront Reduction

This is common in weight-stationary systolic arrays. Partial sums travel along rows, columns, or diagonals and accumulate as they propagate; the direction depends on the mapping.

Its main characteristics are:

- Reduction is coupled to data movement.
- Partial-sum paths are embedded in the array topology.
- It suits regular, dense GEMM and convolution workloads.
- Irregular matrix shapes or uneven distributions of useful multiplications can reduce utilization.

`SIGMA` calls this **Spatio-Temporal Reduction**. In particular, it describes reduction through column-wise forwarding in TPU-style weight-stationary systolic arrays. Reduction latency remains tied to array dimensions.

The main advantage is that the multiplication array also serves as the reduction array, avoiding a separate adder fabric. The tradeoff is a **rigid reduction topology**: mappings that do not fill the array regularly can introduce wavefront bubbles, skew, and utilization losses.

### 3. Independent Spatial Reduction Networks

The third approach **decouples reduction from a fixed systolic wavefront and assigns it to an independent spatial network**.

The main ideas are:

- A multiplier array generates products.
- A separate adder tree or related structure reduces them.
- Reduction is spatially parallel rather than relying entirely on sequential propagation.
- The goal is logarithmic rather than linear reduction latency, with support for irregular dot-product sizes.

`SIGMA` calls this **Spatial Reduction** and discusses $O(\log_2 m)$ latency for reducing `m` inputs through a tree. This comparison concerns the spatially expanded reduction path and assumes sufficient multipliers, adders, and input bandwidth. It is not the total cycle count for an arbitrary-length dot product.

To support reductions whose sizes are not powers of two and multiple irregular dot products mapped simultaneously, the authors introduce **FAN (Forwarding Adder Network)**. FAN augments a binary tree with forwarding links between different levels, allowing irregular reductions to map more efficiently.

Paper: [SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)

## MAERI: Making Reduction Networks Reconfigurable

While `SIGMA` emphasizes flexible reduction for sparse and irregular GEMM, `MAERI` addresses a broader question:

> Can multiplication and reduction in a DNN accelerator be organized through reconfigurable interconnects, so that the same hardware supports multiple dataflows and reduction shapes?

Its answer is **ART (Augmented Reduction Tree)**.

ART adds forwarding links between nodes at the same level and higher-bandwidth "chubby links" near the root of a binary reduction tree. These additions support:

- Mapping adder trees of different sizes.
- Multiple non-overlapping reductions at the same time.
- Parallel reduction for different virtual neurons on the same physical tree.

There are conditions on this flexibility. The paper describes ART configurability in terms of reductions over consecutive leaves and gives a non-blocking property for multiple reductions with disjoint leaf sets. This does not imply that arbitrarily scattered products can be connected without cost. See MAERI Section 3.2.2.

The difficulty with a conventional fixed adder tree is not its ability to add values, but its resource use:

- A neuron with fewer inputs than the tree width leaves resources idle.
- Multiple simultaneous reductions may contend for links.
- Fixed parent-child connections can limit utilization for irregular mappings.

MAERI makes flexible mapping a capability of the hardware interconnect, rather than leaving the compiler to work around a fixed topology.

Paper: [MAERI: Enabling Flexible Dataflow Mapping over DNN Accelerators via Reconfigurable Interconnects](https://anands09.github.io/papers/maeri_asplos2018.pdf)

## 4. Hierarchical and Cross-Subarray Reduction

The first three approaches describe how products can be combined within an array. Larger designs, or designs partitioned for layout and fabrication, introduce another question:

> After subarrays produce their local partial sums, where are those partial sums combined?

This is **hierarchical reduction**, or **cross-subarray reduction**.

[Mapping Systolic Arrays Onto 3D Circuit Structures](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf) considers a wide systolic array divided into narrower subarrays, each processing part of the input channels. The paper distinguishes two schemes:

- **Partition (P):** a subsequent subarray uses the previous subarray's partial result to initialize its accumulation.
- **Partition-Accumulating (PA):** each subarray computes a local result. One additional adder per row at each layer's edge combines that result with the result from the previous layer. The previous result no longer initializes accumulation inside the current subarray.

The proposed 3D mapping places subarrays on different physical layers, passes intermediate results along the third dimension, and uses shorter interlayer connections for partition accumulation.

This has two implications:

- Logically, reduction is hierarchical: local computation followed by combination across layers.
- Physically, long planar interconnects are replaced with short vertical connections.

The PA scheme reduces data skew through its additional edge accumulators, lowering latency. This benefit comes from changing the computation organization and should not be attributed entirely to 3D interconnects. Vertical connections primarily improve physical connectivity between subarrays. Reduction topology affects both addition and the synchronization of incoming data.

Paper: [Mapping Systolic Arrays Onto 3D Circuit Structures: Accelerating Convolutional Neural Network Inference](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf)

## STONNE: Folding Matters as Much as Topology

A reduction network can look attractive in an architecture diagram. `STONNE` examines how such networks behave during execution by modeling a MAERI-style flexible accelerator in a cycle-level simulator.

One of its central observations concerns **folding**, where a virtual neuron's computation is too large to fit in the available resources at once:

- MAERI-style architectures offer substantial mapping flexibility.
- Folding requires partial sums to be retained, redistributed, and reduced further.
- The reduction network can become a practical bottleneck.

For the MAERI configuration, folding strategy, and five DNN models evaluated in that paper, average compute-unit utilization was approximately **25%**. This is an experimental result for that setup, rather than a general utilization figure for all MAERI implementations or flexible reduction networks.

The resulting design principle is:

> Evaluate a reduction scheme by how it handles partial-sum writeback and reinjection, as well as by its topology.

**Support for folding** is therefore a second evaluation dimension alongside reduction type.

Sources:

- [STONNE: A Detailed Architectural Simulator for Flexible Neural Network Accelerators](https://arxiv.org/abs/2006.07137)
- [STONNE project page](https://stonne-simulator.github.io/)

## Comparing the Four Approaches

| Reduction type | Location | Latency trend | Regular workloads | Irregular or sparse workloads | Representative source |
| --- | --- | --- | --- | --- | --- |
| Temporal within a PE | Local registers or buffer | A single accumulation chain usually scales linearly with term count | Good locality | Depends on scheduling and load balance | SIGMA's temporal-reduction discussion |
| In-array wavefront | Row, column, or diagonal paths | Depends on propagation distance and number of folds | High utilization when the mapping fills the array | Fixed paths may introduce bubbles | SIGMA's spatio-temporal-reduction discussion |
| Independent spatial network | Separate adder tree or reconfigurable tree | Tree depth per batch is usually logarithmic | Supports spatial parallelism | Reconfiguration improves mapping, subject to bandwidth limits | MAERI, SIGMA |
| Hierarchical or cross-subarray | Between subarrays or physical layers | Combines local reduction and higher-level merging | Depends on partitioning | Depends on mapping | 3D Mapping |

STONNE's observations add a further comparison: folding cost.

- **Local temporal reduction:** retaining accumulator state avoids intermediate writeback; check the number of output contexts and available local capacity.
- **Wavefront reduction:** a computation that does not fit in one mapping may require multiple tiled passes.
- **Tree reduction:** each batch has a short path, but routing partial sums through a global buffer can erode that benefit.
- **Hierarchical reduction:** define local and global reduction boundaries clearly to avoid repeated writeback at every level.

### Example: Tree Depth, Throughput, and Folding Are Different Quantities

Consider a dot product of length $K=256$, with hardware generating at most $P=16$ products for that output per cycle:

- Generating all products alone takes at least $\lceil K/P \rceil = 16$ cycles.
- A 16-input binary adder tree has $\lceil \log_2 P \rceil = 4$ levels. If each level takes one cycle and the tree is fully pipelined, the first batch emerges after four cycles, followed by one batch sum per cycle.
- The 16 batch sums must still be combined into one output, using a local accumulator or another reduction pass. A four-level tree therefore does not complete the entire 256-term dot product in four cycles.

This is an idealized resource model, excluding multiplier latency, loading, stalls, and final draining. It illustrates why first-result latency, initiation interval, and total task cycles should be reported separately. If the feedback adder has a latency of `L` cycles, updates to the same output cannot automatically occur every cycle: the design must interleave independent outputs, maintain multiple partial sums, or stall on the feedback dependency.

Folding traffic also depends on residency. Suppose an output takes `F` folds and each partial sum occupies `b` bytes. Writing and reloading at every fold boundary produces the following intermediate-state traffic, in bytes:

$$
T_{\mathrm{psum}} = 2(F-1)b
$$

Keeping the state local avoids those buffer transfers. This excludes the final output write and does not imply that register accesses consume no energy.

## Two Questions to Ask When Reading an Accelerator Paper

### 1. Does a Partial Sum Leave the Region That Produced It?

Completing reduction in neighboring PEs, within one tree, or within one vertical stack generally helps bandwidth and latency. Frequent writes to a global buffer followed by redistribution can hurt throughput.

### 2. Is the Reduction Topology Tightly Coupled to Workload Shape?

A fixed wavefront works well for regular dense workloads. Its constraints become more visible with sparsity, non-square matrices, small batches, and irregular tiles. This motivates the reconfigurable reduction networks in MAERI and SIGMA.

## Closing Remarks

A concise classification of accumulator reduction in systolic-array designs is:

1. **Local temporal accumulation:** accumulate within a PE over time, with simple control and often linear latency.
2. **In-array spatio-temporal accumulation:** accumulate while forwarding through the array, coupling reduction to systolic movement.
3. **Spatial tree-based accumulation:** use an adder tree, ART, or FAN to combine products in parallel.
4. **Hierarchical accumulation:** reduce locally, then combine results across subarrays, layers, or stacked dies.

STONNE adds one further reminder:

> **A reduction taxonomy is incomplete without discussing folding and partial-sum feedback paths.**

## References

1. [Mapping Systolic Arrays Onto 3D Circuit Structures: Accelerating Convolutional Neural Network Inference](https://www.eecs.harvard.edu/~htk/publication/2018-sips-kung-mcdanel-zhang.pdf)
2. [STONNE: A Detailed Architectural Simulator for Flexible Neural Network Accelerators](https://arxiv.org/abs/2006.07137)
3. [STONNE project page](https://stonne-simulator.github.io/)
4. [SIGMA: A Sparse and Irregular GEMM Accelerator with Flexible Interconnects for DNN Training](https://anands09.github.io/papers/sigma_hpca2020.pdf)
5. [MAERI: Enabling Flexible Dataflow Mapping over DNN Accelerators via Reconfigurable Interconnects](https://anands09.github.io/papers/maeri_asplos2018.pdf)
