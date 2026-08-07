import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "趣味问答",
  description: "挑战趣味问答，答对问题即可揍大灰狼！",
  alternates: { canonical: "https://llwsydgs.cn/all/quiz" },
  openGraph: {
    title: "趣味问答",
    description: "挑战趣味问答，答对问题即可揍大灰狼！",
    url: "https://llwsydgs.com/all/quiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "趣味问答",
    description: "挑战趣味问答，答对问题即可揍大灰狼！"
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    }
  }
};

export default function DivinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen">
      {children}
    </div>
  );
}
