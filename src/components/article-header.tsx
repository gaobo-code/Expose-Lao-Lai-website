import Link from "next/link";
import { ArrowLeft, Building2, UsersRound } from "lucide-react";

type Props = { title: string; type?: 1 | 2; caseNumber?: string; backHref?: string };

export function ArticleHeader({ title, type = 1, caseNumber = "01", backHref }: Props) {
  const isCompany = type === 1;
  const href = backHref ?? (isCompany ? "/all/company" : "/all/relative");

  return (
    <header className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_20px_55px_rgba(0,0,0,.24)] backdrop-blur-xl sm:mb-7">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 sm:px-6">
        <Link href={href} className="group inline-flex items-center gap-2 text-xs tracking-[0.08em] text-white/50 transition hover:text-white sm:text-sm">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          返回专题
        </Link>
        <span className={`font-mono text-[10px] tracking-[0.18em] ${isCompany ? "text-red-300/55" : "text-purple-300/55"}`}>CASE / {caseNumber}</span>
      </div>

      <div className="relative flex items-center gap-3 px-5 py-5 sm:gap-4 sm:px-7 sm:py-6 b:px-9">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border sm:h-12 sm:w-12 ${isCompany ? "border-red-500/20 bg-red-500/10 text-red-300" : "border-purple-400/20 bg-purple-500/10 text-purple-300"}`}>
          {isCompany ? <Building2 size={20} aria-hidden="true" /> : <UsersRound size={20} aria-hidden="true" />}
        </span>
        <div className="min-w-0">
          <p className={`mb-1 text-[9px] font-semibold tracking-[0.2em] sm:text-[10px] ${isCompany ? "text-red-400/65" : "text-purple-300/65"}`}>{isCompany ? "SCAM COMPANY ARCHIVE" : "RELATIVE SCAM GUIDELINE"}</p>
          <h1 className="text-xl font-bold leading-[1.35] text-white sm:text-3xl b:text-4xl">{title}</h1>
        </div>
        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent ${isCompany ? "via-red-500" : "via-purple-400"} to-transparent`} />
      </div>
    </header>
  );
}
