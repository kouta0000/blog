import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Kota Koizumi",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "ja",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "kota's personal blog",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "ja",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "ja",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "陋庵独語",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "ホーム",
	},
	{
		path: "/posts/about",
		title: "サイトについて",
	},
	{
		path: "/posts/",
		title: "記事",
	},
	{
		path: "/notes/",
		title: "メモ",
	},
	{
		path: "/contact",
		title: "お問い合わせ"
	}
];