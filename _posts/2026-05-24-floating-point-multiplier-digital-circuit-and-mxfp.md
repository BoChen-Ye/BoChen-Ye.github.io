---
title: "From IEEE 754 to MXFP: Floating-Point Multiplier Hardware"
date: 2026-10-28 00:30:38 +0800
excerpt: "A tutorial on floating-point multiplier hardware: unpacking, significand multiplication, normalization, rounding, and exception handling, followed by the shared-scale low-precision formats of MXFP."
categories:
  - blog
tags:
  - floating-point
  - digital-circuit
  - fpu
  - mxfp
  - fp8
published: true
---

This article addresses a specific question:

> How is a floating-point multiplier implemented in digital hardware?

Writing `a * b` is straightforward at the algorithm or architecture level. In RTL and microarchitecture, however, multiplication consists of several parallel paths:

- Sign computation.
- Exponent computation.
- Significand multiplication.
- Normalization and rounding.
- Special-value and exception handling.

Low-precision formats used in AI, such as `FP8`, `MXFP8`, `MXFP6`, and `MXFP4`, introduce further changes. In particular, `MXFP` is a block format with **a shared scale and per-element encodings**, rather than a conventional self-contained scalar floating-point format.

The article has two parts:

1. Explain a conventional IEEE-style floating-point multiplier.
2. Extend that model to `MXFP` and examine its hardware requirements.

## 1. The Representation of a Floating-Point Number

A normal IEEE 754 binary floating-point number can be written as:

```text
value = (-1)^sign × 2^(E-bias) × (1.fraction)
```

It contains three fields:

- `sign`: the sign bit.
- `exponent`: the biased exponent.
- `fraction`: the trailing significand field, with an implicit leading `1` for normal numbers.

For `binary32`, or single precision, these are:

- 1 sign bit.
- 8 exponent bits.
- 23 fraction bits.

The significand used internally in multiplication has **24 bits of precision**, including the implicit leading `1` of a normal number.

IEEE 754 defines formats, operations, and exception semantics. Implementations may use hardware, software, or a combination of both.

Source: [IEEE 754-2019 standard page](https://standards.ieee.org/ieee/754/6210/)

## 2. Decomposing Floating-Point Multiplication

For two normal floating-point inputs:

```text
a = (-1)^sa × 2^(Ea-bias) × Ma
b = (-1)^sb × 2^(Eb-bias) × Mb
```

Their product is:

```text
a × b = (-1)^(sa xor sb) × 2^((Ea+Eb)-2*bias) × (Ma × Mb)
```

To encode this product as a floating-point result, the hardware must:

1. XOR the sign bits.
2. Add the encoded exponents and subtract the bias.
3. Multiply the significands.
4. Normalize the significand product.
5. Round the result.
6. Check for overflow, underflow, invalid operation, and inexactness.

A floating-point multiplier can therefore be viewed as:

```text
unpack + classify
   + sign xor
   + exponent adder
   + significand multiplier
   + normalize
   + round
   + pack
```

## 3. A Typical Floating-Point Multiplier Datapath

### 3.1 Unpacking and Classification

The first stage usually unpacks and classifies the inputs:

- Extract `sign / exponent / fraction`.
- Determine whether each input is `zero`, `subnormal`, `normal`, `infinity`, or `NaN`.

Classification matters because the ordinary multiplication path cannot produce all IEEE 754 special-value semantics by itself. For example:

- `NaN * anything = NaN`
- `inf * 0 = invalid -> NaN`
- `inf * finite_nonzero = inf`
- `0 * finite = 0`

Many inputs can therefore bypass the normal significand-multiplication path through special-case selection logic.

### 3.2 The Sign Path

The basic computation is:

```text
sign_out = sign_a xor sign_b
```

This typically requires an XOR gate plus overrides for special cases. The more subtle question is how the final sign is handled when a special value is selected.

### 3.3 The Exponent Path

For normal inputs, the starting point is:

```text
exp_tmp = exp_a + exp_b - bias
```

A complete implementation also accounts for:

- Exponent adjustments for subnormal inputs.
- An increment when product normalization shifts the significand right.
- A further increment if rounding produces a significand carry.
- Final overflow and underflow checks.

This path is essentially a moderate-width integer addition chain. It is usually less expensive than significand multiplication, but closely coupled to normalization and rounding.

### 3.4 The Significand Path

For two normal single-precision inputs, significand multiplication is:

```text
24-bit × 24-bit -> 48-bit
```

For double precision, it becomes:

```text
53-bit × 53-bit -> 106-bit
```

This wide multiplication is a major contributor to area and delay.

Its hardware resembles an integer multiplier. Common implementation choices include:

- Array multipliers.
- Booth recoding.
- Wallace trees.
- Dadda trees.
- Synthesis into FPGA DSP blocks.

A high-performance ASIC implementation often uses Booth recoding to reduce the number of partial products, a Wallace or Dadda carry-save compression tree, and a final carry-propagate adder.

This explains the emphasis on significand multiplication in many floating-point hardware optimizations: exponent and exception paths are relatively narrow, while the significand path requires a wide parallel multiplier.

Sources: [FPnew](https://arxiv.org/abs/2007.01530) and [Berkeley HardFloat documentation](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)

## 4. Why the Product Needs Normalization

Each normalized input significand lies in `[1, 2)`, so their product lies in:

```text
[1, 4)
```

There are two cases:

- A product in `[1, 2)` has the form `1.xxxxx`.
- A product in `[2, 4)` has the form `10.xxxxx` or `11.xxxxx`.

For normal inputs, normalization therefore usually needs only one decision:

- If the product is at least 2, shift it right by one bit and increment the exponent.
- Otherwise, leave it unchanged.

This is more regular than floating-point addition, whose result may require a substantial left shift. Normal-input multiplication needs at most one right shift at this stage.

Two qualifications matter:

1. Subnormal inputs require additional handling.
2. A carry from rounding may require another normalization adjustment.

## 5. Normalizing Subnormals Internally

Subnormals complicate hardware because they have no implicit leading `1`. Their value is:

```text
value = (-1)^sign × 2^(1-bias) × (0.fraction)
```

Operating directly on this representation introduces several questions into the main datapath:

- Is there a hidden leading `1`?
- What is the effective exponent?
- Where will the leading bit of the product appear?

A common implementation technique is:

> Convert the IEEE encoding to an internal recoded or raw representation, normalizing nonzero subnormals before arithmetic.

Berkeley HardFloat follows this approach:

- It uses the recoded `recFN` format internally.
- It adjusts both exponent and significand for subnormals, presenting a normalized representation to internal arithmetic.
- Arithmetic also uses a decomposed raw form rather than operating exclusively on the original IEEE bit encoding.

Source: [HardFloat documentation](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)

This organization reduces conditional handling in the main multiplication path.

## 6. Rounding and IEEE Compatibility

An introductory multiplier sometimes computes a product and simply truncates it. That is generally insufficient for IEEE-compatible arithmetic.

IEEE 754 requires **the correct result under the selected rounding mode**. The usual default is:

- `round to nearest, ties to even`

Other common modes include:

- Toward zero.
- Toward positive infinity.
- Toward negative infinity.

Sources: [IEEE 754-2019 standard page](https://standards.ieee.org/ieee/754/6210/) and [CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)

### 6.1 Guard, Round, and Sticky Bits

Hardware commonly retains rounding information beyond the target precision:

- `G`: guard bit.
- `R`: round bit.
- `S`: sticky bit.

The sticky bit summarizes the low-order bits below the round bit using an OR reduction. Together, G, R, and S distinguish an exact result from one with a nonzero discarded portion.

The rounding unit uses the least significant retained bit, G/R/S, and the rounding mode to decide whether to increment the retained value by `1 ulp`.

For round-to-nearest-even, let `L` be the least significant retained bit:

```text
increment = G & (R | S | L)
```

When `G=1, R=0, S=0`, the discarded portion is exactly half an ulp. Incrementing only when `L=1` makes the rounded result even. `S` excludes G and R; all three bits are needed to determine whether the discarded portion is zero.

For a normal binary32 output, let `P[47:0]` be the full integer product of two unsigned 24-bit significands. The binary point lies between bit 46 and bit 45:

| Condition | Retained 24 bits | G | R | S | Exponent adjustment |
| --- | --- | --- | --- | --- | --- |
| `P[47] = 0` | `P[46:23]` | `P[22]` | `P[21]` | OR(`P[20:0]`) | `+0` |
| `P[47] = 1` | `P[47:24]` | `P[23]` | `P[22]` | OR(`P[21:0]`) | `+1` |

This assumes normalized inputs and an output that does not require subnormal encoding. If the output exponent is too small, first shift to the target subnormal position while collecting sticky information, then round once. Rounding to normal precision before shifting and rounding again can introduce double-rounding errors.

### 6.2 Rounding Can Produce a Carry

A significand close to:

```text
1.111111...111
```

can become:

```text
10.000000...000
```

when rounding increments it. The hardware must then shift the significand right by one bit and increment the exponent again.

Normalization and rounding therefore need coordinated control in an IEEE-compatible multiplier.

## 7. Exception Handling Belongs in the Datapath

IEEE 754 specifies exception conditions as well as numerical results. The main multiplication exceptions are:

- `invalid`
- `overflow`
- `underflow`
- `inexact`

Source: [IEEE 754-2019 standard page](https://standards.ieee.org/ieee/754/6210/)

Their common triggers are:

- **Invalid:** `0 * inf`, `inf * 0`, or a signaling NaN input; the result is usually a quiet NaN.
- **Overflow:** the result, rounded to the target precision with an unbounded exponent range, still exceeds the target format's finite range.
- **Underflow:** under default non-trapping handling, the result is both tiny and inexact. An exact subnormal result should not raise the flag merely because its exponent is small.
- **Inexact:** the delivered value differs from the exact product; default overflow handling also raises this flag.

Tininess may be detected before or after rounding, and the design should specify its policy. HardFloat supports both choices and detects the loss of accuracy for underflow through inexactness.

Source: [HardFloat control and rounding documentation](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)

For example, binary32 can represent `2^-126 × 0.5 = 2^-127` exactly as a subnormal, so it does not raise underflow. In contrast, `2^-149 × 0.5 = 2^-150` rounds to zero under ties-to-even, raising both underflow and inexact. Overflow also cannot always return infinity: the sign and rounding mode determine whether the result is infinity or the largest finite value.

An educational prototype may initially focus on numerical results. For IEEE compatibility or integration with a software ecosystem, exception flags should be part of the microarchitecture from the start.

## 8. Pipelining a Single-Precision Multiplier

A useful starting point for RTL is a four-stage organization.

### Stage 0: Unpack + Classify

- Extract `sign/exponent/fraction`.
- Classify `zero / subnormal / normal / inf / NaN`.
- Generate the hidden bit.
- Count leading zeros for subnormals or convert to an internal recoded format.

### Stage 1: Significand Multiply + Exponent Precompute

- `sign_out = sign_a xor sign_b`
- `exp_tmp = exp_a_real + exp_b_real`
- Send the significands into a Booth, Wallace-tree, or DSP-based multiplier.

### Stage 2: Normalize

- Inspect the high-order product bits.
- Determine whether a one-bit right shift is needed.
- If the output is subnormal, perform the necessary right shift with sticky-bit collection.
- Form the final retained bits and G/R/S.
- Adjust the exponent.

### Stage 3: Round + Pack

- Determine whether to increment under the selected rounding mode.
- Handle a carry from rounding.
- Check overflow, underflow, and inexact, and merge invalid from the earlier special-value path.
- Pack the result into IEEE encoding.

Pipeline registers must carry the sign, classification, rounding mode, and valid state alongside the numerical data. If the interface supports stalls, data and control must stall together. These four stages describe functional boundaries; the multiplication stage can be divided further to meet timing.

This organization concentrates the wide multiplication in Stage 1, places postprocessing in Stages 2 and 3, and provides clear boundaries for later extension toward FMA.

## 9. Multiplication as Part of FMA

In many CPUs, GPUs, and AI accelerators, multiplication is part of a fused multiply-add operation:

```text
rn(a × b + c)
```

IEEE 754 introduced FMA in its 2008 revision. NVIDIA's documentation emphasizes that FMA rounds only once and is therefore generally more accurate than a separately rounded multiplication followed by a separately rounded addition. Hardware retains a wider intermediate product before the final rounding.

Source: [CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)

From a circuit perspective:

- The multiplier produces a wider, unrounded product.
- Alignment and addition follow.
- The combined result is rounded once.

If the eventual target is an AI processing element or CPU FPU, an interface that exposes the wider product can make later FMA integration easier.

## 10. From Scalar Floating Point to MXFP

The discussion so far assumes:

> Each number has a self-contained floating-point encoding.

MXFP instead combines low-bit-width elements, such as 8-, 6-, or 4-bit values, with a scale `X` shared by an entire block:

```text
{shared scale X, private elements P0, P1, ..., Pk-1}
```

The Open Compute Project MX specification defines an MX-compliant format through:

- A shared scale `X`.
- Per-element values `Pi`.
- A block size `k`.

All `k` elements share the scale, with represented values given by `vi = X * Pi`.

Source: [OCP Microscaling Formats (MX) Specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

## 11. MX Format Variants

The OCP MX specification includes these concrete formats:

| Format | Element type | Element bits | Block size | Scale type | Scale bits |
| --- | --- | --- | --- | --- | --- |
| MXFP8 | FP8(E5M2) or FP8(E4M3) | 8 | 32 | E8M0 | 8 |
| MXFP6 | FP6(E3M2) or FP6(E2M3) | 6 | 32 | E8M0 | 8 |
| MXFP4 | FP4(E2M1) | 4 | 32 | E8M0 | 8 |
| MXINT8 | INT8 | 8 | 32 | E8M0 | 8 |

Source: [OCP MX specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

Two details are particularly important for hardware: the block size is 32, and the scale uses E8M0.

### 11.1 E8M0

E8M0 uses an 8-bit exponent field with no fraction bits. Its finite values are integer powers of two.

The OCP MX specification defines:

- An unsigned representation of a conventional biased Float32 exponent.
- A bias of `127`.
- An exponent range from `-127` to `127`.
- No infinity encoding.
- One NaN encoding: all bits set to one.

For finite encodings `S ∈ [0, 254]`, the scale is `X = 2^(S-127)`. Encoding `0x00` represents `2^-127`, not zero; E8M0 has no zero encoding.

Source: [OCP MX specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

The hardware implication is useful:

> Multiplying shared scales requires exponent addition, without a significand multiplier.

This makes the scale arithmetic relatively inexpensive.

## 12. MXFP8 and Scalar FP8

MXFP8 uses FP8 elements together with a shared scale. The OCP FP8 specification defines two 8-bit encodings:

- `E4M3`: 1 sign bit, 4 exponent bits, 3 fraction bits, bias 7.
- `E5M2`: 1 sign bit, 5 exponent bits, 2 fraction bits, bias 15.

Their special-value behavior differs:

- E5M2 supports infinity and NaN.
- E4M3 has no infinity encoding and reserves NaN encodings while allowing a larger maximum exponent.

Source: [OCP FP8 specification](https://www.opencompute.org/documents/ocp-8-bit-floating-point-specification-ofp8-revision-1-0-2023-12-01-pdf-1)

An MXFP8 multiplier's special-value logic must therefore follow the element encoding. E5M2 requires infinity and NaN handling; E4M3 needs a different classification policy.

## 13. MXFP Multiplication: Scale and Element Exponent Paths

Write an MXFP element value as:

```text
v = X × P
```

Then:

```text
v1 × v2 = (X1 × P1) × (X2 × P2)
        = (X1 × X2) × (P1 × P2)
```

For finite E8M0 scales, the scale product:

```text
X1 × X2
```

requires extracting and adding their exponents. It needs no additional significand multiplication.

However, adding two 8-bit scale encodings and truncating the result to eight bits is incorrect. For finite scales:

```text
e_scale = (S1 - 127) + (S2 - 127)
        = S1 + S2 - 254
```

The range of `e_scale` is `[-254, 254]`, requiring at least nine signed bits when stored on its own. Combining it with element exponents and normalization adjustments requires a width chosen for the full resulting range. An input scale encoding of `0xFF` must first take the NaN classification path. These width requirements are derived from the E8M0 range in [OCP MX Section 5.4.1](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf).

An MXFP multiplication lane can therefore be organized as:

1. Decode elements `P1/P2`.
2. Decode shared scales `X1/X2`.
3. Multiply the elements through a small floating-point datapath.
4. Add the scale exponents.
5. Combine the paths in the exponent domain.
6. For a wider output format, produce a widened result.
7. For MXFP output, perform block-level rescaling and quantization.

The additional challenge is **generating, propagating, and writing back scales at block granularity**.

## 14. What MX Dot-Product Semantics Suggest About Hardware

The OCP MX specification gives the following minimum semantics for the dot product of two MX blocks:

```text
Dot(A, B) = X(A) × X(B) × Σ(Pi(A) × Pi(B))
```

Source: [OCP MX specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

This suggests a natural hardware organization:

- Compute `Pi(A) × Pi(B)` in individual lanes.
- Reduce the products through a summation structure.
- Handle the shared scale product `X(A) × X(B)` separately.

Many MXFP matrix-multiplication and dot-product units therefore fit an organization with low-precision element multiplication, wider accumulation, and separate exponent compensation for the shared scales:

```text
low-precision multiply + wider accumulation
```

The dot-product formula expresses a mathematical relationship. It does not guarantee exact internal summation or bitwise agreement with a sequence of FP32 FMAs. OCP MX v1.0 leaves internal dot-product precision and operation order implementation-defined. When summing across multiple blocks, each block also has its own `X(A) × X(B)`, so their scale differences must be handled.

Source: [OCP MX Sections 6.1–6.2](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

## 15. Quantization Boundaries in an MXFP Datapath

If the result is delivered as `FP16/BF16/FP32`, the datapath can decode elements and scales, multiply or accumulate in a wider representation, and pack the result into the wider output format.

Writing the result back as `MXFP8/MXFP6/MXFP4` adds block-level work:

1. Determine the block's dynamic range.
2. Select a new shared scale `X`.
3. Divide each element by that scale.
4. Quantize to the target element format.

The OCP MX section on conversion from scalar vectors to MX-compliant formats describes this process: choose the block scale, scale the elements, and quantize them. Quantization must support at least `roundTiesToEven`.

Source: [OCP MX specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)

For a conventional IEEE multiplier, the central question is:

> How can the hardware produce a correctly rounded floating-point product?

For an MXFP datapath, the system-level question also includes:

> How should shared scales be managed across a block, and how should wider results be requantized?

## 16. NVIDIA MXFP8 and Scale Granularity

NVIDIA's Transformer Engine documentation describes MXFP8 using:

- `x = x_fp8 * s_block`
- E4M3 as the default `x_fp8` format.
- An E8M0 `s_block` shared by 32 consecutive elements.

Source: [Transformer Engine MXFP8 documentation](https://nvidia.github.io/TransformerEngine/features/low_precision_training/mxfp8/mxfp8.html)

This matches the block size of 32 in the OCP MX specification.

More generally, smaller scaling blocks allow finer adaptation to local dynamic range and can improve numerical precision, but require more metadata and scale-management work. Larger blocks reduce scale overhead but may increase quantization error because more elements share one scale.

MXFP hardware design therefore involves a joint tradeoff among **format, bandwidth, and control complexity**.

## 17. A Suggested RTL Learning Sequence

For an educational or course project, the following sequence keeps the implementation manageable.

### Step A: A Minimal IEEE-Style Single-Precision Multiplier

Start with normal numbers, zero, and round-to-nearest-even. Establish the main path:

- Unpack.
- Generate the hidden bit.
- Add exponents.
- Multiply 24-bit significands.
- Normalize.
- Round using G/R/S.
- Pack.

### Step B: Subnormals, Infinity, NaN, and Exceptions

Add the features needed for a more complete FPU:

- Classification.
- Special-value bypasses.
- Underflow, overflow, invalid, and inexact flags.
- Normalization adjustments after rounding.

### Step C: An Internal Recoded Representation

A recoded representation can simplify the architecture and make later extensions easier, including FMA, configurable widths, and multiple formats.

### Step D: An MXFP Lane

MXFP is a useful second-generation design. It reuses floating-point multiplication concepts while adding block-scale control and requantization. Introducing it before the scalar datapath is stable makes these concerns harder to debug separately.

## 18. The Main Design Lessons

### 1. A Floating-Point Multiplier Contains More Than a Wide Multiplier

Its components include an integer exponent adder, a wide significand multiplier, a normalizer, a rounder, and special-value and exception control. Significand multiplication is expensive; rounding and special cases are frequent sources of correctness bugs.

### 2. Subnormal Handling Shapes the Main Datapath

Working directly on the original IEEE encoding requires additional conditional handling. Recoding first can present a more uniform representation to arithmetic.

### 3. Multiplication Often Feeds FMA

Preserving the wide intermediate product and delaying rounding are natural choices when multiplication feeds a fused operation.

### 4. MXFP Uses Block-Level Representation

MXFP combines a shared block scale with per-element encodings. Understanding this organization matters as much as understanding the reduced element width, because arithmetic and metadata management are coupled.

## 19. Closing Remarks

Two aspects of floating-point multiplication are easy to underestimate from a software perspective:

- Correct rounding and special-value handling are essential to compatibility.
- In MXFP, block-level scale handling can be more challenging than an individual multiplication lane.

A useful learning sequence is to understand an IEEE-style scalar multiplier, then study why FMA preserves a wider intermediate result, and finally examine how FP8 and MXFP combine numerical representation with data organization.

That foundation makes the arithmetic inside Tensor Cores, PE lanes, and low-precision MAC units easier to reason about.

## References

1. [IEEE 754-2019 standard page](https://standards.ieee.org/ieee/754/6210/)
2. [Berkeley HardFloat Verilog Modules](https://www.jhauser.us/arithmetic/HardFloat-1/doc/HardFloat-Verilog.html)
3. [CUDA Floating Point and IEEE 754](https://docs.nvidia.com/cuda/archive/8.0/floating-point/index.html)
4. [OCP 8-bit Floating Point Specification (OFP8)](https://www.opencompute.org/documents/ocp-8-bit-floating-point-specification-ofp8-revision-1-0-2023-12-01-pdf-1)
5. [OCP Microscaling Formats (MX) Specification](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)
6. [NVIDIA Transformer Engine: MXFP8](https://nvidia.github.io/TransformerEngine/features/low_precision_training/mxfp8/mxfp8.html)
7. [FPnew: An Open-Source Multi-Format Floating-Point Unit Architecture for Energy-Proportional Transprecision Computing](https://arxiv.org/abs/2007.01530)
