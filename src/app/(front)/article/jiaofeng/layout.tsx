import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";
import ArticleJsonLd from "@/components/article-json-ld";

export const metadata: Metadata = {
  title: "与黑客的第二次交锋",
  description: "在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。",
  authors: [{ name: "高勃" }],
  keywords: [
    "黑客",
    "攻击服务器",
    "网站",
    "王思宇",
    "电诈",
    "电信诈骗"
  ],
  alternates: {
    canonical: "https://llwsydgs.com/article/jiaofeng"
  },
  openGraph: {
    title: "与黑客的第二次交锋",
    description: "在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。",
    url: "https://llwsydgs.com/article/jiaofeng",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    publishedTime: "2026-05-10",
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
    title: "与黑客的第二次交锋",
    description: "在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。",
    images: ["https://llwsydgs.com/opengraph-image.png"],
  }
};

export default function JiaofengLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <ArticleJsonLd
      title={metadata.title as string}
      description={metadata.description as string}
      authorName="高勃"
      datePublished="2026-05-10"
      dateModified="2026-07-08"
      path="https://llwsydgs.com/article/jiaofeng"
    />
    <ArticleLayoutShell>{children}</ArticleLayoutShell>
  </>;
}
