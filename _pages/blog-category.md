---
permalink: /blog/category/
title: "Blog Categories"
excerpt: "Browse blog posts by category."
author_profile: true
---

<div class="blog-index__intro blog-index__intro--minimal">
  <p class="blog-index__eyebrow">Research Notes</p>
  <h2>Categories</h2>
  <p>
    Browse posts by category.
  </p>
</div>

{% include blog-filter-strip.html %}

<div class="archive blog-index">
  {% assign sorted_categories = site.categories | sort %}
  {% if sorted_categories.size > 0 %}
    {% for category in sorted_categories %}
      <section class="blog-taxonomy-section" id="{{ category[0] | slugify }}">
        <h2 class="blog-taxonomy-section__title">{{ category[0] }}</h2>
        <ul class="blog-post-list">
          {% assign posts = category[1] | sort: 'date' | reverse %}
          {% for post in posts %}
            {% include blog-post-preview.html post=post %}
          {% endfor %}
        </ul>
      </section>
    {% endfor %}
  {% else %}
    <p>No categories available yet.</p>
  {% endif %}
</div>
