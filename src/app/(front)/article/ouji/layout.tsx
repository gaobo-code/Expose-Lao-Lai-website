import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";
import ArticleJsonLd from "@/components/article-json-ld";

export const metadata: Metadata = {
  title: "骗子偶寄和其小号",
  description: "曝光了王思宇及其团队，在QQ群表演杀猪盘骗人的过程。",
  authors: [{ name: "高勃" }],
  keywords: [
    "老赖",
    "王思宇",
    "软件开发",
    "杀猪盘",
    "拖欠工资",
    "骗子公司",
  ],
  alternates: {
    canonical: "https://llwsydgs.com/article/ouji"
  },
  openGraph: {
    title: "骗子偶寄和其小号",
    description: "曝光了王思宇及其团队，在QQ群表演杀猪盘骗人的过程。",
    url: "https://llwsydgs.com/article/ouji",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    publishedTime: "2026-01-17",
    modifiedTime: "2026-07-08",
    authors: ["高勃"],
    type: "article",
    images: [
      {
        url: "https://llwsydgs.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "老赖王思宇年轻时的照片",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "骗子偶寄和其小号",
    description: "曝光了王思宇及其团队，在QQ群表演杀猪盘骗人的过程。",
    images: ["https://llwsydgs.com/opengraph-image.png"],
  }
};

export default function OujiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <ArticleJsonLd
      title={metadata.title as string}
      description={metadata.description as string}
      authorName="高勃"
      datePublished="2026-01-17"
      dateModified="2026-07-08"
      path="https://llwsydgs.com/article/ouji"
    />
    <ArticleLayoutShell>{children}</ArticleLayoutShell>
  </>;
}
