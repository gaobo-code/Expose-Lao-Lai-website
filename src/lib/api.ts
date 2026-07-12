import { Post } from "@/lib/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const slugOrder = ["chuzhong", "hengyuan", "laolai", "ma", "fuchong", "jiangxue"];

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
    .sort((post1, post2) => {
      const post1Order = slugOrder.indexOf(post1.slug);
      const post2Order = slugOrder.indexOf(post2.slug);

      return (
        (post1Order === -1 ? Number.MAX_SAFE_INTEGER : post1Order) -
        (post2Order === -1 ? Number.MAX_SAFE_INTEGER : post2Order)
      );
    });
  return posts;
}
