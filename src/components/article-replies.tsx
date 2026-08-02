import { MessageCircleMore, Quote } from "lucide-react";

type Props = { replies?: string[]; type?: 1 | 2 };

export function ArticleReplies({ replies = [], type = 1 }: Props) {
  if (replies.length === 0) return null;
  const isCompany = type === 1;

  return (
    <section className="mx-auto mt-5 w-full max-w-[1280px] rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-5 shadow-[0_20px_60px_rgba(0,0,0,.2)] backdrop-blur-md sm:mt-8 sm:px-7 sm:py-7 b:px-10 b:py-9" aria-labelledby="article-replies-title">
      <header className="mb-5 flex items-end gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${isCompany ? "bg-red-500/10 text-red-400" : "bg-purple-500/10 text-purple-300"}`}><MessageCircleMore size={18} /></span>
          <div><p className={`text-[9px] tracking-[0.2em] ${isCompany ? "text-red-400/65" : "text-purple-300/65"}`}>COMMUNITY REPLIES</p><h2 id="article-replies-title" className="text-lg font-semibold text-white">网友回复</h2></div>
        </div>
      </header>
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {replies.map((reply, index) => (
          <li key={`${index}-${reply.slice(0, 12)}`} className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 px-4 py-4 transition hover:border-white/15 hover:bg-white/[0.045] sm:px-5 sm:py-5">
            <Quote size={18} className={`absolute right-4 top-4 opacity-20 ${isCompany ? "text-red-300" : "text-purple-300"}`} />
            <div className="mb-3 flex items-center gap-2">
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${isCompany ? "bg-red-500/15 text-red-300" : "bg-purple-500/15 text-purple-300"}`}>{index + 1}</span>
              <span className="text-[12px] tracking-[0.12em] text-white/30">网友</span>
            </div>
            <p className="pr-1 text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8 justify-cjk">{reply}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
