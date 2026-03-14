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
    url: "/heike11.webp",
    title: "黑客第十一张图片",
    description:
      "",
    width: 1184,
    height: 842,
  },
  {
    url: "/heike12.webp",
    title: "黑客第十二张图片",
    description:
      "",
    width: 1184,
    height: 691,
  },
  {
    url: "/heike13.webp",
    title: "黑客第十三张图片",
    description:
      "",
    width: 500,
    height: 1106,
  },
  {
    url: "/heike14.webp",
    title: "黑客第十四张图片",
    description:
      "",
    width: 1184,
    height: 779,
  }
];

export default function Heike2() {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // // On the phone, after clicking on the image, enter the carousel of the image
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
        <PostHeader title="与黑客的第二次交锋" />
        <div className="mx-auto text-[19px] leading-relaxed">
          <p className="my-4 break-all justify-cjk">
            《王思宇派黑客奇袭我网站服务器全程》这篇文章，是我与黑客的第一次交锋，是我取得了最后的胜利而告终。那篇文章，我不是将chmod和chown给禁用了吗，导致黑客无法在我禁用之后下手，所以黑客想在我禁用之前下手，也就是在我部署项目的过程中下手，因为部署项目的最后一步才是禁用chmod和chown。那天是晚上11点，我在部署项目，被黑客入侵了，恶意修改了系统的配置文件，然后黑客以为成功了，睡觉去了。谁知，这些都被京东云监测到了，于是凌晨1点，我又重新部署了一遍，这次黑客在睡觉，所以我取得了成功，发布了1.0版本，黑客吃了这个亏，长了教训，所以不要在京东云留下任何的监测记录。
          </p>
          <p className="mt-4 mb-4 break-all justify-cjk">
            第一次交锋结束于2025年12月18日，从那以后，网站稳定运行了一个多月，我也不更新，也不操作服务器，一个静态网页，ssh端口（登录服务器的端口）一直是关闭状态，黑客无法下手。于是乎，王思宇团队想出了一个计策，迫使我必须操作服务器，部署项目，然后他们选择在这个时间点下手。
          </p>
          <div className="grid grid-cols-1 w-full box-border b:px-[5%]">
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
          <p className="mt-4 mb-4 break-all justify-cjk">
            什么计策呢？他们抓住了我犯的一个错误，就是红框处，沈阳衡源网络科技有限公司这块，原先我写的是一个超链接，就是点击之后，能跳转到沈阳衡源公司官网，然而这个公司官网，正是在王思宇的控制之中，有一天，他们将公司官网换成了黄色网站，并且带有恶意病毒。
          </p>
          <div className="grid grid-cols-1 w-full box-border b:px-[5%]">
            <Image
              src={imageData[1].url}
              alt={imageData[1].title}
              className="m-auto"
              width={imageData[1].width}
              height={imageData[1].height}
              onClick={() => openDialogMobileFun(1)}
            />
          </div>
          <p className="mt-4 mb-4 break-all justify-cjk">
            这个hywl0621.com，原先是衡源网络的官网，现在变成了春城，也就是说从我的网站，点击沈阳衡源网络科技有限公司，会跳转到这个春城。这是一个黄色网站，还带有恶意病毒，大家不要访问他，否则会立刻中毒。而且我也必须将这个链接从我的网站中移除掉，否则，我的网站也受到了牵连，也违法了。
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
          <p className="mt-4 mb-4 break-all justify-cjk">
            京东云在2026年1月25日给我发了邮件通知，说的就是这个有害信息暗链问题，限制我24小时内清理完毕，否则查封我的网站，所以我必须得在24小时之内操作我的服务器，部署项目，这就是王思宇团队创造出来的机会，也就迎来了我与黑客的第二次交锋。实际上，黑客已经在24小时监视我的服务器了，为的就是等待这个机会，当然黑客肯定有自动化工具用来监视，一有动静就会通知黑客，黑客需要的是24小时待命，我想他们应该是一个黑客团队。他们有信心，因为他们有一个很强大的杀手锏。
          </p>
          <p className="my-4 break-all justify-cjk">
            我在接到京东云邮件通知的当天（1月25日），去掉了项目的暗链，于第二天（1月26日）凌晨4点起床，想来个突然袭击，但我也知道，这个时候，黑客一定也在。部署项目的流程是，首先是重新设置服务器密码，重装centos8操作系统，然后再部署项目。最后，总共花费了我半个小时，然后按照习惯查看了京东云监测记录，发现一切正常，以为大功告成，然后躺在床上休息。但是却没有睡觉，一直在玩手机，一个小时后，我发现我的项目内容已经被篡改，虽然只有短暂的一分钟时间，但却被我看到，这证明黑客已经攻破了我的服务器。
          </p>
          <div className="grid grid-cols-1 w-full box-border b:px-[5%]">
            <Image
              src={imageData[3].url}
              alt={imageData[3].title}
              className="m-auto"
              width={imageData[3].width}
              height={imageData[3].height}
              priority
              onClick={() => openDialogMobileFun(3)}
            />
          </div>
          <p className="my-4 break-all justify-cjk">
            我回顾了细节，到底哪里出了问题，我的项目全设置了只读属性，为什么黑客能够篡改, 这说明黑客已经拿到了服务器的完全控制权。我想到了有两个异常之处，第一，我重新设置了服务器的密码，为什么第一次登录的时候，输的是对的，却提示输入错误，第二次登录才能进入系统，第二，每次进入系统之前，如上图所示，一定是有一个192.168.2.2的内网用户抢先我一步登录。我想就是这两个异常现象导致的。
          </p>
          <p className="my-4 break-all justify-cjk">
            我最初的怀疑是，我的个人电脑中了木马导致的，输入的密码被盗取。于是，第三天（1月27日），凌晨3点多起来了，我特意找来了一个绝对干净的电脑。我试了4-5次都是一样，所以我排除了木马问题。然后我又尝试通过VNC的方式操作服务器，我的目的是在不开启ssh端口的方式操作服务器，看看行不行，结果还是一样。理论上，我通过VNC的方式操作服务器，ssh端口一直关闭，服务器的系统是全新的，我的个人电脑系统是全新的，项目文件都是只读属性，centos8的新增的文件也都是只读属性，chmod和chown已经被我禁用了，理论上不应该再出问题，所以说黑客一定有一个我想不到的强大的杀手锏。
          </p>
          <p className="my-4 break-all justify-cjk">
            对于192.168.2.2的问题，我认为是黑客潜伏在京东云中的另一台服务器上，通过内网，不需要输入服务器密码，就可以访问到我这台服务器，但是他平时访问是没用的，因为chmod和chown已经被我禁用了，他不能做啥，所以黑客必须在禁用之前，在我部署项目的过程中下手。所以他密切监视着这个时机，他的目的，就是不让我发布新版本。因为我以前的版本违法了，如果我发布不了新版本，就等于网站停滞了。
          </p>
          <p className="my-4 break-all justify-cjk">
            但是黑客也有疏漏，他们不可能24小时全神贯注，有一次，我突然将密码模式换成了密钥模式，去登录服务器，这次没有异常现象，于是我获得了成功，在2026年1月27日发布了2.0版本，王思宇团队气急败坏，在qq群中对我进行了辱骂。但是当我再次用密钥模式去登录服务器的时候，就又遇到一样的问题了。
          </p>
          <p className="my-4 break-all justify-cjk">
            因为2.0版本取得了成功，王思宇团队并不甘心，他们的企图是直接攻破我的京东云账号，拿到京东云账号的控制权，这样他们就无所不能了，他们能删除我的镜像备份，他们能彻底摧毁我的服务器，这样我的项目就报废了，我的努力也付之东流。我为什么这样说呢，因为我发现了端倪，因为我的京东云账号开启了MFA验证，就是说我每次登录都需要手机进行扫码，这在以前2个多月的时间内，一切都是正常的，但是2.0版本发布成功之后的几天，开始不正常了，有的时候不需要登录，直接就能进入京东云，这让我很头疼，我想这一定是黑客做了某些手脚。
          </p>
          <p className="my-4 break-all justify-cjk">
            总之，祝愿我的项目一切顺利，希望能发布3.0版本，网站再上一层楼。对于这名与我斗争的黑客，我也要有一个重新的认识，这名黑客的水平非常之高，远远超过了王思宇的雇佣能力，因为以王思宇的条件来说，能招到我这个段位的员工，对他来说，就是上天给予他的恩赐了。这名黑客与我的技术相比，我不得不承认，他比我强大100倍，有的时候，面对强大的力量，我也必须要认怂，但是他想把我的项目摧毁殆尽，让我的努力付之东流，我高勃决不答应，誓与你斗争到底！
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
