"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUp, ChevronLeft, ChevronRight, Link2 } from "lucide-react";
import { copyLinkFun } from "@/lib/utils";

type Props = {
  archiveHref: string;
  previousHref?: string;
  nextHref?: string;
  type?: 1 | 2;
};

export function ArticleActions({ archiveHref, previousHref, nextHref, type = 1 }: Props) {
  const isCompany = type === 1;
  const accent = isCompany
    ? "border-red-500/20 bg-red-500/[0.08] text-red-300 hover:border-red-400/40 hover:bg-red-500/15"
    : "border-purple-400/20 bg-purple-500/[0.08] text-purple-300 hover:border-purple-300/40 hover:bg-purple-500/15";
  const base = "group flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center transition duration-300 hover:-translate-y-0.5 sm:min-h-18";
  const iconClass = "h-5 w-5 transition-transform group-hover:scale-110";
  const labelClass = "text-[10px] tracking-[0.08em] sm:text-xs";

  const scrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const scrollContainer = event.currentTarget.closest<HTMLElement>(
      "[data-content-scroll-container]",
    );

    scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="mx-auto mt-5 w-full max-w-[1280px] rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[0_20px_60px_rgba(0,0,0,.2)] backdrop-blur-md sm:mt-8 sm:p-4" aria-label="文章操作">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        <button type="button" onClick={copyLinkFun} className={`${base} ${accent}`} title="复制页面链接">
          <Link2 className={iconClass} aria-hidden="true" />
          <span className={labelClass}>
            <span className="sm:hidden">链接</span>
            <span className="hidden sm:block">复制链接</span>
          </span>
        </button>

        <Link href={archiveHref} className={`${base} ${accent}`} title="返回专题页面">
          <ArrowLeft className={`${iconClass} group-hover:-translate-x-0.5`} aria-hidden="true" />
          <span className={labelClass}>
            <span className="sm:hidden">专题</span>
            <span className="hidden sm:block">返回专题</span>
          </span>
        </Link>

        <button type="button" onClick={scrollToTop} className={`${base} ${accent}`} title="返回页面顶部">
          <ArrowUp className={`${iconClass} group-hover:-translate-y-0.5`} aria-hidden="true" />
          <span className={labelClass}>
            <span className="sm:hidden">顶部</span>
            <span className="hidden sm:block">返回顶部</span>
          </span>
        </button>

        {previousHref ? (
          <Link href={previousHref} className={`${base} ${accent}`} title="上一篇文章">
            <ChevronLeft className={`${iconClass} group-hover:-translate-x-0.5`} aria-hidden="true" />
            <span className={labelClass}>上一篇</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${base} cursor-not-allowed border-white/[0.06] bg-white/[0.025] text-white/20`}>
            <ChevronLeft className={iconClass} aria-hidden="true" />
            <span className={labelClass}>上一篇</span>
          </span>
        )}

        {nextHref ? (
          <Link href={nextHref} className={`${base} ${accent}`} title="下一篇文章">
            <ChevronRight className={`${iconClass} group-hover:translate-x-0.5`} aria-hidden="true" />
            <span className={labelClass}>下一篇</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${base} cursor-not-allowed border-white/[0.06] bg-white/[0.025] text-white/20`}>
            <ChevronRight className={iconClass} aria-hidden="true" />
            <span className={labelClass}>下一篇</span>
          </span>
        )}
      </div>
    </nav>
  );
}
