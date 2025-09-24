---
title: astrojs/sitemapの設定に関する覚書
seriesId: プログラミング
tags:
  - プログラミング
  - astro
icon: program
publishDate: 2025-09-24T14:42:00
description: astro-sitemap導入の際に、つまずいたところのまとめ
draft: false
---
## インストール

### astro addの場合

- npmの場合

```bash
npx astro add sitemap
```

- pnpmの場合

```bash
pnpm astro add sitemap
```

### 通常インストールの場合（Manual Install）

```bash
pnpm add @astrojs/sitemap
```

```bash
npm install @astrojs/sitemap
```

:::tip npmとpnpmの違い
npmをあらゆる面で改善したのがpnpm。node-modulesの重複を無くしたり、読み込みやインストールを速くしたりといいことづくし。インストールしたデフォルトのnodeサーバーはnpmしか持っていないので、`npm install -g pnpm@latest-10`でインストールしましょう。
:::

## 導入してまずやること

astro addを使わなかった場合、astro.config.tsのintegrationsにsitemap()を追加。

astro-sitemapを使って、生成されたsitemap.xmlのリンクを、Google Search Consoleに送信しようとした。そしたら、そもそもsitemap.xmlが生成されていなかったことがわかった。問題は、`site:"URL"`のsiteに自分のデプロイ先のドメインを書いていなかったことだった。

つまりまず、astro-sitemapを導入したら、astro.config.tsのdefineConfig関数の設定を見る。そして、そこのsite変数にサイトのURLを書き、必要ならばintegrationsにsitemap()をいれなきゃいけない。インストール後に完了すべき設定は以下の通り。

```typescript
export default defineConfig({
     /*...他の設定*/
     site: "URL" /*デプロイ先のURL*/,
     integrations: [
          sitemap(),
          /*...他のプラグイン*/
     ],
     /*他の設定*/
});
```

## 生成されるのはsitemap.xmlじゃない

以上の設定をやって、https://your-domain/sitemap.xmlにアクセスしてもファイルが存在しない。通常は、ルートディレクトリにsitemap.xmlがあるはず。

問題は、ファイル名がsitemap.xmlじゃないことだった。astrojs/sitemapで生成されるのは、sitemap-index.xmlとsitemap-0.xmlの二つ。サイトが大きいと、sitemap-1.xml.....sitemap-n.xmlと言うふうにインデックスがついて複数作られる。

Google Search Consoleにサイトマップを送りたい場合は、基本的にsitemap-index.xmlを送ればよい。indexファイルにはすべてのsitemap-〇.xmlのリンクが書かれるから、クローラーがそれを認識し自動で走査を始める。そもそも、indexとその子ファイルという形式は、グーグルクローラーが推奨する形式らしい。

## まとめ

- astro.config.tsにsiteのURLを書くのを忘れない
- サイトマップのxmlのファイル名は、sitemap-index.xml

以上がつまった部分。
