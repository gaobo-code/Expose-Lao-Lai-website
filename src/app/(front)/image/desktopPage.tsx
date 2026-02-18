"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

type imageProps = {
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

type Props = {
  imageData: Array<imageProps>;
};

export default function DesktopPage({ imageData }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const leftButtonHandleClick = (event: any) => {
    event.stopPropagation();
    if (imageIndex <= 0) {
      return;
    }
    setImageIndex(imageIndex - 1);
  };

  const rightButtonHandleClick = (event: any) => {
    event.stopPropagation();
    if (imageIndex >= imageData.length - 1) {
      return;
    }
    setImageIndex(imageIndex + 1);
  };

  return (
    <section className="w-full xl:w-320 h-full flex flex-col items-center pt-5 pb-5 b:px-16 box-border">
      <div className="w-full h-[calc(100%-var(--spacing)*30))] relative rounded-xl shadow-[0_.2rem_.4rem_rgba(0,0,0,.05)] bg-imagebackground">
        <div className="w-full h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={imageIndex}
              className="w-full h-full relative"
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
              }}
            >
              <Image
                src={imageData[imageIndex].url}
                alt={imageData[imageIndex].title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(min-width: 960px) 100vw, 0vw"
                className=""
                {...(imageIndex === 0 ? { priority: true } : {})}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center group z-60 cursor-pointer"
          onClick={leftButtonHandleClick}
        >
          <div
            className="w-0 h-0 group-hover:border-r-imagebutton/85 
         border-t-[20px] border-t-transparent 
         border-b-[20px] border-b-transparent 
         border-r-[30px] border-r-imagebutton/50"
          ></div>
        </div>

        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center group z-60 cursor-pointer"
          onClick={rightButtonHandleClick}
        >
          <div
            className="w-0 h-0 group-hover:border-l-imagebutton/85 
         border-t-[20px] border-t-transparent 
         border-b-[20px] border-b-transparent 
         border-l-[30px] border-l-imagebutton/50"
          ></div>
        </div>

        <div className="absolute w-10 h-7 top-1.5 left-1.5 text-sm text-white flex items-center justify-center">
          {imageIndex + 1} / {imageData.length}
        </div>
      </div>
      <div className="w-full h-30 pt-5 box-border flex items-center justify-center overflow-hidden">
        <div className="w-8/10 tracking-wider b:tracking-widest text-[19px] leading-[1.6] text-gray-800 dark:text-foreground font-bold line-clamp-3 justify-cjk">
          {imageData[imageIndex].description}
        </div>
      </div>
    </section>
  );
}
