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
  <p>I am a second-year PhD student at <strong><a href="https://eng.ed.ac.uk/centre-electronics-frontiers">University of Edinburgh (UoE)</a></strong>, UK. I received my master's degree from <strong><a href="https://www.tue.nl/en/">Eindhoven University of Technology (TU/e)</a></strong>, Netherlands, and my bachelor's degree from <strong><a href="https://www.hfut.edu.cn/">Hefei University of Technology (HFUT)</a></strong>, China. My research focuses on digital hardware acceleration systems for large-scale AI models, with an emphasis on overcoming memory and computational bottlenecks through novel architectures. I am currently working on efficient hardware accelerators for LLMs, VLMs, and generative AI.</p>
</div>

<div class="homepage-copy homepage-copy--opportunity">
  <div class="opportunity-callout">
    <p><span class="opportunity-callout__label">Open to opportunities:</span> I am always interested in potential collaborations and open to research internship opportunities in both academia and industry. Please feel free to reach out via email.</p>
  </div>
  <p class="homepage-cv-link"><a href="{{ '/files/CV.pdf' | relative_url }}">Download my CV</a> <span>(Updated: May 2026)</span></p>
</div>

<span class="anchor" id="-news"></span>
<h1>News</h1>
<div class="news-feed news-feed__scroll">
  <p></p>
  <ul>
    <li>[2025.07] <span class="news-pill news-pill--paper">[Paper]</span> Our work "BenDi: An Energy-Efficient Quasi-Stochastic Systolic Architecture for Edge Bioelectronics" was accepted by <strong>ASAP 2026</strong> and selected for an <strong>oral presentation</strong>.</li>
    <li>[2026.04] I finished my first-year annual review.</li>
    <li>[2026.04] I presented a poster and gave a two-minute talk on <strong>Towards Scalable GenAI Hardware Architectures with a Design Space Exploration Framework</strong> at the <strong>School of Engineering Research Conference 2026</strong>.</li>
    <li>[2026.03] I served as a teaching assistant for the <strong>Mini ASIC-BASIC Workshop</strong> and delivered a tutorial on <strong>Digital ASIC Flow in GF-22nm</strong>.</li>
    <li>[2026.02] I completed my first tape-out, <strong>Bent-Pyramid Systolic Array</strong>, in TSMC-180nm and served as a demonstrator for <strong>Digital System Laboratory 4</strong>.</li>
    <li>[2025.11] I attended Europractice's <strong>Advanced Node Digital IC Implementation</strong> course and received the certificate.</li>
    <li>[2025.10] I joined <strong>MeMRISYS 2025</strong> in Edinburgh as a volunteer and served as a demonstrator for <strong>Digital System Laboratory 3</strong>.</li>
    <li>[2025.09] <span class="news-pill news-pill--conference">[Conference]</span> I presented my work "LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications" at <strong>SOCC 2025</strong> in Dubai, UAE.</li>
    <li>[2025.07] <span class="news-pill news-pill--paper">[Paper]</span> Our work "LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications" was accepted by <strong>SOCC 2025</strong> and selected for an <strong>oral presentation</strong>.</li>
    <li>[2025.01] I started my PhD at the <strong>University of Edinburgh</strong>, supervised by <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a> and <a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a>.</li>
    <li>[2024.11] I finished my internship at NXP Semiconductors and successfully defended my master's thesis at TU/e with a score of 8.5/10. Committee members: <a href="https://www.tue.nl/en/research/researchers/marc-geilen">Marc Geilen</a>, <a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a>, and <a href="https://www.tue.nl/en/research/researchers/chengmin-li">Chengmin Li</a>.</li>
    <li>[2024.09] I received a conditional <strong>PhD offer</strong> from the <strong>University of Edinburgh</strong>.</li>
    <li>[2024.03] Congratulations to <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> on being acquired by <a href="https://www.synopsys.com/">Synopsys</a>.</li>
    <li>[2024.03] I moved my master's thesis to <a href="https://www.nxp.com/">NXP Semiconductors</a> in Nijmegen, supervised by <a href="https://www.linkedin.com/in/kimmosalo/">Kimmo Salo</a> and <a href="https://www.linkedin.com/in/gustavo-naspolini-b866287/">Gustavo Naspolini</a>.</li>
    <li>[2023.11] I started working remotely as an Oversea VC Intern at <a href="https://www.linear.vc/">Linear Capital</a>.</li>
    <li>[2023.10] I completed my internship at Intrinsic ID with a score of 8.5 and also started my neuromorphic hardware research at TU/e.</li>
    <li>[2023.07] I joined <a href="https://www.intrinsic-id.com/">Intrinsic ID</a> for a 3.5-month internship, supervised by <a href="https://www.linkedin.com/in/rui-wang-a4499611b/">Rui Wang</a>, <a href="https://www.linkedin.com/in/roel-maes-37ba4a4/">Roel Maes</a>, and <a href="https://www.tue.nl/en/research/researchers/manil-dev-gomony">Manil Dev Gomony</a>.</li>
    <li>[2022.09] I started my master's study at <strong>Eindhoven University of Technology (TU/e), The Netherlands</strong>.</li>
    <li>[2022.07] I graduated from <strong>Hefei University of Technology</strong> with a bachelor's degree, supervised by <a href="https://wdzxy.hfut.edu.cn/2020/1231/c11547a249635/page.htm">Zhenmin Li</a>.</li>
  </ul>
</div>

<span class="anchor" id="-research-experience"></span>
<h1>Publications</h1>

<div class="paper-box paper-box--publication">
  <div class="paper-box-image">
    <div>
      <div class="badge">ASAP 2026</div>
      <img src="images/bendi.png" alt="ASAP paper figure" width="100%">
    </div>
  </div>
  <div class="paper-box-text">
    <p class="paper-box-text__title"><strong>BenDi: An Energy-Efficient Quasi-Stochastic Systolic Architecture for Edge Bioelectronics</strong></p>
    <p class="paper-box-text__authors"><strong>Bochen Ye</strong>, Yihan Pan, Shady Agwa, Themis Prodromakis (UoE)</p>
    <p class="paper-box-text__venue">IEEE International International Conference on Application-specific Systems, Architectures and Processors (<strong>ASAP</strong>), 2026</p>
    <p class="paper-box-text__note"><span class="publication-highlight">Accepted as Oral Presentation</span> and short paper</p>
    <p class="paper-box-text__links"><a href="">Paper</a> / <a href="">ArXiv</a> </p>
    <p class="paper-box-text__summary">In this work, we present BenDi, an energy-efficient quasi-stochastic systolic architecture for bioelectronic systems on the edge. BenDi leverages multiple levels of energy and power optimization, ranging from circuits to software quantization, including low supply voltage, the Bent-Pyramid data format for quasi-stochastic multiplication, the DiP systolic dataflow, and hardware-aware quantization, to handle CNNs with high accuracy on the edge within limited hardware budgets.</p>
  </div>
</div>

<div class="paper-box paper-box--publication">
  <div class="paper-box-image">
    <div>
      <div class="badge">SOCC 2025</div>
      <img src="images/socc.png" alt="SOCC paper figure" width="100%">
    </div>
  </div>
  <div class="paper-box-text">
    <p class="paper-box-text__title"><strong>LinkBo: a Single-Wire, Low-Latency, and Robust Protocol for Variable-Distance Chip-to-Chip Communications</strong></p>
    <p class="paper-box-text__authors"><strong>Bochen Ye</strong> (TU/e &amp; NXP), Gustavo Naspolini (NXP), Kimmo Salo (NXP), Manil Dev Gomony (TU/e)</p>
    <p class="paper-box-text__venue">IEEE International System-on-Chip Conference (<strong>SOCC</strong>), 2025</p>
    <p class="paper-box-text__note"><span class="publication-highlight">Accepted as Oral Presentation</span> and Student Contest</p>
    <p class="paper-box-text__links"><a href="https://ieeexplore.ieee.org/document/11235355">Paper</a> / <a href="https://BoChen-Ye.github.io/files/SOCC_LinkBo.pdf">Slides</a> / <a href="https://BoChen-Ye.github.io/files/LinkBo_poster.pdf">Poster</a> / <a href="https://arxiv.org/abs/2509.01339v1">ArXiv (Full Version)</a> / <a href="https://bochen-ye.github.io/LinkBo_web/">Website</a></p>
    <p class="paper-box-text__summary">We propose LinkBo, a single-wire communication protocol with dedicated hardware architecture, designed to achieve low latency (50.4 us), high throughput (up to 7.5 Mbps @ 11 cm and 300 kbps @ 15 m), and robust priority-aware delivery.</p>
  </div>
</div>

<span class="anchor" id="-educations"></span>
<h1>Education</h1>
<div class="profile-section">
  <div class="profile-section__list profile-education-list">
    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/uoe-logo.png' | relative_url }}" alt="University of Edinburgh logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">University of Edinburgh</h3>
        <p class="profile-entry__subtitle">PhD Student in Engineering</p>
        <p class="profile-entry__meta">January 2025 - Present</p>
        <p class="profile-entry__detail"><strong>Advisors:</strong> <a href="https://www.eng.ed.ac.uk/about/people/professor-themis-prodromakis">Professor Themis Prodromakis</a> and <a href="https://edwebprofiles.ed.ac.uk/profile/shadyagwa">Dr. Shady Agwa</a></p>
        <p class="profile-entry__detail"><strong>Research interest:</strong> Digital hardware accelerators for generative AI.</p>
      </div>
    </article>

    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/tue-logo.png' | relative_url }}" alt="Eindhoven University of Technology logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Eindhoven University of Technology</h3>
        <p class="profile-entry__subtitle">MSc Electrical Engineering, Electronic Systems Track</p>
        <p class="profile-entry__meta">September 2022 - November 2024</p>
        <p class="profile-entry__detail"><strong>GPA:</strong> <a href="https://BoChen-Ye.github.io/files/transcript_Master.pdf">7.8/10</a></p>
        <p class="profile-entry__detail"><strong>Thesis:</strong> <a href="https://pure.tue.nl/ws/portalfiles/portal/369257601/1805673_-_Ye_B._Bochen_-_Thesis_report_-_MEI.pdf">LinkBo: A Robust Low-Latency 1-Wire Protocol for Chip-to-Chip Communications</a> (8.5/10)</p>
      </div>
    </article>

    <article class="profile-entry profile-entry--education">
      <div class="profile-entry__logo-wrap">
        <img class="profile-entry__logo" src="{{ '/images/hfut-logo.png' | relative_url }}" alt="Hefei University of Technology logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Hefei University of Technology</h3>
        <p class="profile-entry__subtitle">Bachelor in Integrated Circuit Design and Integrated Systems</p>
        <p class="profile-entry__meta">September 2018 - July 2022</p>
        <p class="profile-entry__detail"><strong>GPA:</strong> <a href="https://BoChen-Ye.github.io/files/transcript_bsc.pdf">83.1/100</a> (Top 22%)</p>
        <p class="profile-entry__detail"><strong>Thesis:</strong> <a href="https://BoChen-Ye.github.io/files/Bsc_thesis.pdf">The Research and Implementation of Router for Packet-Connect-Circuit Network-on-chip</a></p>
      </div>
    </article>
  </div>
</div>

<span class="anchor" id="-internships"></span>
<h1>Experience</h1>
<div class="profile-section">
  <div class="profile-timeline">
    <article class="profile-entry profile-entry--timeline">
      <div class="profile-timeline__marker"></div>
      <div class="profile-entry__logo-wrap profile-entry__logo-wrap--timeline">
        <img class="profile-entry__logo" src="{{ '/images/nxp-logo.png' | relative_url }}" alt="NXP Semiconductors logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">NXP Semiconductors</h3>
        <p class="profile-entry__subtitle">Digital Design Intern</p>
        <p class="profile-entry__detail"><strong>Location:</strong> Nijmegen, The Netherlands</p>
        <p class="profile-entry__detail"><strong>Supervisors:</strong> Kimmo Salo, Gustavo Naspolini, and Manil Dev Gomony</p>
        <p class="profile-entry__meta">March 2024 - October 2024</p>
        <ul class="profile-entry__highlights">
          <li>A Robust Low-latency 1-wire Protocol for Chip-to-Chip Communications for PowerIC</li>
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
        <p class="profile-entry__subtitle">Oversea VC Intern</p>
        <p class="profile-entry__detail"><strong>Location:</strong> China (Remote, part-time)</p>
        <p class="profile-entry__detail"><strong>Mentor:</strong> Wei Xin, Songyan Huang</p>
        <p class="profile-entry__meta">November 2023 - June 2024</p>
      </div>
    </article>

    <article class="profile-entry profile-entry--timeline">
      <div class="profile-timeline__marker"></div>
      <div class="profile-entry__logo-wrap profile-entry__logo-wrap--timeline">
        <img class="profile-entry__logo" src="{{ '/images/intrinsic-logo.png' | relative_url }}" alt="Intrinsic ID logo">
      </div>
      <div class="profile-entry__content">
        <h3 class="profile-entry__title">Intrinsic ID <span class="profile-entry__annotation">(acquired by Synopsys)</span></h3>
        <p class="profile-entry__subtitle">IP Modeling and Digital IC Design Intern</p>
        <p class="profile-entry__detail"><strong>Location:</strong> Eindhoven, The Netherlands</p>
        <p class="profile-entry__detail"><strong>Supervisors:</strong> Manil Dev Gomony, Rui Wang, and Roel Maes</p>
        <p class="profile-entry__meta">July 2023 - October 2023</p>
        <ul class="profile-entry__highlights">
          <li>Focus on a trellis-based Reed-Muller codec on FPGA for PUF IP.</li>
        </ul>
      </div>
    </article>
  </div>
</div>

<span class="anchor" id="-honors-and-awards"></span>
<h1>Honors and Awards</h1>
<ul>
  <li>IEEE CAS Student Travel Grant, SOCC 2025</li>
  <li>Undergraduate Scholarship, 2021/2022</li>
</ul>

<span class="anchor" id="-skill"></span>
<h1>Skill</h1>
<ul>
  <li><strong>Professional:</strong> Verilog / SystemVerilog / VHDL, FPGA, Lint, Linux, Cadence tools (Xcelium, SimVision, Conformal Lint, Virtuoso, Genus, Innovus)</li>
  <li><strong>Miscellaneous:</strong> Python, C/C++, SystemC, MATLAB / Simulink, LaTeX, CUDA, PyTorch, Perl / TCL / Shell, Git</li>
  <li><strong>Language:</strong> Mandarin (native), English</li>
</ul>

<div class="visitor-map">
  <div class="visitor-map__widget">
    {% if site.clustrmaps.enabled and site.clustrmaps.widget_id and site.clustrmaps.widget_id != "" %}
      <div
        data-clustrmaps-widget
        data-widget-id="{{ site.clustrmaps.widget_id }}"
        data-widget-width="{{ site.clustrmaps.width | default: 200 }}">
      </div>
      <noscript>
        <a href="https://clustrmaps.com/site/1c4l5" title="ClustrMaps visitor map">
          <img src="https://clustrmaps.com/map_v2.png?d={{ site.clustrmaps.widget_id }}&cl=ffffff&w={{ site.clustrmaps.width | default: 200 }}&t=n" alt="ClustrMaps visitor map">
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
