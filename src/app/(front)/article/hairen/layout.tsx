import type { Metadata } from "next";
import ArticleLayoutShell from "../article-layout-shell";

export const metadata: Metadata = {
  title: "QQ群的骇人言论",
  description: "有人在QQ群中说，曾经去缅北参加了培训，新学了一招，叫水牢，就是把人困在水里，然后放电，全方位的电。",
  keywords: [
    "缅北",
    "水牢",
    "缅甸",
    "妙瓦底",
    "柬埔寨",
    "电诈",
    "电信诈骗"
  ],
  openGraph: {
    title: "QQ群的骇人言论",
    description: "有人在QQ群中说，曾经去缅北参加了培训，新学了一招，叫水牢，就是把人困在水里，然后放电，全方位的电。",
    url: "https://llwsydgs.com/article/hairen",
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

export default function HairenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleLayoutShell>{children}</ArticleLayoutShell>;
}
