---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
I am studying at TU/e for my master degree. I got my bachelor degree from Hefei University of Technology(HFUT), China.

I am interested in **VLSI/ASIC/SoC Design, NoC, Neuromorphic Hardware and Efficient AI Hardware Accelerator**.

I am also looking for PhD position or full-time job in VLSI/SoC.
Here is my [CV](https://BoChen-Ye.github.io/files/CV.pdf).


# 📯 News
- *2024.03*: &nbsp;🎉🎉 Congratulations **[Intrinsic ID](https://www.intrinsic-id.com/)** is acquired by **[Synopsys](https://www.synopsys.com/)**.
- *2024.03*: &nbsp;🎉🎉 I change my master thesis to **[NXP Semiconductors](https://www.nxp.com/)** in Nijmegen, supervised by [Kimmo Salo](https://www.linkedin.com/in/kimmosalo/)(NXP), [Gustavo Naspolini](https://www.linkedin.com/in/gustavo-naspolini-b866287/)(NXP).
- *2023.11*: &nbsp;🎉🎉 I started working as a Oversea VC Intern(Remote) at [Linear Capital](https://www.linear.vc/).
- *2023.10*: &nbsp;🎉🎉 I finished my internship at Intrinsic ID and got 8.5 of internship. I also start my research on Neuromorphic at TU/e.
- *2023.07*: &nbsp;🎉🎉 I will be an intern at **[Intrinsic ID](https://www.intrinsic-id.com/)** for 3.5 months, supervised by [Rui Wang](https://www.linkedin.com/in/rui-wang-a4499611b/)(Intrinsic ID), [Roel Maes](https://www.linkedin.com/in/roel-maes-37ba4a4/)(Intrinsic ID) and [Manil Dev Gomony](https://www.tue.nl/en/research/researchers/manil-dev-gomony)(TU/e & Nokia Bell Labs).
- *2022.09*: &nbsp;🎉🎉 I started my master's study at TU/e.
- *2022.07*: &nbsp;🎉🎉 I am graduated from Hefei University of Technology with a bachelor degree, supervised by [Zhenmin Li](https://wdzxy.hfut.edu.cn/2020/1231/c11547a249635/page.htm).  

# 📝 Skill
- **Professional:** Verilog/SystemVerilog/VHDL · FPGA · MS Office · Linux · Cadence Tool(Virtuoso,Incisive,Genus,Innovus)
- **Miscellaneous:** Python · C/C++ · SystemC · MATLAB/Simulink · LaTex · CUDA · Pytorch · Perl/TCL/Shell · Git
- **Language:** Mandarian(Native), TOEFL(iBT) 92

# 🏫 Educations
## 2022.09-Now, Eindhoven University of Technology, Netherlands
- **Msc.Eletrical Engneering**(track:Electronic System) 
- **GPA:** [7.5/10](https://BoChen-Ye.github.io/files/transcript_Master.pdf)
- **Relevant Course:** Digital integrated circuit design, Embedded computer architecture, Electronic design automation,
					Applied combinatorial algorithms, Intelligent architectures(focus on DNN/Hardware co-design), 
					Systems on silicon(focus on SoC backend), Neuro computation(focus on Neuromorphic computing).

## 2018.09 - 2022.07, Hefei University of Technology, China
- **Bachelor** in Integrated Circuit Design and Integrated Systems 
- **GPA:** [83.1/100](https://BoChen-Ye.github.io/files/transcript_bsc.pdf) (TOP 22%)
- **Relevant Class:** Analysis and Design of Integrated Digital Circuit, Microprocessor architecture and design,
					Introduction to SoC design, Verilog HDL and FPGA implementation and so on.

# 💻 Internships
## 2024.03 - 2024.11, NXP Semidocutors, Nijmegen NL
-  **Digital Design Intern**

	I am working in AA-APS, this thesis project supervised by Kimmo Salo(NXP), Gustavo Naspolini(NXP), and Manil Dev Gomony(Bell Lab & TU/e).
	My work as follow:
	- Define a custom digital communication protocol between two ICs and modeling in **Simulink**.
	- Develop and verify an IP module implementing the new communication protocol using SystemVerilog.
	- Build a prototype demonstrator with FPGA(s).

## 2023.11 - 2024.06, Linear Capital, China(remote)
- **Oversea VC Intern**

	During my internship at Linear Capital, my responsibilities included:
	- Mapping overseas talent in the academic and industrial sectors, providing vital insights for project recruitment and business collaborations.
	- Conducting assessments for the commercialization and implementation of potential projects, analyzing market opportunities and risks to support investment decisions.
	- Participating in the planning and execution of early-stage investments, collaborating with startups to drive project success.
	
## 2023.07 - 2023.10, Intrinsic ID(Now acquired by Synopsys), Eindhoven NL
-  **IP Modeling and Digital IC Design Intern**

	I worked in Research and Security Department(now SoC Security of Synopsys). This internship supervised by Manil Dev Gomony(Bell Lab & TU/e) and Rui Wang & Roel Maes(Intrinsic ID).
	My work as follow:
	- Study on a trellis-based Reed-Muller codec.(Algorithm) 
	- Use **Python** modeling it as a digital IP module.(software)
	- Design the architecture of codec and implementation by **VHDL**.(harware)
	- Verify on **Arty-z7 FPGA**(zynq) with vivado and vitis.(Embeded System)
	- Under the 50MHz condition, after several improvements, the hardware resource consumption decreased from 938 LUTs to 843 LUTs. Meanwhile, the decoding latency reduced to 6 clock cycles, and continuous decoding became possible.

# 🔬 Research Experience
## 2023.10 - 2024.02, Neuromorphic Research Student
- Eindhoven University of Technology, Netherlands

	- I have completed the [literature review on Neuromorphic Hardware Accelerator and Neuromorphic NoC](https://github.com/BoChen-Ye/SpkingNN-on-Chip). 
	- I have started architectural simulation using [OpenSoC](https://github.com/BoChen-Ye/OpenSoCFabric) for the baseline NoC.
	- Work in Eletronic System group with Prof. [Manil Dev Gomony](https://www.tue.nl/en/research/researchers/manil-dev-gomony), Prof. [Federico Corradi](https://www.tue.nl/en/research/researchers/federico-corradi), and Prof. [Henk Corporaal](https://www.tue.nl/en/research/researchers/henk-corporaal).

## 2021.10 - 2022.05, NoC Research Student 
- Institute of VLSI Design of HFUT, China
	
	- Study the knowledge of [Network-on-Chip(NoC) Router Based on Packet Connected Circuit(PCC)](https://github.com/BoChen-Ye/Network-on-Chip-Router-Based-on-Packet-Connected-Circuit).
	- Implement the router and routing algorithm of PCC-NoC by using VerilogHDL.
	- Verify it on FPGA and use UART(with FIFO) to communicate with PC.
	- Use Python to verify result automatically.
	- This project as my bachelor graduation project got A and advised by Zhenmin Li(HFUT).

# 🔥 Project
## 2024.04 - Now, Tiny LeViT Hardware Accelerator(hobby project)
- This is my hobby project with **System Verilog**.
- Use row stationary (RS) and systolic array to get parallel computing. The delay is only 3 cycle from input data to first output data. Also, it has specific core to accelerate the convolutional layer when stride=2 and padding=1.
- For attention layer, use Tanh instead of softmax and use ReLU instead of Hardswish to simplify that difficulty of hardware calculation.

## 2023.05 - 2023.06, Low power design and synthesis of SOC based on MIPS and AES
- Used Verilog to design a SoC which include five-stage pipelined mMIPS processor core, AES encryption module, and AMBA bus and Used **Cadence Incisive** to simulation and functional verification.
- Used **Cadence Genus** for logic synthesis with low power strategies which is reduce 3% power consumption under 125MHz.
- Used **Cadence Innovus** for place and route with two power domain which is reduce 8% power consumption under 200MHz.

## 2023.02 - 2023.04, Inference acceleration of deep neural network based on TCU accelerator
- Train [a multilayer perceptron for handwritten digit classification(MNIST)](https://github.com/BoChen-Ye/MNIST-handwritten-digit-classification) using the **PyTorch** framework.
- Optimize a VGG5 for image classification using various quantization and pruning techniques. Explore the impact of these techniques on both accuracy and compute cost.
- Use open source [Tensil AI](https://www.tensil.ai/) for generating tensor computing units(TCU), compiling and accelerating ResNet20 by systolic array on PYNQ . 

## 2023.02 - 2023.03, [Five-stage pipelined RISC-V processor with full hazard handling(hobby project)](https://github.com/BoChen-Ye/RISC-V-five-stage-CPU)
- I have implemented a **RISC-V five-stage pipeline processor** with full hazard handling. The RTL level design using **Verilog** and simulated in Modelsim for simulation. 
- The processor can run the basic RV32i instructions, solves data conflicts, structure conflicts, and control conflicts, and supports stalling, flushing and forwarding.

## 2022.11 - 2023.01, Full Custom 16-bit Brent-Kung Adder Design
- Completed CMOS circuit design and layout design for a 45nm full custom 16-bit Brent-Kung adder. Circuit design and layout design via **Cadence Virtuoso**, DRC and LVS verification of the layout using **Calibre**. The circuit design can be functionally verified by simulation at 500MHz, 90◦C with an output rise and fall time of less than 100ps, and the layout results can be functionally verified at a post-simulation of 500MHz.

## 2022.12 - 2023.01, Implementation of image processing kernels on CUDA
- Mapping Grayscale processing and convolution 2D kernels from C to **CUDA** and optimaize the loop, then running on the Nvidia GPU.
- The result is that the processing time of 13 images is accelerated from 4872ms to 27ms.

## 2021.04 - 2021.06, A single-cycle CPU compatible with Microchip PIC16F54 microprocessor	
- The CPU is designed in modules, and each module uses Verilog HDL to design, which is implemented on the Basys3 after being verified by Modelsim pre-imitation. The complex C language load can run, and UART serial communication function controlled by softcore can be realized.

## 2020.12 - 2021.01, Design of Lightweight System Based on SystemC
- Studying the structural design of soc, and use **SystemC** to write Bus and UART serial interface, function processing module, arbiter module, data receiving and sending module to form a lightweight system and verify it. Drive data enters two processing modules, and one of the results is selected by the arbiter in the bus and sent to the receiving module through UART interface and displayed.

## 2020.10 - 2020.11, VLSI Simulation and Synthesis	
- Use VCS to verify the function of Tinycore based on RISC-V on the test platform.
- Use DC compiler to synthesize four different hardware description ALUs, and analyze the comprehensive report to compare and analyze different parameters.

# 📖 Self-Studying
- **[The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)**, MIT.

	- Content: Shell Tools and Scriptin, Editors (Vim), Data Wrangling, Command-line Environment, Version Control (Git). Debugging and Profiling, Metaprogramming, Security and Cryptography, Potpourri.

- **[How to Start a Startup](https://startupclass.samaltman.com/)**, Sam Altman in Stanford.

	- Current progress: Lecture 3.

- **[TinyML and Efficient Deep Learning Computing](https://efficientml.ai)**, MIT HAN LAB.
	
	- Content: Basics of Deep Learning, Pruning and Sparsity, Quantization, Neural Architecture Search, Knowledge distillation.

- **[一生一芯ysyx](https://ysyx.oscc.cc/)**, Institute of Computing technology, CAS.

	- Current progress: Prestudy->Stop.

- **[SoC 101](https://www.youtube.com/playlist?list=PLZU5hLL_713ygweO3b_9KiZUJuEI7I5yK)**, Adam Teman(Bar-Ilan University).
	
	- Focus on SoC architecture.

- **[Digital Design and Computer Architecture](https://safari.ethz.ch/digitaltechnik/doku.php)**, ETH.
	
	- beignner.

# 🎖 Honors and Awards
- *2022,* My bachelor thesis of NoC get A grade.
- *2021/2022,* Unergraduate Scholarship. 

# 🚩 Activities
## 2019.03 - 2020.07, HFUT Innovation and Entrepreneurship @ Big Data Center
Director, External Relations Department
- Participated in writing the introduction of the center. Led the Computer Science College's party branch in visiting and introducing the Big Data Center and led high school students from Hefei to visit the center.
-  Organized and planned the Innovation and Entrepreneurship Forum at the Big Data Center. Invited teachers from various colleges to give lectures. Attracted active participation from 500 students across the university.
- Participated in editing the WeChat official account of INOW Creators.

## 2019.09 - 2020.07, HFUT Electronics and Science Association
Director, Organizing Department
- Responsible for the Organization Department of the new District's daily work, organized and planned the new district association recruitment activities, thus the association became the largest association at our university.
- Coordinated the students' Union and other departments, carried out targeted basic teaching work, held "no innovation, not young" electronic science and technology exchange lectures and other activities, the association was rated as the annual model association.

## 2019.09 - 2020.07, HFUT National Microelectronics College Student Union
Director, Innovation and Entrepreneurship Department
- Responsible for organizing and promoting the Microelectronics College Innovation and Entrepreneurship Competition and the National College Student Electronics Design Competition training.
- Actively collaborated with the Big Data Center to facilitate the entry of Microelectronics College's innovation teams into the center.
