import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import ArticleWrapper from "./article-wrapper";
import DesktopButtonArea from "./desktop-button-area";
import DesktopGroupArea from "./desktop-group-area";
import MobileButtonArea from "./mobile-button-area";
import MobileGroupArea from "./mobile-group-area";

type Props = {
  children: React.ReactNode;
};

export default function ArticleLayoutShell({ children }: Props) {
  return (
    <div className="relative isolate w-full min-h-[calc(100svh-var(--spacing)*14)] b:min-h-[calc(100svh-var(--spacing)*33)] flex flex-col items-center overflow-hidden bg-thirdbackground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-72 w-[min(72rem,94vw)] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--maincolor)_24%,transparent),color-mix(in_srgb,var(--maincolor)_9%,transparent)_42%,transparent_72%)]" />
        <div className="absolute -left-20 top-28 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(circle,color-mix(in_srgb,var(--text1)_18%,transparent),transparent_68%)]" />
        <div className="absolute -right-24 top-96 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle,color-mix(in_srgb,var(--text3)_14%,transparent),transparent_70%)]" />
      </div>

      <article className="relative z-10 w-full xl:w-320 flex-1 flex flex-col items-center leading-normal b:leading-[1.55] px-4 sm:px-8 b:px-12 box-border bg-articlebackground mb-3 b:mt-5 b:mb-5 b:rounded-[32px] b:overflow-hidden b:shadow-[0_12px_30px_rgba(24,39,75,0.06),0_3px_8px_rgba(24,39,75,0.04)] dark:b:shadow-[0_12px_30px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.035)] b:border b:border-[#F1F3F5] dark:b:border-[#424A58]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--maincolor)_10%,transparent),transparent)]" />
        <div className="relative z-10 w-full">
          <ArticleWrapper>{children}</ArticleWrapper>
        </div>
      </article>

      <div className="relative z-10 hidden b:block">
        <Suspense fallback={<div className="w-full xl:w-320 h-24"></div>}>
          <DesktopGroupArea></DesktopGroupArea>
        </Suspense>
      </div>

      <div className="relative z-10 block b:hidden">
        <Suspense fallback={<div className="w-full xl:w-320 h-45"></div>}>
          <MobileGroupArea></MobileGroupArea>
        </Suspense>
      </div>

      <section className="relative z-10 w-full xl:w-320 h-13 b:h-14 flex items-center justify-around bg-articlebackground mb-3 b:mb-5 b:rounded-[28px] b:shadow-[0_7px_18px_rgba(24,39,75,0.05),0_2px_6px_rgba(24,39,75,0.035)] dark:b:shadow-[0_7px_18px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)] b:border b:border-[#F1F3F5] dark:b:border-[#424A58]">
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
