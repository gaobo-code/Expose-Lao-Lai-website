import type { ReactNode } from "react";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <article className="relative min-h-[calc(100svh-var(--spacing)*14)] w-full overflow-hidden bg-[#080707] text-white b:min-h-[calc(100svh-var(--spacing)*17)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_4%,rgba(239,68,68,.22),transparent_26%),radial-gradient(circle_at_92%_28%,rgba(127,29,29,.16),transparent_24%),linear-gradient(145deg,#0d0909_0%,#050505_50%,#100707_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-400/70 to-transparent shadow-[0_0_36px_7px_rgba(239,68,68,.2)]" />
      <div className="relative mx-auto w-full max-w-384 px-2 py-5 sm:px-5 sm:py-8 b:py-12">{children}</div>
    </article>
  );
}
