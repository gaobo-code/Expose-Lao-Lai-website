import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";

// Manually restrict article URL
const slugCheck = ["0", "1", "2", "3", "4", "5"];

export default async function Article(props: Params) {
  const params = await props.params;
  if (!slugCheck.includes(params.slug)) {
    return notFound();
  }

  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <PostHeader title={post.title} />
      <PostBody content={content} />
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
  const keywords = `${post.keywords}`;

  return {
    title: title,
    description: excerpt,
    keywords: keywords,
    openGraph: {
      title: title,
      description: excerpt,
      url: `https://llwsydgs.com/article/${params.slug}`,
      siteName: "老赖王思宇的故事",
      locale: "zh-CN",
      type: "website",
      images: [
        {
          url: "https://llwsydgs.com/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "老赖王思宇年轻时的照片",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
