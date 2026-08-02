import { FileText } from "lucide-react";
import markdownStyles from "./markdown-styles.module.css";

type Props = { content: string; type?: 1 | 2 };

export function ArticleBody({ content, type = 1 }: Props) {
  if (!content) return null;
  const isCompany = type === 1;

  return (
    <section data-jump-target="article" className="mx-auto mt-5 max-w-[1280px] rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-6 text-white/75 shadow-[0_20px_60px_rgba(0,0,0,.22)] backdrop-blur-md sm:mt-8 sm:px-8 sm:py-9 b:px-12">
      <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${isCompany ? "bg-red-500/10 text-red-400" : "bg-purple-500/10 text-purple-300"}`}><FileText size={18} /></span>
        <div><p className={`text-[9px] tracking-[0.2em] ${isCompany ? "text-red-400/70" : "text-purple-300/70"}`}>CASE NOTES</p><h2 className="text-lg font-semibold text-white">{isCompany ? '档案说明': '指南说明'}</h2></div>
      </div>
      <div className={`[&_a]:underline [&_h3]:text-white [&_li]:text-white/70 [&_p]:leading-8 ${isCompany ? "[&_a]:text-red-300" : "[&_a]:text-purple-300"}`}>
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
