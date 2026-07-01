import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";

export const metadata: Metadata = {
  title: "骗子偶寄和其小号",
  description: "本文是群友整理出来的，曝光了王思宇及其团队在QQ群骗人的过程。",
  keywords: [
    "老赖",
    "王思宇",
    "软件开发",
    "沈阳衡源网络科技",
    "拖欠工资",
    "骗子公司",
  ],
  openGraph: {
    title: "骗子偶寄和其小号",
    description: "本文是群友整理出来的，曝光了王思宇及其团队在QQ群骗人的过程。",
    url: "https://llwsydgs.cn/article/ouji",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    type: "website",
    images: [
      {
        url: "https://llwsydgs.cn/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "老赖王思宇年轻时的照片",
      },
    ],
  },
};

export default function OujiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleLayoutShell>{children}</ArticleLayoutShell>;
}
