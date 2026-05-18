import { guansi,zhizaiyuanfangtianyanchafengxian } from "@/lib/constants"
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";

export const imageData = [
  {
    url: "/zhenshihao.webp",
    title: "甄世昊的照片",
    description:
      "此人名叫甄世昊，是沈阳衡源网络科技有限公司的老板，是沈阳高创网络科技有限公司（已注销）的老板，是辽宁志在远方网络科技有限公司的总经理（二把手）。这个人形象挺好，对外揽活，接待客户，代替王思宇出席法庭诉讼。",
    width: 616,
    height: 770,
  },
  {
    url: "/hengyuan-building.webp",
    title: "沈阳衡源网络科技有限公司的办公地点",
    description:
      "此为沈阳衡源网络科技有限公司的办公地点，在街面上租了个门市房。法人是甄世昊。",
    width: 616,
    height: 348,
  },
  {
    url: "/haotianchui.webp",
    title: "甄世昊的法宝昊天锤",
    description:
      "此为甄世昊的宝物，昊天锤。据说甄世昊就是用它来指鹿为马的，谁不服，就用锤子锤他。",
    width: 616,
    height: 822,
  },
  {
    url: "/zhizaiyuanfang.webp",
    title: "辽宁志在远方网络科技有限公司的天眼查信息",
    description:
      `此为辽宁志在远方网络科技有限公司的天眼查信息。一个小公司，总共经营2年多，社保记录最多的时候是25人，搞出${zhizaiyuanfangtianyanchafengxian}个风险，可见有多么不学无术，正常像这种小公司，应该一个风险都没有。最后，大约一半的员工欠薪，另一半员工工资全额发放，以备换壳之用。`,
    width: 616,
    height: 1362,
  },
  {
    url: "/huoshizhiyuan.webp",
    title: "大连火石致远科技有限公司的天眼查信息",
    description:
      "此为大连火石致远科技有限公司的天眼查信息，也是王思宇的公司。王思宇两手准备，当辽宁志在远方网络科技有限公司名声臭了，就用大连火石致远科技有限公司来经营，来承接项目。",
    width: 616,
    height: 1362,
  },
  {
    url: "/gaochuang.webp",
    title: "沈阳高创网络科技有限公司的天眼查信息",
    description:
      "王思宇假借辽宁志在远方被boss直聘封禁，无法招聘，注册了沈阳高创网络科技。真实目的是将新招聘的员工归入到这家注册资本只有10万元的公司，也就意味着它最多承担10万元的责任。最后王思宇提前注销了公司，导致了很多被骗的员工无法对公司起诉和执行，所以法人甄世昊没有得到应有的惩罚。",
    width: 616,
    height: 1362,
  },
  {
    url: "/hengyuan.webp",
    title: "沈阳衡源网络科技有限公司的天眼查信息",
    description:
      "此为沈阳衡源网络科技有限公司的天眼查信息。当大连火石致远科技有限公司的名声也臭了之后，注册了这家公司。这是目前他们正在运营的公司。",
    width: 616,
    height: 1362,
  },
  {
    url: "/gongzuofu-front.webp",
    title: "工作服正面",
    description:
      "此为甄世昊指鹿为马，说的那个工作服，衣领上两个扣，少扣一个就罚款，据说是怕员工感冒，影响工作。",
    width: 616,
    height: 821,
  },
  {
    url: "/gongzuofu-back.webp",
    title: "工作服反面",
    description:
      `好一个远方志向，辽宁志在远方网络科技，2年${guansi}个官司，直接失信了，哪来什么远方？`,
    width: 616,
    height: 821,
  }
];

export default function ImageCom() {
  return (
    <div className="w-screen bg-thirdbackground">
      <div className="hidden b:block w-full b:h-[calc(100svh-var(--spacing)*33)]">
        <div className="w-full h-full flex flex-col items-center">
          <DesktopPage imageData={imageData} />
        </div>
      </div>
      <div className="block b:hidden w-full">
        <div className="w-full flex flex-col items-center">
          <MobilePage imageData={imageData} />
        </div>
      </div>
    </div>
  );
}
