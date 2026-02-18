"use client";

import Image from "next/image";
import EmblaCarousel from "@/components/embla-carousel";
import React from "react";
import { useState, useMemo } from "react";
import ImageRenderItem from "@/components/image-render-item"
import { PostHeader } from "@/components/post-header";

type EmblaCarouselProps = {
  isMobileOpen: boolean;
  imageRender: Array<React.ReactNode>;
  imageIndex: number;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
};

export const imageData = [
  {
    url: "/ouji1.webp",
    title: "偶寄第一张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji2.webp",
    title: "偶寄第二张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji3.webp",
    title: "偶寄第三张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji4.webp",
    title: "偶寄第四张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji5.webp",
    title: "偶寄第五张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji6.webp",
    title: "偶寄第六张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji7.webp",
    title: "偶寄第七张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji8.webp",
    title: "偶寄第八张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji9.webp",
    title: "偶寄第九张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji10.webp",
    title: "偶寄第十张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji11.webp",
    title: "偶寄第十一张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji12.webp",
    title: "偶寄第十二张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji13.webp",
    title: "偶寄第十三张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji14.webp",
    title: "偶寄第十四张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji15.webp",
    title: "偶寄第十五张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji16.webp",
    title: "偶寄第十六张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji17.webp",
    title: "偶寄第十七张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji18.webp",
    title: "偶寄第十八张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji19.webp",
    title: "偶寄第十九张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji20.webp",
    title: "偶寄第二十张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji21.webp",
    title: "偶寄第二十一张图片",
    description:
      "",
    width: 500,
    height: 1000,
  },
  {
    url: "/ouji22.webp",
    title: "偶寄第二十二张图片",
    description:
      "",
    width: 500,
    height: 1000,
  }
];


export default function Ouji() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // On the phone, after clicking on the image, enter the carousel of the image
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

  // On the phone, after clicking on the image, enter the carousel of the image
  const openDialogMobileFun = (index: number) => {
    if (window.innerWidth < 960) {
      setImageIndex(index);
      setTimeout(() => {
        setIsMobileOpen(true);
      }, 200);
    }
  };

  return (
    <>
      <div className="w-full pt-5 pb-10 b:pt-10 b:pb-15 tracking-wider b:tracking-widest">
        <PostHeader title="骗子偶寄和其小号" />
        <div className="mx-auto text-[19px] leading-relaxed">
          <p className="my-4 break-all justify-cjk">
            偶寄（3788759585）这个人就多说了，大多数何其合作过的都知道嘴臭，爱跑路不用多说了，大多数何其合作过的都知道嘴臭，爱跑路。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[0].url}
              alt={imageData[0].title}
              className="m-auto"
              width={imageData[0].width}
              height={imageData[0].height}
              priority
              onClick={() => openDialogMobileFun(0)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            2025年9月24号跑路，被我在接单的群内曝光（用小号曝光这是重点），切没在其他任何群内发过曝光内容。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[1].url}
              alt={imageData[1].title}
              className="m-auto"
              width={imageData[1].width}
              height={imageData[1].height}
              onClick={() => openDialogMobileFun(1)}
            />
            <Image
              src={imageData[2].url}
              alt={imageData[2].title}
              className="m-auto"
              width={imageData[2].width}
              height={imageData[2].height}
              onClick={() => openDialogMobileFun(2)}
            />
            <Image
              src={imageData[3].url}
              alt={imageData[3].title}
              className="m-auto"
              width={imageData[3].width}
              height={imageData[3].height}
              onClick={() => openDialogMobileFun(3)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            2025年9月25号
            Dx（3347421908）添加我大号说要买偶寄购买的同款源码（重点我没用大号在任何群内发过我有该源码），添加过后一直询问我给偶寄的那套问题在哪？
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[4].url}
              alt={imageData[4].title}
              className="m-auto"
              width={imageData[4].width}
              height={imageData[4].height}
              onClick={() => openDialogMobileFun(4)}
            />
            <Image
              src={imageData[5].url}
              alt={imageData[5].title}
              className="m-auto"
              width={imageData[5].width}
              height={imageData[5].height}
              onClick={() => openDialogMobileFun(5)}
            />
            <Image
              src={imageData[6].url}
              alt={imageData[6].title}
              className="m-auto"
              width={imageData[6].width}
              height={imageData[6].height}
              onClick={() => openDialogMobileFun(6)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            后让我给他看后台我说只能QQ分享屏幕给他看，其借口在外忽悠我录制视频（我猜测是拿我录制的视频坑骗客户），注意我并没有给他后台演示和代理账号（那他怎么测试的，在哪测试的，这点存疑）
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[7].url}
              alt={imageData[7].title}
              className="m-auto"
              width={imageData[7].width}
              height={imageData[7].height}
              onClick={() => openDialogMobileFun(7)}
            />
            <Image
              src={imageData[8].url}
              alt={imageData[8].title}
              className="m-auto"
              width={imageData[8].width}
              height={imageData[8].height}
              onClick={() => openDialogMobileFun(8)}
            />
            <Image
              src={imageData[9].url}
              alt={imageData[9].title}
              className="m-auto"
              width={imageData[9].width}
              height={imageData[9].height}
              onClick={() => openDialogMobileFun(9)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            2025年9月25号下午6:39我在其他群内发现Dx在卖该源码并宣称完整源码，此时我严重怀疑其为偶寄小号，（因为我未用大号在任何群内卖过这源码，切只卖过偶寄，也未宣传过）其说为朋友介绍，我在群内多次让Dx说是谁介绍其来，总用其他借口敷衍不正面回答。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[10].url}
              alt={imageData[10].title}
              className="m-auto"
              width={imageData[10].width}
              height={imageData[10].height}
              onClick={() => openDialogMobileFun(10)}
            />
            <Image
              src={imageData[11].url}
              alt={imageData[11].title}
              className="m-auto"
              width={imageData[11].width}
              height={imageData[11].height}
              onClick={() => openDialogMobileFun(11)}
            />
            <Image
              src={imageData[12].url}
              alt={imageData[12].title}
              className="m-auto"
              width={imageData[12].width}
              height={imageData[12].height}
              onClick={() => openDialogMobileFun(12)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            2025年9月25号晚上7:31一位卖服务器的人说偶寄找他测试的服务器还有Dx,这个互联网还没有我们村大两人碰巧一起找我买源码，又碰巧找一个人买服务器。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[13].url}
              alt={imageData[13].title}
              className="m-auto"
              width={imageData[13].width}
              height={imageData[13].height}
              onClick={() => openDialogMobileFun(13)}
            />
            <Image
              src={imageData[14].url}
              alt={imageData[14].title}
              className="m-auto"
              width={imageData[14].width}
              height={imageData[14].height}
              onClick={() => openDialogMobileFun(14)}
            />
            <Image
              src={imageData[15].url}
              alt={imageData[15].title}
              className="m-auto"
              width={imageData[15].width}
              height={imageData[15].height}
              onClick={() => openDialogMobileFun(15)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            此时3号人物出现璐（2056049698），我怀疑其为偶寄的朋友，再次碰巧璐和偶寄两人同时电脑出现问题（注意璐口中说他我电脑坏了），这个他又是谁，Dx此时说叫卖服务器的拿登录IP出分辨他是不是偶寄（偶寄是在网吧弄的本人远程帮其配置过），其实此时他只要说出是谁推荐他来的都可以证明他是清白的（但是Dx及其不要脸，一直逃避问题不做正面回答，一但多次询问就往其他人身上扯）。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[16].url}
              alt={imageData[16].title}
              className="m-auto"
              width={imageData[16].width}
              height={imageData[16].height}
              onClick={() => openDialogMobileFun(16)}
            />
            <Image
              src={imageData[17].url}
              alt={imageData[17].title}
              className="m-auto"
              width={imageData[17].width}
              height={imageData[17].height}
              onClick={() => openDialogMobileFun(17)}
            />
            <Image
              src={imageData[18].url}
              alt={imageData[18].title}
              className="m-auto"
              width={imageData[18].width}
              height={imageData[18].height}
              onClick={() => openDialogMobileFun(18)}
            />
          </div>
          <p className="my-6 break-all justify-cjk">
            再次十分的巧合三人的QQ空间都存在互相浏览，我想这个世界就是这么小吧，再次再次因为巧合两人骂人的口语一样，我想这个世界充满巧合，还有很多的证据可以证明这三个账号的人为相识或者同一人，大家可以自己去翻一下群内聊天记录。
            <br />
            偶寄（3788759585）Dx（3347421908）璐（2056049698）。
          </p>
          <div className="grid grid-cols-1 b:grid-cols-3 gap-10 w-full box-border">
            <Image
              src={imageData[19].url}
              alt={imageData[19].title}
              className="m-auto"
              width={imageData[19].width}
              height={imageData[19].height}
              onClick={() => openDialogMobileFun(19)}
            />
            <Image
              src={imageData[20].url}
              alt={imageData[20].title}
              className="m-auto"
              width={imageData[20].width}
              height={imageData[20].height}
              onClick={() => openDialogMobileFun(20)}
            />
            <Image
              src={imageData[21].url}
              alt={imageData[21].title}
              className="m-auto"
              width={imageData[21].width}
              height={imageData[21].height}
              onClick={() => openDialogMobileFun(21)}
            />
          </div>
        </div>
      </div>

      <EmblaCarouselCom
        isMobileOpen={isMobileOpen}
        imageRender={imageRender}
        imageIndex={imageIndex}
        setIsMobileOpen={setIsMobileOpen}
      ></EmblaCarouselCom>
    </>
  );
}
