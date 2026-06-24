import type { Metadata } from "next";
import "./globals.css";
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: "网站后台",
  description: "《老赖王思宇的故事》网站后台"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const userAgent = headerList.get('user-agent') || '';

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent)

  if (isMobile) {
    return (
      <html lang="zh-CN">
        <body className={`antialiased`}>
          <div className="w-screen h-svh flex flex-col items-center justify-center">
            <span className="text-2xl tracking-widest">手机禁止访问</span>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="zh-CN">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
