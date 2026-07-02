import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";

export const metadata: Metadata = {
  title: "王思宇派黑客奇袭我网站服务器全程",
  description: "在2025年12月初，王思宇竟然派黑客奇袭了我这个小网站，这是出乎意料的，可见王思宇的重视程度。",
  keywords: [
    "黑客",
    "攻击服务器",
    "网站",
    "奇袭",
    "电诈",
    "电信诈骗"
  ],
  openGraph: {
    title: "王思宇派黑客奇袭我网站服务器全程",
    description: "在2025年12月初，王思宇竟然派黑客奇袭了我这个小网站，这是出乎意料的，可见王思宇的重视程度。",
    url: "https://llwsydgs.com/article/heike",
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

export default function HeikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleLayoutShell>{children}</ArticleLayoutShell>;
}
