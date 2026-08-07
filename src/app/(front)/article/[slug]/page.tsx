import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";

import ArticleJsonLd from "@/components/article-json-ld";


export default async function Article(props: Params) {
  const params = await props.params;

  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        image={post.image}
        datePublished={post.publishedAt}
        dateModified={post.modifiedAt}
        description={post.excerpt}
        path={`https://llwsydgs.com/article/${params.slug}`}
      />
      <article>
        <PostHeader title={post.title} />
        <PostBody content={content} />
      </article>
    </>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;
  const excerpt = `${post.excerpt}`;
  const image = post.image ?? "https://llwsydgs.com/opengraph-image.png";
  const author = "高勃";
  const keywords = `${post.keywords}`;

  return {
    title: title,
    description: excerpt,
    keywords: keywords,
    authors: [{ name: author }],
    alternates: {
      canonical: `https://llwsydgs.cn/article/${params.slug}`
    },
    openGraph: {
      title: title,
      description: excerpt,
      url: `https://llwsydgs.com/article/${params.slug}`,
      siteName: "老赖王思宇的故事",
      locale: "zh-CN",
      type: "article",
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.modifiedAt ? { modifiedTime: post.modifiedAt } : {}),
      authors: [author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "老赖王思宇年轻时的照片",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: excerpt,
      images: [image],
    }
  };
}


export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
