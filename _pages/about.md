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

<span class="anchor" id="about-me"></span>

<div class="homepage-copy">
  <p class="lang-en">I am a second-year PhD student at <strong><a href="https://eng.ed.ac.uk/centre-electronics-frontiers">University of Edinburgh (UoE)</a></strong>, UK. I received my master's degree from <strong><a href="https://www.tue.nl/en/">Eindhoven University of Technology (TU/e)</a></strong>, Netherlands, and my bachelor's degree from <strong><a href="https://www.hfut.edu.cn/">Hefei University of Technology (HFUT)</a></strong>, China. My research focuses on digital hardware acceleration systems for large-scale AI models, with an emphasis on overcoming memory and computational bottlenecks through novel architectures. I am currently working on efficient hardware accelerators for LLMs, VLMs, and generative AI.</p>
  <p class="lang-zh">我目前是英国<strong><a href="https://eng.ed.ac.uk/centre-electronics-frontiers">爱丁堡大学（UoE）</a></strong>工程学院二年级博士生，此前获得荷兰<strong><a href="https://www.tue.nl/en/">埃因霍温理工大学（TU/e）</a></strong>硕士学位，以及中国<strong><a href="https://www.hfut.edu.cn/">合肥工业大学（HFUT）</a></strong>学士学位。我的研究主要聚焦于面向大规模人工智能模型的数字硬件加速系统设计，希望通过新型体系结构缓解存储与计算瓶颈。目前的重点方向包括 LLM、VLM 以及生成式 AI 的高效硬件加速器。</p>
</div>

<div class="homepage-copy homepage-copy--legacy-intro">
  <p class="lang-en">Here is my <a href="https://BoChen-Ye.github.io/files/CV.pdf">CV</a>. I am always open to research collaborations, so please feel free to contact me if my work resonates with your interests.</p>
  <p class="lang-zh">这里是我的 <a href="https://BoChen-Ye.github.io/files/CV.pdf">CV</a>。我一直欢迎潜在的科研合作，如果你的研究方向和我的工作有交集，欢迎随时与我联系。</p>
</div>

<div class="homepage-copy homepage-copy--opportunity">
  <div class="opportunity-callout">
    <p class="lang-en"><span class="opportunity-callout__label">Open to opportunities:</span> I am always interested in potential collaborations and open to research internship opportunities in both academia and industry. Please feel free to reach out via email.</p>
    <p class="lang-zh"><span class="opportunity-callout__label">开放合作与机会：</span>我一直欢迎潜在合作，也对来自学术界和工业界的科研实习与合作机会保持开放。欢迎通过邮件与我联系。</p>
  </div>
  <p class="homepage-cv-link lang-en"><a href="{{ '/files/CV.pdf' | relative_url }}">Download my CV</a> <span>(Updated: May 2026)</span></p>
  <p class="homepage-cv-link lang-zh"><a href="{{ '/files/CV.pdf' | relative_url }}">下载我的简历</a> <span>（更新于：2026 年 5 月）</span></p>
</div>

<span class="anchor" id="-news"></span>
<h1><span class="lang-en">News</span><span class="lang-zh">新闻</span></h1>
<div class="news-feed news-feed__scroll">
  <p></p>
  <ul>
    <li><span class="lang-en">[2026.04] I finished my first-year annual review.</span><span class="lang-zh">[2026.04] 我顺利完成了博士第一年的年度考核。</span></li>
    <li><span class="lang-en">[2026.04] I presented a poster and gave a two-minute talk on <strong>Towards Scalable GenAI Hardware Architectures with a Design Space Exploration Framework</strong> at the <strong>School of Engineering Research Conference 2026</strong>.</span><span class="lang-zh">[2026.04] 我在 <strong>School of Engineering Research Conference 2026</strong> 上展示了海报，并就 <strong>Towards Scalable GenAI Hardware Architectures with a Design Space Exploration Framework</strong> 做了两分钟口头介绍。</span></li>
    <li><span class="lang-en">[2026.03] I served as a teaching assistant for the <strong>Mini ASIC-BASIC Workshop</strong> and delivered a tutorial on <strong>Digital ASIC Flow in GF-22nm</strong>.</span><span class="lang-zh">[2026.03] 我担任 <strong>Mini ASIC-BASIC Workshop</strong> 助教，并讲授了 <strong>Digital ASIC Flow in GF-22nm</strong> 相关教程。</span></li>
    <li><span class="lang-en">[2026.02] I completed my first tape-out, <strong>Bent-Pyramid Systolic Array</strong>, in TSMC-180nm and served as a demonstrator for <strong>Digital System Laboratory 4</strong>.</span><span class="lang-zh">[2026.02] 我完成了第一颗流片芯片 <strong>Bent-Pyramid Systolic Array</strong>（TSMC-180nm），并担任 <strong>Digital System Laboratory 4</strong> demonstrator。</span></li>
    <li><span class="lang-en">[2025.11] I attended Europractice's <strong>Advanced Node Digital IC Implementation</strong> course and received the certificate.</span><span class="lang-zh">[2025.11] 我参加了 Europractice 的 <strong>Advanced Node Digital IC Implementation</strong> 课程，并获得结业证书。</span></li>
    <li><span class="lang-en">[2025.10] I joined <strong>MeMRISYS 2025</strong> in Edinburgh as a volunteer and served as a demonstrator for <strong>Digital System Laboratory 3</strong>.</span><span class="lang-zh">[2025.10] 我在爱丁堡以志愿者身份参加 <strong>MeMRISYS 2025</strong>，并担任 <strong>Digital System Laboratory 3</strong> demonstrator。</span></li>
    <li><span class="lang-en">[2025.09] <span class="news-pill news-pill--conference">[Conference]</span> I presented my work "LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications" at <strong>SOCC 2025</strong> in Dubai, UAE.</span><span class="lang-zh">[2025.09] <span class="news-pill news-pill--conference">[会议]</span> 我在阿联酋迪拜举办的 <strong>SOCC 2025</strong> 上汇报了论文 “LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications”。</span></li>
    <li><span class="lang-en">[2025.07] <span class="news-pill news-pill--paper">[Paper]</span> Our work "LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications" was accepted by <strong>SOCC 2025</strong> and selected for an <strong>oral presentation</strong>.</span><span class="lang-zh">[2025.07] <span class="news-pill news-pill--paper">[论文]</span> 我们的工作 “LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications” 被 <strong>SOCC 2025</strong> 接收，并被选为<strong>口头报告</strong>。</span></li>
    <li><span class="lang-en">[2025.01] I started my PhD at the <strong>University of Edinburgh</strong>, supervised by <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a> and <a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a>.</span><span class="lang-zh">[2025.01] 我在<strong>爱丁堡大学</strong>开始博士学习，由 <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a> 和 <a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a> 指导。</span></li>
    <li><span class="lang-en">[2024.11] I finished my internship at NXP Semiconductors and successfully defended my master's thesis at TU/e with a score of 8.5/10. Committee members: <a href="https://www.tue.nl/en/research/researchers/marc-geilen">Marc Geilen</a>, <a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a>, and <a href="https://www.tue.nl/en/research/researchers/chengmin-li">Chengmin Li</a>.</span><span class="lang-zh">[2024.11] 我完成了在 NXP Semiconductors 的实习，并在 TU/e 以 8.5/10 的成绩顺利完成硕士答辩。答辩委员会成员包括 <a href="https://www.tue.nl/en/research/researchers/marc-geilen">Marc Geilen</a>、<a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a> 和 <a href="https://www.tue.nl/en/research/researchers/chengmin-li">Chengmin Li</a>。</span></li>
    <li><span class="lang-en">[2024.09] I received a conditional <strong>PhD offer</strong> from the <strong>University of Edinburgh</strong>.</span><span class="lang-zh">[2024.09] 我收到了<strong>爱丁堡大学</strong>的有条件<strong>博士录取</strong>。</span></li>
    <li><span class="lang-en">[2024.03] Congratulations to <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> on being acquired by <a href="https://www.synopsys.com/">Synopsys</a>.</span><span class="lang-zh">[2024.03] 祝贺 <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> 被 <a href="https://www.synopsys.com/">Synopsys</a> 收购。</span></li>
    <li><span class="lang-en">[2024.03] I moved my master's thesis to <a href="https://www.nxp.com/">NXP Semiconductors</a> in Nijmegen, supervised by <a href="https://www.linkedin.com/in/kimmosalo/">Kimmo Salo</a> and <a href="https://www.linkedin.com/in/gustavo-naspolini-b866287/">Gustavo Naspolini</a>.</span><span class="lang-zh">[2024.03] 我的硕士论文课题转到奈梅亨的 <a href="https://www.nxp.com/">NXP Semiconductors</a> 完成，由 <a href="https://www.linkedin.com/in/kimmosalo/">Kimmo Salo</a> 和 <a href="https://www.linkedin.com/in/gustavo-naspolini-b866287/">Gustavo Naspolini</a> 指导。</span></li>
    <li><span class="lang-en">[2023.11] I started working remotely as an Oversea VC Intern at <a href="https://www.linear.vc/">Linear Capital</a>.</span><span class="lang-zh">[2023.11] 我开始在 <a href="https://www.linear.vc/">Linear Capital</a> 远程担任海外 VC 实习生。</span></li>
    <li><span class="lang-en">[2023.10] I completed my internship at Intrinsic ID with a score of 8.5 and also started my neuromorphic hardware research at TU/e.</span><span class="lang-zh">[2023.10] 我完成了在 Intrinsic ID 的实习并获得 8.5 分，同时开始在 TU/e 开展神经形态方向研究。</span></li>
    <li><span class="lang-en">[2023.07] I joined <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> for a 3.5-month internship, supervised by <a href="https://www.linkedin.com/in/rui-wang-a4499611b/">Rui Wang</a>, <a href="https://www.linkedin.com/in/roel-maes-37ba4a4/">Roel Maes</a>, and <a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a>.</span><span class="lang-zh">[2023.07] 我在 <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> 开始了为期 3.5 个月的实习，由 <a href="https://www.linkedin.com/in/rui-wang-a4499611b/">Rui Wang</a>、<a href="https://www.linkedin.com/in/roel-maes-37ba4a4/">Roel Maes</a> 和 <a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a> 指导。</span></li>
    <li><span class="lang-en">[2022.09] I started my master's study at <strong>Eindhoven University of Technology (TU/e), The Netherlands</strong>.</span><span class="lang-zh">[2022.09] 我开始在<strong>荷兰埃因霍温理工大学（TU/e）</strong>攻读硕士学位。</span></li>
    <li><span class="lang-en">[2022.07] I graduated from <strong>Hefei University of Technology</strong> with a bachelor's degree, supervised by <a href="https://wdzxy.hfut.edu.cn/2020/1231/c11547a249635/page.htm">Zhenmin Li</a>.</span><span class="lang-zh">[2022.07] 我从<strong>合肥工业大学</strong>本科毕业，由 <a href="https://wdzxy.hfut.edu.cn/2020/1231/c11547a249635/page.htm">Zhenmin Li</a> 老师指导完成毕业设计。</span></li>
  </ul>
</div>

<span class="anchor" id="-research-experience"></span>
<h1><span class="lang-en">Publications</span><span class="lang-zh">论文发表</span></h1>

<div class="paper-box paper-box--publication">
  <div class="paper-box-image">
    <div>
      <div class="badge">SOCC 2025</div>
      <img src="images/socc.png" alt="SOCC paper figure" width="100%">
    </div>
  </div>
  <div class="paper-box-text">
    <p class="paper-box-text__title"><strong>LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications</strong></p>
    <p class="paper-box-text__authors"><span class="lang-en"><strong>Bochen Ye</strong> (TU/e &amp; NXP), Gustavo Naspolini (NXP), Kimmo Salo (NXP), Manil Dev Gomony (TU/e)</span><span class="lang-zh"><strong>Bochen Ye</strong>（TU/e &amp; NXP）, Gustavo Naspolini（NXP）, Kimmo Salo（NXP）, Manil Dev Gomony（TU/e）</span></p>
    <p class="paper-box-text__venue"><span class="lang-en">IEEE International System-on-Chip Conference (<strong>SOCC</strong>), 2025</span><span class="lang-zh">IEEE International System-on-Chip Conference（<strong>SOCC</strong>）, 2025</span></p>
    <p class="paper-box-text__note"><span class="lang-en"><span class="publication-highlight">Selected as Oral Presentation</span> and Student Contest</span><span class="lang-zh"><span class="publication-highlight">入选口头报告</span>，并进入 Student Contest</span></p>
    <p class="paper-box-text__links"><a href="https://ieeexplore.ieee.org/document/11235355">Paper</a> / <a href="https://BoChen-Ye.github.io/files/SOCC_LinkBo.pdf">Slides</a> / <a href="https://BoChen-Ye.github.io/files/LinkBo_poster.pdf">Poster</a> / <a href="https://arxiv.org/abs/2509.01339v1">ArXiv (Full Version)</a> / <a href="https://bochen-ye.github.io/LinkBo_web/">Website</a></p>
    <p class="paper-box-text__summary"><span class="lang-en">We propose LinkBo, a single-wire communication protocol with dedicated hardware architecture, designed to achieve low latency (50.4 us), high throughput (up to 7.5 Mbps @ 11 cm and 300 kbps @ 15 m), and robust priority-aware delivery.</span><span class="lang-zh">我们提出了 LinkBo。这是一种配套专用硬件架构的单线通信协议，能够实现低延迟（50.4 us）、高吞吐（11 cm 条件下最高 7.5 Mbps，15 m 条件下 300 kbps），并具备优先级感知的鲁棒传输能力。</span></p>
  </div>
</div>

<span class="anchor" id="-educations"></span>
<h1><span class="lang-en">Education</span><span class="lang-zh">教育经历</span></h1>
<div class="profile-section">
  <div class="profile-section__list profile-education-list">
    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/uoe-logo.png' | relative_url }}" alt="University of Edinburgh logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">University of Edinburgh</h3>
        <p class="profile-entry__subtitle"><span class="lang-en">PhD Student in Engineering</span><span class="lang-zh">工程学院博士生</span></p>
        <p class="profile-entry__meta"><span class="lang-en">January 2025 - Present</span><span class="lang-zh">2025 年 1 月 - 至今</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Advisors:</strong> <a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a> and <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a></span><span class="lang-zh"><strong>导师：</strong><a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a> 和 <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a></span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Research interest:</strong> Digital hardware accelerators for generative AI.</span><span class="lang-zh"><strong>研究方向：</strong>面向生成式 AI 的数字硬件加速器。</span></p>
      </div>
    </article>

    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/tue-logo.png' | relative_url }}" alt="Eindhoven University of Technology logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Eindhoven University of Technology</h3>
        <p class="profile-entry__subtitle"><span class="lang-en">MSc Electrical Engineering, Electronic Systems Track</span><span class="lang-zh">电气工程硕士，Electronic Systems 方向</span></p>
        <p class="profile-entry__meta"><span class="lang-en">September 2022 - November 2024</span><span class="lang-zh">2022 年 9 月 - 2024 年 11 月</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>GPA:</strong> <a href="https://BoChen-Ye.github.io/files/transcript_Master.pdf">7.8/10</a></span><span class="lang-zh"><strong>绩点：</strong><a href="https://BoChen-Ye.github.io/files/transcript_Master.pdf">7.8/10</a></span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Thesis:</strong> <a href="https://pure.tue.nl/ws/portalfiles/portal/369257601/1805673_-_Ye_B._Bochen_-_Thesis_report_-_MEI.pdf">LinkBo: A Robust Low-Latency 1-Wire Protocol for Chip-to-Chip Communications</a> (8.5/10)</span><span class="lang-zh"><strong>硕士论文：</strong><a href="https://pure.tue.nl/ws/portalfiles/portal/369257601/1805673_-_Ye_B._Bochen_-_Thesis_report_-_MEI.pdf">LinkBo: A Robust Low-Latency 1-Wire Protocol for Chip-to-Chip Communications</a>（8.5/10）</span></p>
        
      </div>
    </article>

    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/hfut-logo.png' | relative_url }}" alt="Hefei University of Technology logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Hefei University of Technology</h3>
        <p class="profile-entry__subtitle"><span class="lang-en">Bachelor in Integrated Circuit Design and Integrated Systems</span><span class="lang-zh">集成电路设计与集成系统本科</span></p>
        <p class="profile-entry__meta"><span class="lang-en">September 2018 - July 2022</span><span class="lang-zh">2018 年 9 月 - 2022 年 7 月</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>GPA:</strong> <a href="https://BoChen-Ye.github.io/files/transcript_bsc.pdf">83.1/100</a> (Top 22%)</span><span class="lang-zh"><strong>绩点：</strong><a href="https://BoChen-Ye.github.io/files/transcript_bsc.pdf">83.1/100</a>（前 22%）</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Thesis:</strong> <a href="https://BoChen-Ye.github.io/files/Bsc_thesis.pdf">The Research and Implementation of Router for Packet-Connect-Circuit Network-on-chip</a></span><span class="lang-zh"><strong>本科论文：</strong><a href="https://BoChen-Ye.github.io/files/Bsc_thesis.pdf">The Research and Implementation of Router for Packet-Connect-Circuit Network-on-chip</a></span></p>
        
      </div>
    </article>
  </div>
</div>

<span class="anchor" id="-internships"></span>
<h1><span class="lang-en">Experience</span><span class="lang-zh">实习经历</span></h1>
<div class="profile-section">
  <div class="profile-timeline">
    <article class="profile-entry profile-entry--timeline">
      <div class="profile-timeline__marker"></div>
      <div class="profile-entry__logo-wrap profile-entry__logo-wrap--timeline">
        <img class="profile-entry__logo" src="{{ '/images/nxp-logo.png' | relative_url }}" alt="NXP Semiconductors logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">NXP Semiconductors</h3>
        <p class="profile-entry__subtitle"><span class="lang-en">Digital Design Intern</span><span class="lang-zh">数字设计实习生</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Location:</strong> Nijmegen, The Netherlands</span><span class="lang-zh"><strong>地点：</strong>荷兰奈梅亨</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Supervisors:</strong> Kimmo Salo, Gustavo Naspolini, and Manil Dev Gomony</span><span class="lang-zh"><strong>导师：</strong>Kimmo Salo、Gustavo Naspolini 和 Manil Dev Gomony</span></p>
        <p class="profile-entry__meta"><span class="lang-en">March 2024 - October 2024</span><span class="lang-zh">2024 年 3 月 - 2024 年 10 月</span></p>
        <ul class="profile-entry__highlights">
          <li><span class="lang-en">A Robust Low-latency 1-wire Protocol for Chip-to-Chip Communications for PowerIC</span><span class="lang-zh">一种面向 PowerIC 芯片间通信的鲁棒低延迟单线协议。</span></li>
        </ul>
      </div>
    </article>

    <article class="profile-entry profile-entry--timeline">
      <div class="profile-timeline__marker"></div>
      <div class="profile-entry__logo-wrap profile-entry__logo-wrap--timeline">
        <img class="profile-entry__logo" src="{{ '/images/linear-logo.png' | relative_url }}" alt="Linear Capital logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Linear Capital</h3>
        <p class="profile-entry__subtitle"><span class="lang-en">Oversea VC Intern</span><span class="lang-zh">海外 VC 实习生</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Location:</strong> China (Remote, part-time)</span><span class="lang-zh"><strong>地点：</strong>中国（远程，兼职）</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Mentor:</strong> Wei Xin, Songyan Huang</span><span class="lang-zh"><strong>导师：</strong>Wei Xin, Songyan Huang</span></p>
        <p class="profile-entry__meta"><span class="lang-en">November 2023 - June 2024</span><span class="lang-zh">2023 年 11 月 - 2024 年 6 月</span></p>
        
      </div>
    </article>

    <article class="profile-entry profile-entry--timeline">
      <div class="profile-timeline__marker"></div>
      <div class="profile-entry__logo-wrap profile-entry__logo-wrap--timeline">
        <img class="profile-entry__logo" src="{{ '/images/intrinsic-logo.png' | relative_url }}" alt="Intrinsic ID logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">
          <span class="lang-en">Intrinsic ID <span class="profile-entry__annotation">(acquired by Synopsys)</span></span>
          <span class="lang-zh">Intrinsic ID <span class="profile-entry__annotation">（&#34987; Synopsys &#25910;&#36141;）</span></span>
        </h3>
        <p class="profile-entry__subtitle"><span class="lang-en">IP Modeling and Digital IC Design Intern</span><span class="lang-zh">IP 建模与数字 IC 设计实习生</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Location:</strong> Eindhoven, The Netherlands</span><span class="lang-zh"><strong>地点：</strong>荷兰埃因霍温</span></p>
        <p class="profile-entry__detail"><span class="lang-en"><strong>Supervisors:</strong> Manil Dev Gomony, Rui Wang, and Roel Maes</span><span class="lang-zh"><strong>导师：</strong>Manil Dev Gomony、Rui Wang 和 Roel Maes</span></p>
        <p class="profile-entry__meta"><span class="lang-en">July 2023 - October 2023</span><span class="lang-zh">2023 年 7 月 - 2023 年 10 月</span></p>
        <ul class="profile-entry__highlights">
          <li><span class="lang-en">Focus on a trellis-based Reed-Muller codec on FPGA for PUF IP.</span><span class="lang-zh">面向 PUF 的基于网格树结构的一阶 Reed-Muller 编解码器在 FPGA 上的实现。</span></li>
        </ul>
      </div>
    </article>
  </div>
</div>

<span class="anchor" id="-honors-and-awards"></span>
<h1><span class="lang-en">Honors and Awards</span><span class="lang-zh">荣誉奖励</span></h1>
<ul>
  <li><span class="lang-en">IEEE CAS Student Travel Grant, SOCC 2025</span><span class="lang-zh">IEEE CAS 学生差旅资助，SOCC 2025</span></li>
  <li><span class="lang-en">Undergraduate Scholarship, 2021/2022</span><span class="lang-zh">本科生奖学金，2021/2022 学年</span></li>
</ul>

<span class="anchor" id="-skill"></span>
<h1><span class="lang-en">Skill</span><span class="lang-zh">技能</span></h1>
<ul>
  <li><span class="lang-en"><strong>Professional:</strong> Verilog / SystemVerilog / VHDL, FPGA, Lint, Linux, Cadence tools (Xcelium, SimVision, Conformal Lint, Virtuoso, Genus, Innovus)</span><span class="lang-zh"><strong>专业技能：</strong>Verilog / SystemVerilog / VHDL、FPGA、Lint、Linux，以及 Cadence 工具链（Xcelium、SimVision、Conformal Lint、Virtuoso、Genus、Innovus）</span></li>
  <li><span class="lang-en"><strong>Miscellaneous:</strong> Python, C/C++, SystemC, MATLAB / Simulink, LaTeX, CUDA, PyTorch, Perl / TCL / Shell, Git</span><span class="lang-zh"><strong>其他技能：</strong>Python、C/C++、SystemC、MATLAB / Simulink、LaTeX、CUDA、PyTorch、Perl / TCL / Shell、Git</span></li>
  <li><span class="lang-en"><strong>Language:</strong> Mandarin (native), English</span><span class="lang-zh"><strong>语言：</strong>中文（母语）、英文</span></li>
</ul>

<div class="visitor-map">
  <div class="visitor-map__widget">
    {% if site.clustrmaps.enabled and site.clustrmaps.widget_id and site.clustrmaps.widget_id != "" %}
      <a
        class="visitor-map__link"
        href="https://clustrmaps.com/site/1c4l5"
        title="ClustrMaps visitor map"
        target="_blank"
        rel="noopener noreferrer">
        <img
          data-clustrmaps-image
          data-widget-id="{{ site.clustrmaps.widget_id }}"
          data-widget-width="{{ site.clustrmaps.width | default: 200 }}"
          alt="ClustrMaps visitor map">
      </a>
      <noscript>
        <a href="https://clustrmaps.com/site/1c4l5" title="ClustrMaps visitor map">
          <img src="//clustrmaps.com/map_v2.png?d={{ site.clustrmaps.widget_id }}&cl=ffffff&w={{ site.clustrmaps.width | default: 200 }}&t=n" alt="ClustrMaps visitor map">
        </a>
      </noscript>
    {% else %}
      <div class="visitor-map__placeholder">
        ClustrMaps is enabled, but the widget token is not set yet.
        Paste the <code>d=...</code> value from your ClustrMaps embed code into <code>_config.yml</code> under <code>clustrmaps.widget_id</code>.
      </div>
    {% endif %}
  </div>
</div>
