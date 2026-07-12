import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "幽默现实漫画",
  description: "老赖王思宇，轻松一刻，在笑声中看清套路。",
  keywords: ["老赖", "王思宇", "沈阳", "软件开发", "沈阳衡源网络科技", "辽宁志在远方网络科技", "大连火石致远科技", "拖欠工资", "骗取项目定金"],
  alternates: {
    canonical: "https://llwsydgs.com/comic"
  },
  openGraph: {
    title: "幽默现实漫画",
    description: "老赖王思宇，轻松一刻，在笑声中看清套路。",
    url: "https://llwsydgs.com/comic",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    type: "website",
    images: [
      {
        url: "https://llwsydgs.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "老赖王思宇年轻时的照片"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "幽默现实漫画",
    description: "老赖王思宇，轻松一刻，在笑声中看清套路。",
    images: ["https://llwsydgs.com/opengraph-image.png"],
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
