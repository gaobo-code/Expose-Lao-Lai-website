"use client";

import { useState, useMemo } from "react";
import EmblaCarousel from "@/components/embla-carousel";
import MobileImageRender from "./mobileImageRender";
import React from "react";
import ImageRenderItem from "@/components/image-render-item"

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

export default function MobilePage({ imageData }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // On the phone, after clicking on the image, enter the carousel of the image
  const openDialogMobileFun = (index: number) => {
    if (window.innerWidth < 960) {
      setImageIndex(index);
      setTimeout(() => {
        setIsMobileOpen(true);
      }, 200);
    }
  };

  const imageRender = useMemo(() => {
      let imageRender: Array<React.ReactNode> = [];
  
      imageData.forEach((item, index) => {
        imageRender.push(
          <div key={index} className="embla__slide">
            <ImageRenderItem index={index} total={imageData.length} url={item.url} title={item.title} width={item.width} height={item.height}></ImageRenderItem>
          </div>
        );
      });
  
      return imageRender;
    }, []);

  const MobileImage = React.memo(() => {
    return (
      <MobileImageRender
        imageData={imageData}
        openDialogMobileFun={openDialogMobileFun}
      ></MobileImageRender>
    );
  });

  return (
    <>
      <MobileImage></MobileImage>

      {/* On the phone, after clicking on the image, enter the carousel of the image */}
      <EmblaCarousel
        isMobileOpen={isMobileOpen}
        imageRender={imageRender}
        imageIndex={imageIndex}
        setIsMobileOpen={setIsMobileOpen}
      ></EmblaCarousel>
    </>
  );
}
