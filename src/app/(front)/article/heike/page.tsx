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
    url: "/heike1.webp",
    title: "黑客第一张图片",
    description:
      "",
    width: 1184,
    height: 672,
  },
  {
    url: "/heike2.webp",
    title: "黑客第二张图片",
    description:
      "",
    width: 1184,
    height: 673,
  },
  {
    url: "/heike3.webp",
    title: "黑客第三张图片",
    description:
      "",
    width: 1184,
    height: 672,
  },
  {
    url: "/heike4.webp",
    title: "黑客第四张图片",
    description:
      "",
    width: 1184,
    height: 674,
  },
  {
    url: "/heike5.webp",
    title: "黑客第五张图片",
    description:
      "",
    width: 1184,
    height: 706,
  },
  {
    url: "/heike6.webp",
    title: "黑客第六张图片",
    description:
      "",
    width: 1184,
    height: 654,
  },
  {
    url: "/heike7.webp",
    title: "黑客第七张图片",
    description:
      "",
    width: 1184,
    height: 396,
  },
  {
    url: "/heike8.webp",
    title: "黑客第八张图片",
    description:
      "",
    width: 1184,
    height: 335,
  },
  {
    url: "/heike9.webp",
    title: "黑客第九张图片",
    description:
      "",
    width: 1184,
    height: 323,
  },
  {
    url: "/heike10.webp",
    title: "黑客第十张图片",
    description:
      "",
    width: 1184,
    height: 452
  },
];

export default function Heike() {

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
        <PostHeader title="王思宇派黑客奇袭我网站服务器全程" />
        <div className="mx-auto text-[19px] leading-relaxed">
          <h3 className="mt-8 mb-4 break-all text-[21px] font-bold md:text-[25px]">
            一、事件发生的背景
          </h3>
          <p className="my-4 break-all justify-cjk">
            2025年，特朗普对伊朗发动了奇袭。2025年12月初，王思宇对我的网站服务器发动了奇袭，手法有些相似。
          </p>
          <p className="my-4 break-all justify-cjk">
            之前，我和王思宇团队只是在qq群对骂，然后他们投诉我，将我踢出qq群，每天很热闹。然后，我计划做一个网站，做之前通知了王思宇，开玩笑的说网站上线后邀请他当网站的测试员，结果没想到这个家伙还真的来了，还带了重量级人物。
          </p>
          <p className="my-4 break-all justify-cjk">
            自从我的网站于2025年11月18日上线后，一段时间，没了声音，没人搭理我了，王思宇派人对我说，“我做的网站对王思宇没有影响，如果做出过分的事情，会到法院起诉我”。这让我有些失落，但是很快我调整了过来，我知道这也是王思宇的诡计。我每天循序渐进的开发着网站，我原以为也只是对王思宇的名声会有一些轻微的影响，然而，出人意料的是，到了2025年12月初，王思宇竟然派黑客奇袭了我的网站。
          </p>
          <h3 className="mt-8 mb-6 break-all text-[21px] font-bold md:text-[25px]">
            二、网站服务器CPU飙升到99%
          </h3>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
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
          <p className="mt-6 mb-10 break-all justify-cjk">
            我的网站服务器设置了告警。这张图显示的是我网站服务器告警次数，告警原因是CPU占用达到99%。告警日期从2025年12月5日持续到2025年12月16日。中间从12月10日到12月14日没有告警的原因，是黑客通过技术手段屏蔽了告警，让我不能立刻察觉，黑客趁机进行破坏。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
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
          <p className="mt-6 mb-10 break-all justify-cjk">
            这三张图片显示的是这一段时间的告警列表，告警原因是CPU占用超过90%。我的应对策略是每次用服务器快照进行还原系统。
          </p>
          <h3 className="mt-8 mb-4 break-all text-[21px] font-bold md:text-[25px]">
            三、真凶浮出水面
          </h3>
          <p className="my-4 mb-6 break-all justify-cjk">
            在2025年12月16日我调整了应对策略，将linux的新增的文件权限，默认设置为只读，不可编辑也不可执行，这样，那些新增的病毒文件执行不了，CPU也就不会飙升。于是在12月17日，真凶浮出水面。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
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
          </div>
          <p className="mt-6 mb-10 break-all justify-cjk">
            这两张图片显示，黑客在2025年12月17日一天时间，对我的服务器攻击了50次左右，从早上6点多持续到晚上11点多。攻击内容大致为可疑操作，系统后门，和敏感文件篡改。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
            <Image
              src={imageData[6].url}
              alt={imageData[6].title}
              className="m-auto"
              width={imageData[6].width}
              height={imageData[6].height}
              onClick={() => openDialogMobileFun(6)}
            />
          </div>
          <p className="mt-6 mb-10 break-all justify-cjk">
            这张图显示黑客正在用wget或者curl来下载脚本到我的网站服务器上。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
            <Image
              src={imageData[7].url}
              alt={imageData[7].title}
              className="m-auto"
              width={imageData[7].width}
              height={imageData[7].height}
              onClick={() => openDialogMobileFun(7)}
            />
          </div>
          <p className="mt-6 mb-10 break-all justify-cjk">
            这张图显示“chmod 777”, 看到没？缺德不？黑客正在将脚本的权限改为777，也就是完全控制权限，可读可写可执行，意图强制运行脚本。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
            <Image
              src={imageData[8].url}
              alt={imageData[8].title}
              className="m-auto"
              width={imageData[8].width}
              height={imageData[8].height}
              onClick={() => openDialogMobileFun(8)}
            />
          </div>
          <p className="mt-6 mb-10 break-all justify-cjk">
            这张图显示，黑客正在将他的操作改为不记录系统日志，让我无法察觉。
          </p>
          <div className="grid grid-cols-1 gap-6 w-full box-border">
            <Image
              src={imageData[9].url}
              alt={imageData[9].title}
              className="m-auto"
              width={imageData[9].width}
              height={imageData[9].height}
              onClick={() => openDialogMobileFun(9)}
            />
          </div>
          <p className="mt-6 mb-10 break-all justify-cjk">
            这张图显示“/etc/shadow”, 看到没？黑客正在修改我的linux系统负责存储密码的文件，意图拿到我网站服务器的密码，完全控制我的网站服务器。
          </p>
          <h3 className="mt-8 mb-4 break-all text-[21px] font-bold md:text-[25px]">
            四、事件的解决
          </h3>
          <p className="my-4 break-all justify-cjk">
            最后，我加强了安全防护。第一、禁用wget、curl，禁止下载脚本，到我的网站服务器中执行。第二、禁用chmod、chown，禁止修改文件权限和系统配置文件。从2025年12月18日开始，网站一切恢复正常。现在的网站是十分可靠的。
          </p>
          <h3 className="mt-8 mb-4 break-all text-[21px] font-bold md:text-[25px]">
            五、王思宇的目的
          </h3>
          <p className="my-4 break-all justify-cjk">
            从这个事件来看，王思宇与黑客早有勾结，这次奇袭也是出乎意料的，可见王思宇的重视程度。我2025年11月18日上线的是静态网页，随着我将静态网页改为动态网页的过程中，被黑客抓到了机会，对我网站服务器进行了攻击，这名黑客并不是菜鸟，水平挺高，我与他斗争的过程中，废了很大劲才得以解决。王思宇的目的，一是瘫痪我网站服务器，二是篡改我网页的内容，三是通过网站服务器入侵我的个人电脑，盗取我的手机号、照片、家庭住址，网络账号密码，四是用木马对我个人电脑进行监控。
            最后事件已经结束了，期待我的网站服务器能够稳定运行。王思宇又开始了新的计谋，通过对我进行诱导，然后恶意投诉，让官方封禁我的网站，希望大家支持我，给予我帮助，不要让他的计谋得逞。
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
