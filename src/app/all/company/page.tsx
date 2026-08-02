import type { Metadata } from "next";
import { AlertTriangle, ArrowLeft, Building2, Siren } from "lucide-react";
import Link from "next/link";

import { getAllCompanies } from "@/lib/api";

export default function CompanyPage() {
  const companies = getAllCompanies();

  return (
    <section className="relative min-h-[calc(100svh-var(--spacing)*14)] w-full overflow-hidden bg-[#080707] text-white b:min-h-[calc(100svh-var(--spacing)*17)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80" style={{ background: "radial-gradient(circle at 12% 3%, rgba(239,68,68,.24), transparent 28%), radial-gradient(circle at 95% 35%, rgba(185,28,28,.13), transparent 30%), linear-gradient(135deg, #0b0909 0%, #050505 58%, #100707 100%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.38]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.17) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.17) 1px, transparent 1px)", backgroundSize: "clamp(32px, 4vw, 44px) clamp(32px, 4vw, 44px)", maskImage: "linear-gradient(to bottom, black, transparent 80%)" }} />

      <div className="relative mx-auto w-full max-w-280 px-4 py-8 sm:px-6 md:px-8 md:py-12 b:px-10 b:py-16">
        <header className="relative mb-5 pr-24 md:mb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[9px] font-semibold tracking-[0.18em] text-red-400 sm:gap-2.5 md:text-[11px] md:tracking-[0.2em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 md:px-3"><Siren size={13} aria-hidden="true" />RISK ARCHIVE</span>
            <span className="hidden sm:block text-white/30 text-[14px] relative -top-0.5">/</span>
            <span className="hidden sm:block text-white/50">SCAM COMPANIES</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-white/50 md:text-sm md:tracking-[0.14em]"><AlertTriangle size={15} className="text-red-500" aria-hidden="true" />公司骗局 · 避坑档案</div>
        </header>

        <Link
          href="/all"
          aria-label="返回上一级"
          className="group absolute right-4 top-8 inline-flex h-7 items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/[0.06] px-2.5 text-[10px] font-semibold tracking-[0.12em] text-red-200/60 backdrop-blur-sm transition duration-300 hover:border-red-400/50 hover:bg-red-500/12 hover:text-red-100 sm:right-6 md:right-8 md:top-12 b:right-10 b:top-16"
        >
          <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          返回
        </Link>


        <ol className="grid grid-cols-1 gap-2.5 md:gap-3.5">
          {companies.map((company, index) => {
            const caseNumber = String(index + 1).padStart(2, "0");
            return (
              <Link href={`/all/company/${company.slug}`} key={company.slug}>
                <li key={company.slug} className="w-full h-full group relative min-h-22 overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-4 sm:min-h-24 sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-500/[0.07] md:min-h-30 md:p-6">
                  <div aria-hidden="true" className="absolute -bottom-3 right-2 font-mono text-[4.5rem] font-black leading-none tracking-[-0.1em] text-white/[0.085] transition duration-300 group-hover:text-red-500/[0.16] md:text-[6.5rem]">{caseNumber}</div>
                  <div className="relative flex h-full items-start gap-3 sm:gap-4 md:gap-5">
                    <span className="pt-0.5 font-mono text-[11px] font-bold tracking-[0.1em] text-red-500 sm:text-xs md:text-[13px]">{caseNumber}</span>
                    <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                      <h2 className="text-base font-semibold leading-6 tracking-[0.01em] text-white/88 transition group-hover:text-white sm:text-[17px] sm:leading-7 md:text-lg md:leading-8">{company.title}</h2>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[8px] tracking-[0.1em] text-white/32 transition group-hover:text-red-300/70 sm:mt-3 sm:text-[9px] md:mt-4 md:text-[10px] md:tracking-[0.12em]"><Building2 size={12} aria-hidden="true" />ARCHIVE NO. {index + 1}</div>
                    </div>
                  </div>
                  <span className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 bg-red-500 transition-transform duration-300 group-hover:scale-y-100" />
                </li>
              </Link>
            );
          })}
        </ol>
      </div>
    </section>
  );
}



















