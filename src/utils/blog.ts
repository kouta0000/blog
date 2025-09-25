import {type CollectionEntry, getCollection } from "astro:content";
export const shufflePosts = (posts: CollectionEntry<"post">[]) => {
    const shuffled = [...posts]; // 元の配列をコピー
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 要素を交換
    }
    return shuffled;
  };
  
export const getRelatedPosts = async(post:CollectionEntry<"post">, maxNumber:number) => {
    const result:CollectionEntry<"post">[] = [];
    const tags = post.data.tags;
    const allPosts = await getCollection("post");

  allPosts.forEach((p) => {
    if (p.id === post.id) return; // 自分自身は除外

    const isRelated = p.data.tags.some((tag) => tags.includes(tag));
    if (isRelated) result.push(p);
  });
    return result.length <= maxNumber ? shufflePosts(result): shufflePosts(result).slice(0,maxNumber);
}
