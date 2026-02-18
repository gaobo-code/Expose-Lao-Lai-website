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
    url: "/hairen1.webp",
    title: "骇人言论第一张图片",
    description:
      "",
    width: 500,
    height: 1106,
  },
  {
    url: "/hairen2.webp",
    title: "骇人言论第二张图片",
    description:
      "",
    width: 500,
    height: 1106,
  },
  {
    url: "/hairen3.webp",
    title: "骇人言论第三张图片",
    description:
      "",
    width: 500,
    height: 1106,
  },
  {
    url: "/hairen4.webp",
    title: "骇人言论第四张图片",
    description:
      "",
    width: 500,
    height: 1106,
  }
];

export default function Hairen() {

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
        <PostHeader title="QQ群的骇人言论" />
        <div className="mx-auto text-[19px] leading-relaxed">
          <p className="my-4 break-all justify-cjk">
            事情发生在2025年12月11日，发生在一个QQ群，Java全栈技术交流群（群号：941095490）。
          </p>
          <p className="mt-4 mb-4 break-all justify-cjk">
            我的网站于2025年11月18日成立，在12月份，王思宇派黑客奇袭了我的网站服务器。接下来，王思宇的计划是，一方面让黑客继续进攻我的网站服务器，另一方面，王思宇派他的手下，在他控制的这个QQ群，分别扮演，王思宇，甄世昊，刘圣慈这几个角色，因为这三个人曾出现在我的文章中，被我称作是“三巨头”。他们在陪我玩一个角色扮演的游戏，玩了几天了，目的就是拖住我，哄我开心，让我陶醉在这里面，好方便黑客进攻。另一个目的就是在玩的High的时候，在QQ群发一个图片啥的，实际上就是伪装的exe文件，我如果下载了，然后本地打开它，就会让我的电脑感染木马。陪我玩的这三个QQ号是，双生武魂王思宇（2975757714），指鹿为马甄世昊（2188784914）和 金牌打手刘圣慈（812876544）。角色扮演游戏玩了几天，我玩够了，我有任务，我得对付黑客，我不想玩了，但是他们还缠着我，让我玩。这就是事情发生的背景。
          </p>
          <div className="grid grid-cols-1 w-full box-border">
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
          <p className="mt-4 mb-10 break-all justify-cjk">
            第一张图是非得逼我跟他们玩，我不搭理他们。他们还急眼了，“再不说话，我让圣慈干你”。
          </p>
          <div className="grid grid-cols-1 w-full box-border">
            <Image
              src={imageData[1].url}
              alt={imageData[1].title}
              className="m-auto"
              width={imageData[1].width}
              height={imageData[1].height}
              onClick={() => openDialogMobileFun(1)}
            />
          </div>
          <p className="mt-4 mb-10 break-all justify-cjk">
            第二张图是关键。QQ（金牌打手刘圣慈）说 “上次王总派我去缅北参加培训，新学了一招水牢，把人困在水里，然后放电，全方位的电”。大家看到没？此人新学了一招，叫”水牢“，想用它来对付我。他还知道”水牢“是把人困在水里，全方位的电，这一般人是不知道的，竟然这样从他的口中说了出来。
          </p>
          <div className="grid grid-cols-1 w-full box-border">
            <Image
              src={imageData[2].url}
              alt={imageData[2].title}
              className="m-auto"
              width={imageData[2].width}
              height={imageData[2].height}
              onClick={() => openDialogMobileFun(2)}
            />
          </div>
          <p className="mt-4 mb-10 break-all justify-cjk">
            第三张图，到了下午，QQ（金牌打手刘圣慈）经人提醒，发现上午说的话有些不对，他又纠正了回来，他说：“高勃出来，我请你泡温泉，什么是水牢我不懂”。这等于说越描越黑，更加印证了上午说的话的真实性。
          </p>
          <div className="grid grid-cols-1 w-full box-border">
            <Image
              src={imageData[3].url}
              alt={imageData[3].title}
              className="m-auto"
              width={imageData[3].width}
              height={imageData[3].height}
              onClick={() => openDialogMobileFun(3)}
            />
          </div>
          <p className="mt-4 mb-10 break-all justify-cjk">
            第四张图，他们给我一个图片，是一个工作任务，想让我下载打开，然后让我的本地电脑中木马，然后传染给我的网站服务器。
          </p>
          <p className="mt-4 mb-4 break-all justify-cjk">
            这就是这个事情的始末。我长期与这些人接触，QQ（金牌打手刘圣慈） 和 QQ（双生武魂王思宇）的背后操作者应该是刘圣慈（王思宇集团的副总，打手，三巨头之一），QQ（指鹿为马甄世昊）的背后操作者应该是原辽宁志在远方网络科技的产品部领导。这些言论毕竟发生在网络，大家当笑话听一听就行了，不需要太认真。
          </p>
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
