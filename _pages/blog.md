---
permalink: /blog/
title: "Blog"
excerpt: "Notes on AI hardware, projects, and research progress."
author_profile: true
---

<div class="blog-index__intro blog-index__intro--minimal">
  <p class="blog-index__eyebrow">Research Notes</p>
  <h2>Blogs</h2>
  <p>
    Notes on AI hardware, engineering workflows, and research progress.
  </p>
</div>

{% include blog-filter-strip.html %}

<div class="archive blog-index">
  {% if site.posts.size > 0 %}
    <ul class="blog-post-list">
      {% for post in site.posts %}
        {% include blog-post-preview.html post=post %}
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts published yet. The first article will appear here once a file is added to <code>_posts/</code>.</p>
  {% endif %}
</div>
