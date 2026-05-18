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

{% assign posts = site.posts %}

<div class="archive blog-index">
  {% if posts.size > 0 %}
    <ul class="blog-post-list">
      {% for post in posts %}
        {% assign post_cover = post.thumbnail | default: post.cover_image | default: post.image %}
        {% assign post_summary = post.description | default: post.excerpt %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
        {% assign year = post.date | date: "%Y" %}
        <li class="blog-post-list__item">
          <article class="blog-post-preview" itemscope itemtype="http://schema.org/CreativeWork">
            <div class="blog-post-preview__main">
              <h2 class="archive__item-title blog-post-preview__title" itemprop="headline">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h2>
              {% if post_summary %}
                <p class="archive__item-excerpt blog-post-preview__excerpt" itemprop="description">
                  {{ post_summary | markdownify | strip_html | strip_newlines }}
                </p>
              {% endif %}
              <p class="blog-post-preview__meta">
                {{ read_time }} min read
                <span>&middot;</span>
                <time datetime="{{ post.date | date_to_xmlschema }}">
                  {{ post.date | date: "%B %-d, %Y" }}
                </time>
              </p>
              <p class="blog-post-preview__tags">
                <span class="blog-post-preview__year">{{ year }}</span>
                {% if post.tags and post.tags.size > 0 %}
                  <span>&middot;</span>
                  {% for tag in post.tags %}
                    <span class="blog-post-preview__tag">#{{ tag }}</span>{% unless forloop.last %} {% endunless %}
                  {% endfor %}
                {% endif %}
              </p>
            </div>
            {% if post_cover %}
              <a class="blog-post-preview__thumb" href="{{ post.url | relative_url }}">
                <img src="{{ post_cover | relative_url }}" alt="{{ post.title }}">
              </a>
            {% endif %}
          </article>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts published yet. The first article will appear here once a file is added to <code>_posts/</code>.</p>
  {% endif %}
</div>
