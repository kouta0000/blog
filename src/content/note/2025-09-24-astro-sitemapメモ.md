---
title: astro-sitemapメモ
description: astro sitemap
publishDate: 2025-09-24T13:55:00
---
astro-config.tsのintegrationsにsiteとsitemap()を追加

`export default defineConfig（`

`&#32;&#32;&#32;&#32;&#32;site:"URL"  /*ここを忘れない*/`

`&#32;&#32;&#32;&#32;&#32;integrations:[`

`&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;...otherplugins`

`&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;sitemap(),`

`&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;...otherplugins,`

`&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;]）`
