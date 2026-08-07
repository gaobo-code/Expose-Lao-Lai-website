import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper2 from "@/components/layout-wrapper2";
import { Toaster } from 'sonner'
import type { Viewport } from 'next'
import GlobalToast2 from "@/components/global-toast2";

import localFont from 'next/font/local'

const zcool = localFont({
  src: '../ZCOOLKuaiLe-Subset2.woff2',
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
  alternates: {
    canonical: "https://llwsydgs.cn/all"
  },
  openGraph: {
    title: "老赖王思宇的休闲馆",
    description: "包括骗子公司专题、亲属骗人专题、占卜屋、趣味问答四个板块。",
    url: "https://llwsydgs.com/all",
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
    title: "老赖王思宇的休闲馆",
    description: "包括骗子公司专题、亲属骗人专题、占卜屋、趣味问答四个板块。",
    images: ["https://llwsydgs.com/opengraph-image.png"],
  },
  robots: { index: false, follow: false }
};

// Prevent page zooming
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content',
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
        <LayoutWrapper2>{children}</LayoutWrapper2>
        <GlobalToast2 />
        <Toaster position="top-center" richColors toastOptions={{
          style: {
            fontSize: '15px',
          },
        }} />
      </body>
    </html>
  );
}
