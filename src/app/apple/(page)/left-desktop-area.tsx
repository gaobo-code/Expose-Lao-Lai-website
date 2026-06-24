"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "QQ群管理",
    link: "/apple"
  },
  {
    title: "评论管理",
    link: "/apple/comment"
  },
  {
    title: "系统配置",
    link: "/apple/config"
  }
];

export default function LeftDesktopArea() {
  const pathname = usePathname();

  return (
    <section className="w-60 h-full bg-gray-700">
      <div className="w-full h-12 text-white flex items-center justify-center text-[22px] font-bold">
        网&nbsp;站&nbsp;后&nbsp;台
      </div>
      <div className="p-6 box-border text-white">
        {menu.map((item) => (
          <Link href={item.link} key={item.link}>
            <div
              className={clsx(
                "mb-5 w-full text-left text-[17px] tracking-widest cursor-pointer",
                pathname === `${item.link}`
                  ? "text-maincolor"
                  : "text-white hover:text-maincolor hover:underline hover:underline-offset-8"
              )}
            >
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
