import clsx from "clsx";
import { getDigitMap } from "@/lib/utils";
import { groups } from "@/lib/data";

type DesktopGroupAreaProps = { variant: "company" | "relative" };

const variantClasses = {
  company: { heading: "bg-red-500/10 text-red-300", digit: "text-red-400/80" },
  relative: { heading: "bg-purple-500/10 text-purple-300", digit: "text-purple-400/80" },
} as const;

export default function DesktopGroupArea({ variant }: DesktopGroupAreaProps) {

  const classes = variantClasses[variant];

  return (
    <section className="mx-auto flex min-h-16 w-full max-w-[1280px] flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3 text-base leading-6 tracking-[0.02em] text-white/75 shadow-[0_12px_35px_rgba(0,0,0,.14)] backdrop-blur-sm sm:px-6">
      <span className={clsx("shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold tracking-[0.08em]", classes.heading)}>欢迎加入官方 QQ 群</span>
      {groups.map((group, index) => (
        <span key={index} className={clsx("inline-flex items-center text-base tracking-[0.01em] text-white/80 after:ml-4 after:text-white/20 after:content-['·'] last:after:hidden")}>
          <span className={clsx("mr-1.5 text-[12px]", classes.digit)} dangerouslySetInnerHTML={{ __html: getDigitMap(index) }} />
          <span>{group.groupname}</span>（<span>{group.groupnumber}</span>）
        </span>
      ))}
    </section>
  );
}
