"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const menu = [
  {
    title: "首页",
    link: "/"
  },
  {
    title: "文章",
    link: "/article"
  },
  {
    title: "图片",
    link: "/image"
  },
  {
    title: "视频",
    link: "/video"
  }
];

const Header = () => {
  const pathname = usePathname();

  // menu in desktop
  const deskRightBar = (
    <div className="h-full space-x-2 b:mr-[15%] lg:mr-[20%] xl:mr-[25%] hidden b:block">
      {menu.map((item) => (
        <Link href={item.link} aria-label={item.title} key={item.link}>
          <button
            className={clsx(
              "h-full w-23 text-center cursor-pointer",
              pathname === `${item.link}`
                ? "text-white bg-secondmaincolor"
                : "text-white/90 hover:bg-secondmaincolor"
            )}
            aria-label={item.title}
          >
            {item.title}
          </button>
        </Link>
      ))}
    </div>
  );

  // menu in mobile
  const mobileRightBar = (
    <div className="block b:hidden mr-[5%]">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton
              id="header-menu-button"
              className="w-8 h-7 rounded-sm bg-gray-600/80 text-white flex items-center justify-center outline-0"
              aria-label="下拉菜单"
            >
              {open ? (
                <XMarkIcon className="size-7" />
              ) : (
                <Bars3Icon className="size-7" />
              )}
            </MenuButton>

            <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    as={motion.div}
                    initial={{ opacity: 0.5, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0.5, scaleY: 0 }}
                    anchor="bottom"
                    className="origin-top w-screen mt-2 bg-headerbackground box-border px-4 pt-2 pb-3 text-sm normal-font"
                  >
                    {menu.map((item, index) => (
                      <MenuItem key={item.link}>
                        <Link href={item.link} aria-label={item.title}>
                          <button
                            className={clsx(
                              "w-full text-left h-10 px-3 text-white",
                              pathname === `${item.link}`
                                ? "bg-secondmaincolor rounded-md dark:bg-maincolor"
                                : (index !== menu.length - 1 && "border-b border-gray-700")
                            )}
                            aria-label={item.title}
                          >
                            {item.title}
                          </button>
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                )}
              </AnimatePresence>
            </MotionConfig>
          </>
        )}
      </Menu>
    </div>
  );

  return (
    <header className="fixed w-screen h-14 b:h-17 bg-headerbackground flex items-center justify-between z-10 normal-font">
      <div className="flex items-center ml-[3%]">
        <Image
          src="/logo.webp"
          alt="网站logo"
          width={50}
          height={50}
          priority
          className="hidden b:block"
        />
        <Image
          src="/logo.webp"
          alt="网站logo"
          width={40}
          height={40}
          priority
          className="block b:hidden"
        />
        <div>
          <h1 className="text-[1.4rem] b:text-[1.7rem] leading-none font-medium text-white mb-[2px] mt-[2px]">
            曝光老赖
          </h1>
          <div className="text-xs leading-none font-medium text-white tracking-widest text-center">
            Expose Lao Lai
          </div>
        </div>
      </div>

      {deskRightBar}
      {mobileRightBar}
    </header>
  );
};

export default Header;
