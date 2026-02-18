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
  src: '../ZCOOLKuaiLe-Regular.woff2',
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
  description: "王思宇是一个软件开发行业中的骗子。对客户骗取项目定金，对员工严重拖欠工资，性质十分恶劣。被众多客户和员工起诉到法院，王思宇和公司成为了老赖。然后王思宇又通过同伙甄世昊的名义注册了沈阳衡源网络科技有限公司，继续骗人。",
  keywords: ["老赖", "王思宇", "软件开发", "沈阳衡源网络科技", "拖欠工资", "骗子公司", "沈阳衡源网络科技有限公司"],
  openGraph: {
    title: "老赖王思宇的故事",
    description: "欢迎光临本网站！揭发老赖，人人有责！",
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
  icons: {
    shortcut: {
      url: "https://llwsydgs.com/favicon.ico",
      type: "image/x-icon",
    }
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
