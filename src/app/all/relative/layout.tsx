import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "亲属骗人专题",
  description: "亲属骗局案例目录，记录发生在亲情与信任关系中的欺骗。",
  alternates: { canonical: "https://llwsydgs.com/all/relative" },
  openGraph: {
    title: "亲属骗人专题",
    description: "亲属骗局案例目录，记录发生在亲情与信任关系中的欺骗。",
    url: "https://llwsydgs.com/all/relative",
  },
  twitter: {
    card: "summary_large_image",
    title: "亲属骗人专题",
    description: "亲属骗局案例目录，记录发生在亲情与信任关系中的欺骗。"
  },
  robots:{
    index:false,
    follow:false,
    googleBot: {
      index: false,
      follow: false,
    }
  }
};

export default function RelativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen">
      {children}
    </main>
  );
}
