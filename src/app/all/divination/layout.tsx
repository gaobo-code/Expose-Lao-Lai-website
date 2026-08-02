import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "占卜屋",
  description: "在线占卜屋，体验塔罗牌占卜、每日运势和趣味占卜，探索未知，获得属于你的专属解读。",
  alternates: { canonical: "https://llwsydgs.com/all/divination" },
  openGraph: {
    title: "占卜屋",
    description: "在线占卜屋，体验塔罗牌占卜、每日运势和趣味占卜，探索未知，获得属于你的专属解读。",
    url: "https://llwsydgs.com/all/divination",
  },
  twitter: {
    card: "summary_large_image",
    title: "占卜屋",
    description: "在线占卜屋，体验塔罗牌占卜、每日运势和趣味占卜，探索未知，获得属于你的专属解读。"
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
