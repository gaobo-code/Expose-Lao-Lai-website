import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import * as React from "react";

type Props = { 
};

const Jump = React.forwardRef<HTMLDivElement, Props>(
  ({}, ref) => {
    const pathname = usePathname();
    const [isHidden, setIsHidden] = React.useState(false);

    React.useEffect(() => {
      if (!ref || typeof ref === 'function' || !ref.current) return;

      const container = ref.current;
      const syncVisibility = () => {
        const groupTarget = Array.from(
          container.querySelectorAll<HTMLElement>('[data-jump-target="group"]')
        ).find((target) => target.offsetParent !== null);

        if (!groupTarget) {
          setIsHidden(false);
          return;
        }

        const containerTop = container.getBoundingClientRect().top;
        const groupTop = container.scrollTop
          + groupTarget.getBoundingClientRect().top
          - containerTop;
        const lastScrollTop = container.scrollHeight - container.clientHeight;
        const groupJumpTop = Math.min(groupTop, lastScrollTop);

        setIsHidden(container.scrollTop >= groupJumpTop - 8);
      };

      syncVisibility();
      container.addEventListener('scroll', syncVisibility, { passive: true });
      return () => container.removeEventListener('scroll', syncVisibility);
    }, [pathname, ref]);

    // Jump to the next visible section inside the page scroll container.
    const scrollToNext = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        const container = ref.current;
        const containerTop = container.getBoundingClientRect().top;
        const targets = Array.from(
          container.querySelectorAll<HTMLElement>('[data-jump-target]')
        ).filter((target) => target.offsetParent !== null);

        const nextTarget = targets.find(
          (target) => target.getBoundingClientRect().top > containerTop + 8
        );

        nextTarget?.scrollIntoView({ behavior: "smooth", block: "start" });

        if (nextTarget?.dataset.jumpTarget === "group") {
          setIsHidden(true);
        }
      }
    };

    if (isHidden) return null;

    return (
      <div
        className="w-9 h-9 fixed bottom-4 right-4 b:right-7 bg-[#c02667] border border-white/25 shadow-[0_4px_18px_rgba(192,38,103,0.45)] rounded-sm flex items-center justify-center hover:bg-[#db2777] hover:shadow-[0_6px_22px_rgba(219,39,119,0.55)] transition-all duration-300 ease-out cursor-pointer"
        onClick={scrollToNext}
      >
        <ChevronDownIcon className="size-6 text-white" />
      </div>
    );
  }
);

export default Jump;