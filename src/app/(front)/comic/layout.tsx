import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "幽默现实漫画",
  description: "老赖王思宇，轻松一刻，在笑声中看清套路。",
  keywords: [
    "老赖王思宇",
    "现实漫画",
    "职场套路",
    "软件行业故事",
    "拖欠工资",
    "互联网经历",
    "程序员漫画",
    "沈阳衡源网络科技"
  ],
  openGraph: {
    title: "幽默现实漫画",
    description: "老赖王思宇，轻松一刻，在笑声中看清套路。",
    url: "https://llwsydgs.cn",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    type: "website",
    images: [
      {
        url: "https://llwsydgs.cn/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "老赖王思宇年轻时的照片"
      }
    ]
  }
};

export default function ComicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen bg-thirdbackground">
      {children}
    </div>
  );
}
