"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Indicator from "./indicator";

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
    const handleScroll = () => {
      // console.log("Div scroll:", div?.scrollTop);

      if ((div?.scrollTop || 0) > 800) {
        if (isDisplay === false) {
          setIsDisplay(true);
        }
      } else {
        if (isDisplay === true) {
          setIsDisplay(false);
        }
      }
    };

    div?.addEventListener("scroll", handleScroll);
    return () => div?.removeEventListener("scroll", handleScroll);
  }, [isDisplay]);

  // reset scroll when route changes
  useEffect(() => {
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
      <Indicator ref={scrollRef} isDisplay={isDisplay} />
    </>
  );
};

export default Content;
