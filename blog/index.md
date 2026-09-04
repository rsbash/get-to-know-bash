---
layout: default
title: Blog
permalink: /blog/
---
| | | | | |
| --- | --- | --- | --- | --- | 
| [Home]({{ '/' | relative_url }}) | **Blog** | [Resume]({{ '/resume-tw.html' | relative_url }}) | [References]({{ '/references.html' | relative_url }}) | [Work samples]({{ '/work_samples.html' | relative_url }}) |

[Back to home]({{ '/' | relative_url }})

Welcome to my collection of ponderous thoughts on technical writing.

## Posts

{% if site.posts.size == 0 %}
*No posts yet.*
{% else %}
{% for post in site.posts %}
1. [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% endif %}
