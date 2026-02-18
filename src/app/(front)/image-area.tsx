"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import ImageDialog from "@/components/image-dialog";
import EmblaCarousel from "@/components/embla-carousel";
import React from "react";
import ImageRenderItem from "@/components/image-render-item"

type ImageDialogProps = {
  isOpen: boolean;
  imageIndex: number;
  imageData: Array<imageProps>;
  setIsOpen: (isOpen: boolean) => void;
};

type EmblaCarouselProps = {
  isMobileOpen: boolean;
  imageRender: Array<React.ReactNode>;
  imageIndex: number;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
};

type imageProps = {
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

export const imageData = [
  {
    url: "/qianxin1.webp",
    title: "老赖王思宇在法院的欠钱记录第一份",
    description:
      "在2023年4月的法庭上，王思宇宣称公司 (辽宁志在远方网络科技) 破产，资不抵债，实际上就是恶意欠钱。从这三份法院的欠钱记录来看，从2023年到2025年期间，依然不断的有员工和客户在起诉他，强制执行他，这证明他的公司一直在运营，而不是破产。",
    width: 616,
    height: 426,
  },
  {
    url: "/qianxin2.webp",
    title: "老赖王思宇在法院的欠钱记录第二份",
    description:
      "王思宇的公司，辽宁志在远方网络科技，大约有一半员工，跟他关系不好的，没有发放工资，所以到法院和劳动局起诉他，另一半员工，跟他关系好的，工资已全部发放，以备公司换壳之后使用，这完全就是恶意欠薪。",
    width: 616,
    height: 429,
  },
  {
    url: "/qianxin3.webp",
    title: "老赖王思宇在法院的欠钱记录第三份",
    description:
      "这些执行案件，大部分是员工申请，小部分是客户申请，因为王思宇善于钻法律的空子，大多数客户拿不到关键证据，在法庭诉讼阶段没有成功，没有到达执行阶段。",
    width: 616,
    height: 425,
  },
  {
    url: "/qianxin4.webp",
    title: "王思宇当老赖的记录",
    description:
      "这是王思宇成为老赖的记录，愤怒的员工见公司执行不到钱，又强制执行他个人，但可惜王思宇早已将财产全部转移，员工扑了个空，他真的是给这些员工好好上了一课。",
    width: 616,
    height: 1362,
  },
];

export default function ImageArea() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const items = useMemo(() => {
    let items = [];
    for (let i = 0; i < 3; i++) {
      items.push(
        <div className="w-full flex justify-center" key={i}>
          <div className="relative group cursor-pointer">
            <Image
              src={imageData[i].url}
              alt={imageData[i].title}
              width={imageData[i].width}
              height={imageData[i].height}
              className=""
              onClick={() => openDialogMobileFun(i)}
            />
            <div className="block b:hidden max-w-[616px] text-[19px] leading-[1.6] tracking-wider justify-cjk mt-4 mb-4">
              {imageData[i].description}
            </div>
            <div
              onClick={() => openDialogFun(i)}
              className="b:group-hover:opacity-100 b:group-hover:visible opacity-0 invisible absolute inset-0 bg-black/40 transition-all duration-1000 ease-out"
            >
              <div className="absolute w-8/10 left-1/10 bottom-7 bg-maincolor/90 text-white flex flex-col items-center p-4 box-border rounded-md">
                <div className="tracking-widest text-[19px]">
                  <div className="mb-1">{imageData[i].title}</div>
                  <div>--&nbsp;点击查看</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return items;
  }, []);

  const items2 = useMemo(() => {
    let items2 = [];

    items2.push(
      <div className="w-full flex justify-center" key={3}>
        <div className="relative group cursor-pointer">
          <Image
            src={imageData[3].url}
            alt={imageData[3].title}
            width={imageData[3].width}
            height={imageData[3].height}
            className=""
            onClick={() => openDialogMobileFun(3)}
          />
          <div className="block b:hidden max-w-[616px] text-[19px] leading-[1.6] tracking-wider justify-cjk mt-4 mb-4">
            {imageData[3].description}
          </div>
          <div
            onClick={() => openDialogFun(3)}
            className="b:group-hover:opacity-100 b:group-hover:visible opacity-0 invisible absolute inset-0 bg-black/40 transition-all duration-1000 ease-out"
          >
            <div className="absolute w-8/10 left-1/10 bottom-7 bg-maincolor/90 text-white flex flex-col items-center p-4 box-border rounded-md">
              <div className="tracking-widest text-[19px]">
                <div className="mb-1">{imageData[3].title}</div>
                <div>--&nbsp;点击查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return items2;
  }, []);

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

  const openDialogFun = (index: number) => {
    if (window.innerWidth < 960) {
      console.log("can't open in mobile and tablet");
      return;
    }
    setImageIndex(index);
    setIsOpen(true);
  };

  const openDialogMobileFun = (index: number) => {
    if (window.innerWidth < 960) {
      setImageIndex(index);
      setTimeout(() => {
        setIsMobileOpen(true);
      }, 200);
    }
  };

  //Click on the image and a pop-up box will appear on the desktop
  const ImageDialogCom = React.memo(
    ({ isOpen, imageIndex, imageData, setIsOpen }: ImageDialogProps) => {
      return (
        <ImageDialog
          isOpen={isOpen}
          imageIndex={imageIndex}
          imageData={imageData}
          setIsOpen={setIsOpen}
        ></ImageDialog>
      );
    }
  );

  //Click on the image and a pop-up box will appear on your phone
  const EmblaCarouselCom = React.memo(
    ({
      isMobileOpen,
      imageRender,
      imageIndex,
      setIsMobileOpen,
    }: EmblaCarouselProps) => {
      return (
        <EmblaCarousel
          isMobileOpen={isMobileOpen}
          imageRender={imageRender}
          imageIndex={imageIndex}
          setIsMobileOpen={setIsMobileOpen}
        ></EmblaCarousel>
      );
    }
  );

  return (
    <>
      <div className="w-full b:px-5 box-border mb-8 b:mb-5 text-[22px] b:text-xl  font-bold tracking-widest flex b:justify-start justify-center">
        <span>公开执行网</span>
        <span className="hidden b:block">:</span>
      </div>
      <div className="w-full grid grid-cols-1 b:grid-cols-2 gap-8 b:gap-6 lg:gap-8 xl:gap-12 b:px-5 box-border mb-13">
        {items}
      </div>
      <div className="w-full b:px-5 box-border mb-8 b:mb-5 text-[22px] b:text-xl  font-bold tracking-widest flex b:justify-start justify-center">
        <span>天眼查APP</span>
        <span className="hidden b:block">:</span>
      </div>
      <div className="w-full b:px-5 box-border mb-13 grid grid-cols-1 b:grid-cols-2 gap-8 b:gap-6 lg:gap-8 xl:gap-12">
        {items2}
      </div>

      {/* Popup box in desktop */}
      <ImageDialogCom
        isOpen={isOpen}
        imageIndex={imageIndex}
        imageData={imageData}
        setIsOpen={setIsOpen}
      ></ImageDialogCom>

      {/* Popup box in mobile */}
      <EmblaCarouselCom
        isMobileOpen={isMobileOpen}
        imageRender={imageRender}
        imageIndex={imageIndex}
        setIsMobileOpen={setIsMobileOpen}
      ></EmblaCarouselCom>
    </>
  );
}
