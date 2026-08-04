import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "程序员索要工资，反被王思宇殴打！",
  description: "辽宁志在远方网络科技的一名员工，比较勇敢，去向王思宇索要工资，反被王思宇殴打，嚣张至极！",
  keywords: ["沈阳衡源网络科技", "辽宁志在远方网络科技", "大连火石致远科技", "王思宇", "甄世昊"],
  alternates: {
    canonical: "https://llwsydgs.com/video/daren"
  },
  openGraph: {
    url: "https://llwsydgs.com/video/daren",
  }
};

export default function Video() {
  return (
    <div className="relative z-0 w-screen bg-thirdbackground flex flex-col items-center">
      <Link
              href="/video"
              aria-label="返回视频列表"
              className="absolute left-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-lg border border-[#DDE3E9] bg-articlebackground/90 text-foreground shadow-[0_2px_8px_rgba(24,39,75,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#C5D4DF] hover:bg-articlebackground hover:text-secondmaincolor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondmaincolor b:left-[calc(50%-250px)] b:h-10 b:w-auto b:gap-2 b:px-4 xl:left-[calc(50%-40rem+1rem)] dark:border-[#444D59] dark:bg-articlebackground/90 dark:shadow-[0_2px_8px_rgba(0,0,0,0.20)] dark:hover:border-[#606B79] dark:hover:bg-articlebackground dark:hover:text-maincolor"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              <span className="hidden b:inline">返回</span>
            </Link>
      <section className="w-full xl:w-320 flex flex-col items-center py-4 px-4 box-border tracking-widest h-[calc(100svh-var(--spacing)*14)] b:h-[calc(100svh-var(--spacing)*17)] xl:h-[calc(100svh-var(--spacing)*33)] overflow-hidden">
        <div className="w-full h-full flex flex-row justify-around items-center">
          <video
            className="rounded-xl xl:shadow-lg max-h-full w-[500px] h-[882px]"
            width={500}
            height={882}
            // src="/media/mata.mp4"
            poster="/media/video1-placeholder.webp"
            controls
            autoPlay
            muted
            loop
            playsInline

          >
            <source src="/media/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="text-[0] leading-[2.7] pl-12 box-border line-clamp-15 hidden xl:block justify-cjk">
            <span className="text-2xl">
              这是辽宁志在远方网络科技的其中一名同事，比较勇敢，去向王思宇索要工资，结果被打了！我并不认识这名同事，我是在快手上看到的。
            </span>
            <span className="text-2xl">
              王思宇欠人家至少两个月工资不给，人家去索要，合情合理。王思宇态度强硬，不但不支付工资，还动手打人，嚣张至极！
            </span>
            <span className="text-2xl">
              一个正常的老板，没有为员工发放工资，心里应该感到愧疚，我觉得，每个老板应该知道什么是廉耻！
            </span>
            <span className="text-2xl">
              王思宇仗着自己体格好，就可以殴打程序员。此外，王思宇还专门养了一个打手，名字叫刘圣慈，是远方集团的副总，他俩一起嫖娼，一起霸凌程序员。
            </span>
            <span className="text-2xl">
              王思宇这个人，其实就是一个恶棍，他从来就没有把其他人当人看。这样的人，哪有什么资格在沈阳开办公司，还屡次借用他人的名义。
            </span>
            <span className="text-2xl">
              王思宇还通过李德强知道了我家的住址，李德强是原辽宁志在远方网络科技的产品部部长，与我家是临近的小区。
            </span>
            <span className="text-2xl">
              那既然知道了我家的住址，那就过来吧，然后再把我也揍一顿。我高勃不服你，也不怕你，誓与你斗争到底！
            </span>
            <span className="text-2xl">
              请大家多多转发，不要让这样的恶棍，再来嚯嚯沈阳人民，这样的人，他的最终归宿就是监狱！
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
