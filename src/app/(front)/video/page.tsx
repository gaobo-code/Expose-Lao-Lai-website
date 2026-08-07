import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "老赖王思宇的视频",
  description: "王思宇是一个沈阳软件行业中的老板，骗取项目定金，严重拖欠工资，他的公司包括辽宁志在远方网络科技，大连火石致远科技，沈阳衡源网络科技。",
  keywords: ["沈阳衡源网络科技", "辽宁志在远方网络科技", "大连火石致远科技", "王思宇", "甄世昊"],
  alternates: {
    canonical: "https://llwsydgs.cn/video"
  },
  openGraph: {
    url: "https://llwsydgs.com/video",
  }
};

const videos = [
  {
    key: "daren",
    title: "程序员索要工资，反被王思宇殴打！",
    desc: "辽宁志在远方网络科技的一名员工，比较勇敢，去向王思宇索要工资，反被王思宇殴打，嚣张至极！",
    poster: "/media/video1.webp",
    label: "员工讲述",
  },
  {
    key: "qianze",
    title: "与王思宇合作过的客户，谴责王思宇的行为！",
    desc: "与王思宇合作过的客户，被王思宇欺骗，两个项目干完后拿不到尾款，客户对他的评价，真是小刀拉屁股，开眼了！",
    poster: "/media/video2.webp",
    label: "客户讲述",
  }
];

export default function Video() {
  return (
    <div className="flex min-h-[calc(100svh-var(--spacing)*42)] w-full justify-center bg-thirdground b:min-h-[calc(100svh-var(--spacing)*33)]">
      <section className="flex h-full w-full flex-col items-center px-3 py-5 tracking-wider sm:px-5 sm:py-8 b:px-8 b:py-14 xl:w-320">
        <div className="grid w-full grid-cols-1 gap-y-5 sm:gap-y-6 b:grid-cols-2 b:gap-x-9 b:gap-y-8 b:px-5 xl:gap-x-11">
          {videos.map((video) => (
            <Link
              href={`/video/${video.key}`}
              key={video.key}
              className="group overflow-hidden rounded-lg border b:rounded-xl border-[#EEF1F4] bg-articlebackground shadow-[0_6px_16px_rgba(24,39,75,0.05),0_1px_4px_rgba(24,39,75,0.04)] outline-none transition-all duration-400 ease-out hover:-translate-y-1 hover:border-[#D9E7F2] hover:shadow-[0_10px_22px_rgba(24,39,75,0.08),0_3px_8px_rgba(24,39,75,0.05)] focus-visible:ring-2 focus-visible:ring-secondmaincolor focus-visible:ring-offset-2 focus-visible:ring-offset-thirdground active:scale-[0.99] dark:border-[#3F4754] dark:shadow-[0_6px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] dark:hover:border-[#566170] dark:hover:shadow-[0_10px_22px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <article>
                <div className="relative aspect-video w-full overflow-hidden bg-[#20252c]">
                  <Image
                    src={video.poster}
                    alt=""
                    fill
                    sizes="(min-width: 960px) 40vw, 100vw"
                    priority
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10" />
                  <span className="absolute left-3 top-3 rounded-full b:left-4 b:top-4 border border-white/25 bg-black/50 px-2.5 py-1 text-xs font-medium tracking-wider shadow-sm text-white backdrop-blur-sm">
                    {video.label}
                  </span>
                  <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 sm:size-12 b:size-14 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/90 text-[#26323c] shadow-lg transition-transform duration-300 group-hover:scale-110 dark:bg-white/85">
                    <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
                  </span>
                </div>

                <div className="flex min-h-44 flex-col p-4 sm:min-h-46 sm:p-5 b:min-h-50 b:px-6 b:py-5.5">
                  <h2 className="line-clamp-2 border-b border-b-[#E5E9EE] pb-2.5 text-xl font-semibold leading-[1.45] b:pb-3 b:leading-[1.4] transition-colors duration-400 group-hover:text-secondmaincolor dark:border-b-[#454d59] dark:group-hover:text-maincolor b:text-[22px]">
                    {video.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 text-base leading-[1.7] b:mt-3 b:leading-[1.65] text-foreground/90 b:text-[17px]">
                    {video.desc}
                  </p>
                  <span className="mt-auto flex items-center justify-end gap-2 pt-4 text-sm b:pt-5 b:text-[15px] font-medium text-secondmaincolor dark:text-maincolor">
                    观看视频
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
