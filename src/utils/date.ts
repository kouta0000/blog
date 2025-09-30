import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}
	const today = new Date();
	const jstDate = new Date(today.getTime() + 9 * 60 * 60 * 1000);

	if(date.getFullYear() === jstDate.getFullYear() && date.getMonth() === jstDate.getMonth() && (jstDate.getDate() - date.getDate()) <= 7) {
		const days = jstDate.getDate() - date.getDate();
		return days === 0 ? '今日': days.toString() + '日前';
	}
	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	return (b.data.publishDate.getTime()) - a.data.publishDate.getTime();
}
