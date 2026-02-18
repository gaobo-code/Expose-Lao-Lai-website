"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useCallback, useState } from "react";
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { EmblaCarouselContext } from '@/lib/context';

type Props = {
  isMobileOpen: boolean;
  imageRender: Array<React.ReactNode>;
  imageIndex: number;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
};

// On the mobile phone, a slideshow of images
export default function EmblaCarousel({
  isMobileOpen,
  imageRender,
  imageIndex,
  setIsMobileOpen,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: imageIndex, duration: 30, watchDrag: false });

  // Manually control the carousel to jump to the previous image
  const goToPrev = (fn: () => void) => {
    if (!emblaApi) return;

    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev(false);
      setTimeout(() => {
        fn();
      }, 300)
    }
  }

  // Manually control the carousel image to jump to the next image
  const goToNext = (fn: () => void) => {
    if (!emblaApi) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(false);
      setTimeout(() => {
        fn();
      }, 300)
    }
  }

  useEffect(() => {
    if (!emblaApi) return;

    return () => {
      emblaApi.destroy();
    };
  }, [emblaApi])

  return (
    <Transition appear show={isMobileOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          setIsMobileOpen(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen h-svh items-center justify-center bg-[#0b0b0b]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel
              className="w-full h-full box-border"
              onClick={() => {
                setIsMobileOpen(false);
              }}
            >
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">

                  {/* Passing down through Context */}
                  <EmblaCarouselContext.Provider
                    value={{
                      goToPrev: (fn: () => void) => goToPrev(fn),
                      goToNext: (fn: () => void) => goToNext(fn),
                    }}
                  >{imageRender}</EmblaCarouselContext.Provider>
                </div>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
