import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "骗子公司专题",
  description: "骗子公司与求职骗局案例目录，记录真实经历，警惕招聘与商业合作陷阱。",
  alternates: { canonical: "https://llwsydgs.cn/all/company" },
  openGraph: {
    title: "骗子公司专题",
    description: "骗子公司与求职骗局案例目录，记录真实经历，警惕招聘与商业合作陷阱。",
    url: "https://llwsydgs.com/all/company",
  },
  twitter: {
    card: "summary_large_image",
    title: "骗子公司专题",
    description: "骗子公司与求职骗局案例目录，记录真实经历，警惕招聘与商业合作陷阱。"
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

export default function CompanyLayout({
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
