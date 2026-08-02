"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Indicator from "./indicator";
import Reload from "./reload";

type Props = {
  children?: React.ReactNode;
};

const Content = ({ children }: Props) => {
  let scrollRef = useRef<HTMLDivElement>(null);
  const [isDisplay, setIsDisplay] = useState(false);

  const pathname = usePathname();

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
    const hasVisitedSession = sessionStorage.getItem("hasVisitedSession");
    if (!hasVisitedSession) return;

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return (
    <>
      <div
        className="w-screen h-svh bg-background pt-14 b:pt-17 box-border"
      >
        <div ref={scrollRef} className="w-full h-full overflow-x-hidden overflow-y-auto b:scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-200 hover:scrollbar-thumb-slate-500 dark:scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:hover:scrollbar-thumb-slate-500">
          {children}
        </div>
      </div>
      {
        pathname === '/comic' ? <Reload /> : <Indicator ref={scrollRef} isDisplay={isDisplay} />
      }
    </>
  );
};

export default Content;
