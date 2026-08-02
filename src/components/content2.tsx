"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Indicator2 from "./indicator2";
import Jump from "./jump";

type Props = {
  children?: React.ReactNode;
};

const Content2 = ({ children }: Props) => {
  let scrollRef = useRef<HTMLDivElement>(null);

  const [isDisplay, setIsDisplay] = useState(false);

  const pathname = usePathname();
  const isCompanyPage = /^\/all\/company(?:\/|$)/.test(pathname);
  const isRelativePage = /^\/all\/relative(?:\/|$)/.test(pathname);
  const isScamDetailPage = /^\/all\/(company|relative)\/[^/]+\/?$/.test(pathname);

  // When the page scrolls to a certain height, display control buttons
  useEffect(() => {
    const div = scrollRef.current;

    if (!div) {
      return;
    }

    const handleScroll = () => {
      setIsDisplay(div.scrollTop > 700);
    };

    handleScroll();
    div.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset scroll before paint when the route changes.
  useLayoutEffect(() => {
    // console.log("Route changed, reset scroll to top");
    const hasVisitedSession = sessionStorage.getItem("hasVisitedSession2");
    if (!hasVisitedSession) return;

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return (
    <>
      <div
        className="w-screen h-svh bg-background pt-14 b:pt-17 box-border relative z-0"
      >
        <div
          ref={scrollRef}
          data-content-scroll-container
          className={`w-full h-full overflow-x-hidden overflow-y-auto b:scrollbar ${
            isCompanyPage
              ? "scrollbar-thumb-[#52302e] scrollbar-track-[#130c0c] hover:scrollbar-thumb-[#75423e]"
              : isRelativePage
                ? "scrollbar-thumb-[#493250] scrollbar-track-[#130d17] hover:scrollbar-thumb-[#694873]"
                : "scrollbar-thumb-slate-500 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-400"
          }`}
        >
          {children}
        </div>
      </div>
      {
        (pathname === '/all/company' || pathname === '/all/relative') && <Indicator2 ref={scrollRef} isDisplay={isDisplay} />
      }

      {
        isScamDetailPage && <Jump ref={scrollRef} />
      }
    </>
  );
};

export default Content2;
