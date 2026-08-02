import type { Metadata } from "next";
import { ArrowLeft, Map, Radar, ShieldAlert, UsersRound } from "lucide-react";
import Link from "next/link";

import { getAllRelatives } from "@/lib/api";

export default function RelativePage() {
  const relatives = getAllRelatives();

  return (
    <section className="relative min-h-[calc(100svh-var(--spacing)*14)] w-full overflow-hidden bg-[#09050f] text-white b:min-h-[calc(100svh-var(--spacing)*17)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -20%, rgba(192,132,252,.45), transparent 38%), radial-gradient(ellipse at -8% 48%, rgba(126,34,206,.32), transparent 34%), radial-gradient(ellipse at 108% 78%, rgba(217,70,239,.26), transparent 35%), linear-gradient(160deg,#160823 0%,#09050f 46%,#13071d 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] top-[13%] h-80 w-[130%] -rotate-6 rounded-[50%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent,rgba(139,92,246,.18),rgba(217,70,239,.08),transparent_62%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(216,180,254,.18) 1px, transparent 1px), linear-gradient(-45deg, rgba(216,180,254,.18) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, black, transparent 82%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[-10%] top-[38%] h-32 rotate-3 bg-gradient-to-r from-transparent via-violet-500/[0.17] to-transparent blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-200/60 to-transparent shadow-[0_0_35px_8px_rgba(168,85,247,.28)]" />
      <div className="relative mx-auto w-full max-w-280 px-4 py-8 sm:px-6 md:px-8 md:py-12 b:px-10 b:py-16">
        <header className="relative mb-6 pr-24 md:mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[9px] font-semibold tracking-[0.18em] text-purple-300 sm:gap-2.5 md:text-[11px] md:tracking-[0.2em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-[#170d20]/75 px-3 py-1.5 shadow-[0_0_24px_rgba(126,34,206,.12)] backdrop-blur-sm">
              <Map size={13} aria-hidden="true" /> RISK ARCHIVE
            </span>
            <span className="hidden sm:block text-white/30 text-[14px] relative -top-0.5">/</span>
            <span className="hidden sm:block text-white/50">RELATIVE SCAMS</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-white/50 md:text-sm md:tracking-[0.14em]">
            <ShieldAlert size={15} className="text-fuchsia-400" aria-hidden="true" />
            亲属骗局 · 防范指南
          </div>
        </header>

        <Link
          href="/all"
          aria-label="返回上一级"
          className="group absolute right-4 top-8 inline-flex h-7 items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#170d20]/70 px-2.5 text-[10px] font-semibold tracking-[0.12em] text-purple-200/60 backdrop-blur-sm transition duration-300 hover:border-purple-300/50 hover:bg-purple-500/12 hover:text-purple-100 hover:shadow-[0_0_18px_rgba(168,85,247,.12)] sm:right-6 md:right-8 md:top-12 b:right-10 b:top-16"
        >
          <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          返回
        </Link>

        <ol className="grid grid-cols-1 gap-3 md:gap-4">
          {relatives.map((relative, index) => {
            const caseNumber = String(index + 1).padStart(2, "0");

            return (
              <Link href={`/all/relative/${relative.slug}`} key={relative.slug}>
                <li key={relative.slug} className="w-full h-full group relative min-h-24 overflow-hidden rounded-2xl border border-purple-200/10 bg-[#100b17]/88 shadow-[0_14px_38px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple-400/45 hover:shadow-[0_20px_52px_rgba(88,28,135,.22),inset_0_1px_0_rgba(255,255,255,.07)] sm:min-h-27 md:min-h-32">
                  <div className="relative z-10 flex min-h-[inherit]">
                    <div className="flex min-w-0 flex-1 flex-col justify-between px-5 py-4 pr-3 sm:px-6 sm:py-5 md:px-8 md:py-6">
                      <h2 className="max-w-[92%] text-base font-semibold leading-6 tracking-[0.01em] text-white/88 transition group-hover:text-white sm:text-[17px] sm:leading-7 md:text-lg md:leading-8">{relative.title}</h2>
                      <div className="mt-3 flex items-center gap-2 text-[8px] tracking-[0.13em] text-white/32 transition group-hover:text-purple-300/65 sm:text-[9px] md:mt-4 md:text-[10px]">
                        <UsersRound size={12} aria-hidden="true" />
                        GUIDELINE NO. {index + 1}
                      </div>
                    </div>

                    <div className="relative flex w-19 shrink-0 items-center justify-center overflow-hidden border-l border-purple-300/10 bg-[linear-gradient(145deg,rgba(126,34,206,.23),rgba(217,70,239,.08))] sm:w-24 md:w-31">
                      <div aria-hidden="true" className="absolute -left-7 top-0 h-full w-12 -skew-x-12 bg-[#100b17]" />
                      <div aria-hidden="true" className="absolute h-20 w-20 rounded-full border border-purple-300/10 transition duration-500 group-hover:scale-125 group-hover:border-fuchsia-300/25 md:h-28 md:w-28">
                        <span className="absolute inset-3 rounded-full border border-dashed border-purple-300/10" />
                      </div>
                      <div className="relative text-center">
                        <Radar size={15} className="mx-auto mb-1.5 text-purple-300/45 transition group-hover:text-fuchsia-300" aria-hidden="true" />
                        <span className="font-mono text-xl font-black tracking-[-0.05em] text-purple-200/85 md:text-3xl">{caseNumber}</span>
                      </div>
                    </div>
                  </div>

                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-purple-500/0 to-transparent transition duration-300 group-hover:via-purple-400/80" />
                  <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 group-hover:w-2/3" />
                </li>
              </Link>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
