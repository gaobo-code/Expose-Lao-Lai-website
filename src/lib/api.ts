import { Post } from "@/lib/post";
import { Company } from "@/lib/company";
import { Relative } from "@/lib/relative";
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
  if (!/^[a-z0-9-]+$/.test(realSlug)) {
    return null;
  }

  const fullPath = join(postsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");


  const { data, content } = matter(fileContents);
  
  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
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


const companiesDirectory = join(process.cwd(), "_companies");

export function getCompanySlugs() {
  return fs.readdirSync(companiesDirectory);
}

export function getCompanyBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  if (!/^[0-9]+$/.test(realSlug)) {
    return null;
  }

  const fullPath = join(companiesDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return { ...data, slug: realSlug, content } as Company;
}

export function getAllCompanies(): Company[] {
  const slugs = getCompanySlugs();
  const companies = slugs
    .map((slug) => getCompanyBySlug(slug))
    .filter((company): company is Company => company !== null)
    .sort((company1, company2) => (parseInt(company1.slug) < parseInt(company2.slug) ? 1 : -1));
  return companies;
}

const relativesDirectory = join(process.cwd(), "_relatives");

export function getRelativeSlugs() {
  return fs.readdirSync(relativesDirectory);
}

export function getRelativeBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  if (!/^[0-9]+$/.test(realSlug)) {
    return null;
  }

  const fullPath = join(relativesDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return { ...data, slug: realSlug, content } as Relative;
}

export function getAllRelatives(): Relative[] {
  const slugs = getRelativeSlugs();
  const relatives = slugs
    .map((slug) => getRelativeBySlug(slug))
    .filter((relative): relative is Relative => relative !== null)
    .sort((relative1, relative2) => (parseInt(relative1.slug) < parseInt(relative2.slug) ? 1 : -1));
  return relatives;
}