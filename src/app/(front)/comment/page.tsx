import Image from "next/image";
import { Inbox, MessageCircle, Quote, ShieldCheck, Sparkles } from "lucide-react";
import clsx from "clsx";
import { commentData } from "@/lib/data"

function getImageUrl(id: number) {
  return `/avatar${(id % 14 + 1)}.webp`;
}

export default async function Comment() {

  return (
    <div className="w-full min-h-[calc(100svh-var(--spacing)*14)] b:min-h-[calc(100svh-var(--spacing)*33)] bg-[linear-gradient(180deg,var(--thirdbackground)_0%,var(--secondbackground)_48%,var(--background)_100%)] px-3 py-4 sm:px-6 b:py-5 dark:bg-[linear-gradient(180deg,#20242c_0%,#1d2026_48%,#23272f_100%)]">
      <article className="mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-none border-0 bg-articlebackground shadow-none min-h-[calc(100svh-var(--spacing)*22)] b:min-h-[calc(100svh-var(--spacing)*43)] b:rounded-lg b:border b:border-[#F1F3F5] b:shadow-[0_18px_46px_rgba(24,39,75,0.08),0_5px_14px_rgba(24,39,75,0.05)] dark:b:border-[#424A58] dark:b:shadow-[0_18px_46px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.035)] tracking-wide">
        <header className="relative isolate overflow-hidden border-b border-[#E6EBF0] bg-[linear-gradient(135deg,rgba(47,151,216,0.12),rgba(221,121,28,0.09)_48%,rgba(44,194,68,0.1))] px-5 py-7 sm:px-8 b:px-10 dark:border-[#424A58] dark:bg-[linear-gradient(135deg,rgba(108,180,206,0.13),rgba(185,141,22,0.12)_48%,rgba(216,79,120,0.12))]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--maincolor),var(--text1),var(--text3),var(--text4))]" />
          <div className="flex flex-col gap-5 b:flex-row b:items-end b:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/68 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--secondmaincolor)] shadow-[0_8px_22px_rgba(24,39,75,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/7 dark:text-[#f2a39d] dark:shadow-[0_8px_22px_rgba(0,0,0,0.22)]">
                <Sparkles size={14} strokeWidth={2} />
                精彩留言
              </div>
              <h1 className={clsx("text-[28px] leading-tight text-[var(--hometitlecolor)] sm:text-[34px]")}>
                网友评论墙
              </h1>
              <p className={clsx("mt-3 max-w-xl text-[15px] leading-[1.625rem] b:leading-7 text-[var(--subtitlecolor)] sm:text-base")}>
                以下评论来自网友的精彩留言，每一条声音都被认真收录。
              </p>
            </div>
            <div className='hidden b:block'>
              <div className="grid w-full max-w-xs grid-cols-2 gap-3 b:w-64">
                <div className="rounded-md border border-white/75 bg-white/70 px-4 py-3 shadow-[0_10px_24px_rgba(24,39,75,0.07)] backdrop-blur dark:border-white/10 dark:bg-white/7 dark:shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-[#B7C0CC]">
                    <MessageCircle size={15} />
                    留言数量
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[var(--hometitlecolor)]">{commentData.length}</div>
                </div>
                <div className="rounded-md border border-white/75 bg-white/70 px-4 py-3 shadow-[0_10px_24px_rgba(24,39,75,0.07)] backdrop-blur dark:border-white/10 dark:bg-white/7 dark:shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-[#B7C0CC]">
                    <ShieldCheck size={15} />
                    展示状态
                  </div>
                  <div className="mt-2 text-sm font-bold leading-8 text-[var(--hometitlecolor)]">
                    {commentData.length > 0 ? "已收录" : "待更新"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col px-0 py-5 sm:px-5 b:px-10 b:py-8">
          {commentData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-dashed border-[#C9D5E0] bg-[linear-gradient(180deg,rgba(47,151,216,0.07),rgba(255,255,255,0.36))] px-6 py-16 text-center dark:border-[#555F70] dark:bg-[linear-gradient(180deg,rgba(201,42,29,0.1),rgba(48,54,65,0.72))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className={clsx("mt-5 text-xl text-[var(--hometitlecolor)]")}>暂无内容</p>
              <p className={clsx("mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-[#B7C0CC]")}>
                评论区还在等待第一条精彩留言。
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {commentData.map((item, index) => (
                <section
                  key={index}
                  className={clsx(
                    "group relative overflow-hidden rounded-lg border border-[#E6EBF0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-4 shadow-[0_10px_28px_rgba(24,39,75,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[#B9DDF4] hover:shadow-[0_16px_36px_rgba(24,39,75,0.1)] sm:p-5 dark:border-[#424A58] dark:bg-[linear-gradient(180deg,rgba(60,67,80,0.96),rgba(48,54,65,0.92))] dark:shadow-[0_12px_30px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.03)] dark:hover:border-[#676F7D] dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
                  )}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,var(--maincolor),var(--text1),var(--text3))] opacity-70 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative shrink-0">
                        <Image
                          src={getImageUrl(index)}
                          alt="用户头像"
                          width={44}
                          height={44}
                          className="rounded-full border-2 border-white shadow-[0_8px_18px_rgba(24,39,75,0.12)] dark:border-[#596272] dark:shadow-[0_8px_18px_rgba(0,0,0,0.28)]"
                          preload={true}
                          loading="eager"
                          fetchPriority="high"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-text3 dark:border-[#303641]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[var(--hometitlecolor)]">网友</div>
                        <div className="b:mt-0.5 text-xs font-normal text-gray-500 dark:text-[#B7C0CC]">真诚留言</div>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full border border-[#D8E8F4] bg-[#F2F8FC] px-3 py-1 text-xs font-bold text-[var(--secondmaincolor)] dark:border-[#5B6472] dark:bg-[#3A414D] dark:text-[#f2a39d]">
                      第 {index + 1} 楼
                    </div>
                  </div>

                  <div className={clsx("justify-cjk mt-4 pl-2 text-[16px] leading-[1.625rem] b:leading-7 text-[#4c4d4d] sm:pl-14 sm:text-[17px] dark:text-[#DDE3EA]")}>
                    {item.content}
                  </div>

                  {item.reply && (
                    <div className="mt-4 rounded-md border border-[#E5E9EE] bg-white/74 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] sm:ml-14 sm:p-4 dark:border-[#4B5361] dark:bg-[#343B47]/72 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-[#B7C0CC]">
                        <Quote size={15} className="text-maincolor" />
                        站长回复
                      </div>
                      <div className={clsx("justify-cjk text-[15px] leading-[1.625rem] b:leading-7 text-[#4c4d4d] dark:text-[#DDE3EA]")}>
                        {item.reply}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
