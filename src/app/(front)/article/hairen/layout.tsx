import { LightBulbIcon } from "@heroicons/react/24/outline";
import DesktopButtonArea from "../desktop-button-area";
import MobileButtonArea from "../mobile-button-area";
import type { Metadata } from "next";
import ArticleWrapper from "../article-wrapper";

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

export default function HeikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[calc(100svh-var(--spacing)*42)] b:min-h-[calc(100svh-var(--spacing)*33)] flex flex-col items-center bg-thirdbackground">
      <article className="w-full xl:w-320 min-h-[calc(100svh-var(--spacing)*61)] b:min-h-[calc(100svh-var(--spacing)*62)] flex flex-col items-center leading-[1.6] text-textcolor px-4 sm:px-8 b:px-12 box-border bg-artilebackground mb-3 b:mt-5 b:mb-5 b:rounded-lg b:shadow-article b:border b:border-[#F1F3F5] dark:b:border-[#424A58]">
        <ArticleWrapper>{children}</ArticleWrapper>
      </article>

      <section className="w-full xl:w-320 h-13 b:h-14 flex items-center justify-around bg-artilebackground mb-3 b:mb-5 b:rounded-lg b:shadow-article b:border b:border-[#F1F3F5] dark:b:border-[#424A58]">
        <div className="hidden md:block">
          <div className="flex items-center">
            <LightBulbIcon className="size-6 mr-2" />
            <span className="text-[17px] tracking-[0.15em]">认真阅读文件，谨防上当受骗。</span>
          </div>
        </div>
        <div className="hidden b:block">
          <div className="w-32 md:w-26">
            <DesktopButtonArea></DesktopButtonArea>
          </div>
        </div>
        <div className="block b:hidden">
          <div className="w-32 md:w-26">
            <MobileButtonArea></MobileButtonArea>
          </div>
        </div>
      </section>
    </div>
  );
}
