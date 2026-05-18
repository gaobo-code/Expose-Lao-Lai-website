import { ChevronUpIcon } from "@heroicons/react/24/outline";
import * as React from "react";

type Props = {
  isDisplay: boolean;
};

const Indicator = React.forwardRef<HTMLDivElement, Props>(
  ({ isDisplay }, ref) => {

    if (isDisplay !== true) {
      return null;
    }

    // Control the page scrollbar to return to the top
    const scrollToTop = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return (
      <div
        className="w-9 h-9 fixed bottom-4 right-4 b:right-7 bg-maincolor rounded-sm flex items-center justify-center hover:bg-[#353030] transition-all duration-300 ease-out cursor-pointer"
        onClick={scrollToTop}
      >
        <ChevronUpIcon className="size-6 text-white" />
      </div>
    );
  }
);

export default Indicator;
