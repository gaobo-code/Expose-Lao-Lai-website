import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import GlobalToast from "@/components/global-toast";
import { Toaster } from 'sonner'
import type { Viewport } from 'next'

// // app/layout.tsx
// import { ZCOOL_KuaiLe } from 'next/font/google'

// const zcool = ZCOOL_KuaiLe({
//   weight: '400',
//   subsets: ['latin'], // Google 这里其实无所谓
//   display: 'swap',
//   adjustFontFallback: true,
//   fallback: [
//     'Arial',
//     'PingFang SC',
//     'Noto Sans SC',
//     'sans-serif'
//   ],
// })

import localFont from 'next/font/local'

const zcool = localFont({
  src: '../ZCOOLKuaiLe-Subset.woff2',
  weight: '400',
  display: 'swap',
  fallback: [
    'Arial',
    'PingFang SC',
    'Noto Sans SC',
    'sans-serif'
  ],
  preload: true
})

export const metadata: Metadata = {
  title: "老赖王思宇的故事",
  description: "王思宇是一个沈阳软件行业中的老板，骗取项目定金，严重拖欠工资，还雇佣打手欺负程序员，还策划过将单位的漂亮女员工骗到西双版纳旅游，被众多员工和客户起诉到法院，成为了老赖，然后又通过他人的名义继续在沈阳开办公司。",
  keywords: ["老赖", "王思宇", "沈阳", "软件开发", "沈阳衡源网络科技", "辽宁志在远方网络科技", "大连火石致远科技", "拖欠工资", "骗取项目定金"],
  alternates: {
    canonical: "https://llwsydgs.com"
  },
  openGraph: {
    title: "老赖王思宇的故事",
    description: "王思宇是一个沈阳软件行业中的老板，骗取项目定金，严重拖欠工资，还雇佣打手欺负程序员，还策划过将单位的漂亮女员工骗到西双版纳旅游，被众多员工和客户起诉到法院，成为了老赖，然后又通过他人的名义继续在沈阳开办公司。",
    url: "https://llwsydgs.com",
    siteName: "老赖王思宇的故事",
    locale: "zh-CN",
    type: "website",
    images: [
      {
        url: "https://llwsydgs.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "老赖王思宇年轻时的照片"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "老赖王思宇的故事",
    description: "王思宇是一个沈阳软件行业中的老板，骗取项目定金，严重拖欠工资，还雇佣打手欺负程序员，还策划过将单位的漂亮女员工骗到西双版纳旅游，被众多员工和客户起诉到法院，成为了老赖，然后又通过他人的名义继续在沈阳开办公司。",
    images: ["https://llwsydgs.com/opengraph-image.png"],
  }
};

// Prevent page zooming
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${zcool.className} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <GlobalToast />
        <Toaster position="top-center" richColors toastOptions={{
          style: {
            fontSize: '15px',
          },
        }} />
      </body>
    </html>
  );
}
