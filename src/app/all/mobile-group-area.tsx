import clsx from "clsx";
import { getDigitMap } from "@/lib/utils";
import { groups } from "@/lib/data";

type MobileGroupAreaProps = { variant: "company" | "relative" };

const variantClasses = {
  company: { heading: "bg-red-500/10 text-red-300", digit: "text-red-400/80" },
  relative: { heading: "bg-purple-500/10 text-purple-300", digit: "text-purple-400/80" },
} as const;

export default function MobileGroupArea({ variant }: MobileGroupAreaProps) {
  
  const classes = variantClasses[variant];

  return (
    <section className="mx-auto w-full max-w-[1280px] rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-[15px] leading-6 tracking-[0.02em] text-white/75 shadow-[0_10px_30px_rgba(0,0,0,.14)] backdrop-blur-sm">
      <div className={clsx("mb-2 w-fit rounded-lg px-2.5 py-1 text-[13px] font-semibold tracking-[0.08em]", classes.heading)}>欢迎加入官方 QQ 群</div>
      {groups.map((group, index) => (
        <span key={index} className={clsx("flex min-h-8 items-center px-1 py-0.5 text-[15px] text-white/80")}>
          <span className={clsx("mr-1.5 shrink-0 text-[11px]", classes.digit)} dangerouslySetInnerHTML={{ __html: getDigitMap(index) }} />
          <span>{group.groupname}</span>（<span>{group.groupnumber}</span>）
        </span>
      ))}
    </section>
  );
}
