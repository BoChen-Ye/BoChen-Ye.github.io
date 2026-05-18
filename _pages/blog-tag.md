---
permalink: /blog/tag/
title: "Blog Tags"
excerpt: "Browse blog posts by tag."
author_profile: true
---

<div class="blog-index__intro blog-index__intro--minimal">
  <p class="blog-index__eyebrow">Research Notes</p>
  <h2>Tags</h2>
  <p>
    Browse posts by topic.
  </p>
</div>

{% include blog-filter-strip.html %}

<div class="archive blog-index">
  {% assign sorted_tags = site.tags | sort %}
  {% if sorted_tags.size > 0 %}
    {% for tag in sorted_tags %}
      <section class="blog-taxonomy-section" id="{{ tag[0] | slugify }}">
        <h2 class="blog-taxonomy-section__title">#{{ tag[0] }}</h2>
        <ul class="blog-post-list">
          {% assign posts = tag[1] | sort: 'date' | reverse %}
          {% for post in posts %}
            {% include blog-post-preview.html post=post %}
          {% endfor %}
        </ul>
      </section>
    {% endfor %}
  {% else %}
    <p>No tags available yet.</p>
  {% endif %}
</div>
