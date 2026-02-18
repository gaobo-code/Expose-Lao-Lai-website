"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, Fragment, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  imageIndex: number;
  imageData: Array<imageProps>;
  setIsOpen: (isOpen: boolean) => void;
};

type imageProps = {
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

export function ImageDialogContent({
  isOpen,
  imageIndex,
  imageData,
  setIsOpen,
}: Props) {
  const [imageIn, setImageIn] = useState(imageIndex);

  const leftButtonHandleClick = (event: any) => {
    event.stopPropagation();
    if (imageIn <= 0) {
      return;
    }
    setImageIn(imageIn - 1);
  };

  const rightButtonHandleClick = (event: any) => {
    event.stopPropagation();
    if (imageIn >= imageData.length - 1) {
      return;
    }
    setImageIn(imageIn + 1);
  };

  return (
    <div className="relative">
      <DialogPanel className="w-240 h-200 min-w-240 min-h-200 border bg-white box-border overflow-hidden shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={imageIn}
            className="w-full h-full"
            initial={{
              opacity: 0.3,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{
              opacity: { duration: 0.3 },
            }}
          >
            <DialogTitle className="w-full h-20 py-3 font-bold box-border flex items-center justify-center relative">
              <div className="flex items-center h-full">
                <div className="w-5 h-5 rounded-full bg-maincolor mr-4"></div>
                <div className="w-7 h-7 rounded-full bg-maincolor mr-4"></div>
                <div className="w-140 h-full bg-maincolor text-white rounded-4xl flex items-center justify-center text-[29px] tracking-widest mr-4">
                  {imageData[imageIn].title}
                </div>
                <div className="w-7 h-7 rounded-full bg-maincolor mr-4"></div>
                <div className="w-5 h-5 rounded-full bg-maincolor mr-4"></div>
              </div>
              <div
                className="w-7 h-7 absolute top-1.5 right-1.5 text-maincolor flex items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <XMarkIcon className="size-6" />
              </div>
              <div className="absolute w-10 h-7 top-1.5 left-1.5 text-sm text-maincolor flex items-center justify-center">
                {imageIn + 1} / {imageData.length}
              </div>
            </DialogTitle>
            <div className="w-full h-150 py-6 px-6 box-border">
              <div className="w-full h-full relative flex items-start justify-center">
                <Image
                  src={imageData[imageIn].url}
                  alt={imageData[imageIn].title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="90vw"
                  className=""
                  priority
                />
              </div>
            </div>

            <Description className="w-full h-30 px-8 box-border text-lg leading-[1.6] tracking-widest font-bold overflow-hidden text-secondmaincolor">
              {imageData[imageIn].description}
            </Description>
          </motion.div>
        </AnimatePresence>
      </DialogPanel>
      <div
        className="absolute -left-25 top-1/2 -translate-y-1/2 w-[90px] h-[110px] flex items-center justify-center group z-60 cursor-pointer"
        onClick={leftButtonHandleClick}
      >
        <div
          className="w-0 h-0 group-hover:border-r-white 
         border-t-[20px] border-t-transparent 
         border-b-[20px] border-b-transparent 
         border-r-[30px] border-r-white/60"
        ></div>
      </div>

      <div
        className="absolute -right-25 top-1/2 -translate-y-1/2 w-[90px] h-[110px] flex items-center justify-center group z-60 cursor-pointer"
        onClick={rightButtonHandleClick}
      >
        <div
          className="w-0 h-0 group-hover:border-l-white 
         border-t-[20px] border-t-transparent 
         border-b-[20px] border-b-transparent 
         border-l-[30px] border-l-white/60"
        ></div>
      </div>
    </div>
  );
}

export default function ImageDialog({
  isOpen,
  imageIndex,
  imageData,
  setIsOpen,
}: Props) {
  const backgroundHandleClick = (event: any) => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} className="relative z-50">
        <div
          className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-[#0b0b0b]/85"
          onClick={backgroundHandleClick}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <div>
              <ImageDialogContent
                isOpen={isOpen}
                imageIndex={imageIndex}
                imageData={imageData}
                setIsOpen={setIsOpen}
              ></ImageDialogContent>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
