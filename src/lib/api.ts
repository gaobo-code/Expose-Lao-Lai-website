import { Post } from "@/lib/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (parseInt(post1.slug) > parseInt(post2.slug) ? 1 : -1));
  return posts;
}

export function getPostTitleMap() {
  const posts = getAllPosts();
  const titleMap = new Map<string, string>();
  posts.forEach((post) => {
    titleMap.set(post.slug, post.title);
  });

  return titleMap;
}
