---
permalink: /blog/
title: "Blog"
excerpt: "Notes on AI hardware, projects, and research progress."
author_profile: true
---

<div class="blog-index__intro">
  <p class="blog-index__eyebrow">Research Notes</p>
  <h2>Longer writing beyond the homepage</h2>
  <p>
    This page collects project notes, engineering write-ups, and research reflections.
    It is meant to be a lighter, more update-friendly space than the main homepage.
  </p>
</div>

{% assign posts = site.posts %}

<div class="archive blog-index">
  {% if posts.size > 0 %}
    <div class="blog-card-grid">
      {% for post in posts %}
        <article class="blog-card" itemscope itemtype="http://schema.org/CreativeWork">
          {% assign post_cover = post.cover_image | default: post.image %}
          {% if post_cover %}
            <a class="archive__item-teaser blog-card__cover" href="{{ post.url | relative_url }}">
              <img src="{{ post_cover | relative_url }}" alt="{{ post.title }}">
            </a>
          {% endif %}
          <p class="blog-card__meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %-d, %Y" }}
            </time>
          </p>
          <h2 class="archive__item-title blog-card__title" itemprop="headline">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          {% if post.excerpt %}
            <p class="archive__item-excerpt blog-card__excerpt" itemprop="description">
              {{ post.excerpt | markdownify | strip_html | strip_newlines }}
            </p>
          {% endif %}
          {% if post.tags and post.tags.size > 0 %}
            <div class="blog-card__tags">
              {% for tag in post.tags limit:3 %}
                <span class="page__taxonomy-item">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
          <p class="blog-card__footer">
            <a class="btn btn--info btn--small" href="{{ post.url | relative_url }}">Read article</a>
          </p>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>No posts published yet. The first article will appear here once a file is added to <code>_posts/</code>.</p>
  {% endif %}
</div>
