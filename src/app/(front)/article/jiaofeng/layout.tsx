import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";

export const metadata: Metadata = {
  title: "与黑客的第二次交锋",
  description: "在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。",
  keywords: [
    "黑客",
    "攻击服务器",
    "网站",
    "王思宇",
    "电诈",
    "电信诈骗"
  ],
  openGraph: {
    title: "与黑客的第二次交锋",
    description: "在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。",
    url: "https://llwsydgs.cn/article/jiaofeng",
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

export default function JiaofengLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleLayoutShell>{children}</ArticleLayoutShell>;
}
