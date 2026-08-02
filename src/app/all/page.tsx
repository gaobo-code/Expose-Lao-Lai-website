import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "老赖王思宇的故事",
  alternates: { canonical: "https://llwsydgs.com/all" },
  openGraph: { url: "https://llwsydgs.com/all" },
  robots: { index: false, follow: false },
};

const sections = [
  { url:"/all/company", title: "骗子公司", image: "/all/fraud-company.webp", accent: "#ff4d35" },
  { url:"/all/relative", title: "亲属骗人", image: "/all/family-deception.webp", accent: "#dd4dff" },
  { url:"/all/divination", title: "占卜屋", image: "/all/oracle-room.webp", accent: "#35e4ff" },
  { url:"/all/quiz", title: "趣味问答", image: "/all/fun-quiz.webp", accent: "#ffd53d" },
];

export default function All() {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--spacing)*14)] w-full items-center overflow-hidden bg-[#07080c] px-4 py-9 sm:px-8 md:py-12 b:py-22.5 text-white b:min-h-[calc(100svh-var(--spacing)*17)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 5% 5%, rgba(196, 44, 83, 0.34), transparent 65%)",
            "radial-gradient(ellipse 75% 65% at 96% 12%, rgba(79, 70, 229, 0.38), transparent 68%)",
            "radial-gradient(ellipse 85% 55% at 50% 105%, rgba(6, 182, 212, 0.24), transparent 70%)",
            "linear-gradient(145deg, #090b18 0%, #0b1024 48%, #070914 100%)",
          ].join(", "),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        }}
      />
      <div className="relative grid w-full min-h-[calc(100svh-var(--spacing)*32)] md:min-h-[calc(100svh-var(--spacing)*38)] b:min-h-[calc(100svh-var(--spacing)*62)] max-w-300 mx-auto grid-cols-1 gap-6 md:gap-8 b:grid-cols-2 b:gap-15">
        {sections.map(({ url, title, image, accent }) => (
          <Link href={url} aria-label={title} key={url}>
            <article className="w-full h-full group relative cursor-pointer overflow-hidden rounded-[18px] border border-white/10 bg-[#101117] shadow-2xl max-h-90">
              <Image src={image} alt={`${title}`} priority fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-1000 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/10" />
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition duration-700 group-hover:scale-x-100" style={{ backgroundColor: accent }} />

              <div className="absolute inset-0 grid place-items-center p-5">
                <h2 className="text-center text-4xl font-bold tracking-[0.15em] drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] transition duration-500 group-hover:scale-105 md:text-6xl b:text-[64px]">{title}</h2>
              </div>

              <div className="hidden b:block absolute bottom-4 right-4 h-10 w-10 rounded-full border border-white/30 bg-black/25 backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <div className="w-full h-full grid place-items-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}






