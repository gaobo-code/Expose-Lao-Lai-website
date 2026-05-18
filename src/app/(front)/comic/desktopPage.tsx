import Image from "next/image";

export const imageData = [
  {
    url: "/comic/hengyuan_desktop.webp",
    title: "《沈阳衡源网络科技的真相》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/laolai_desktop.webp",
    title: "《老赖王思宇的骗术一览》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/ma_desktop.webp",
    title: "《甄世昊的“指鹿为马”》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/fuchong_desktop.webp",
    title: "《老赖王思宇的“服从性测试”》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/jiangxue_desktop.webp",
    title: "《老赖王思宇与漂亮女程序员姜雪的故事》漫画",
    width: 1496,
    height: 968,
  },
  {
    url: "/comic/heike_desktop.webp",
    title: "《王思宇派黑客奇袭我网站服务器全程》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/jiaofeng_desktop.webp",
    title: "《与黑客的第二次交锋》漫画",
    width: 1496,
    height: 997,
  },
  {
    url: "/comic/hairen_desktop.webp",
    title: "《QQ群的骇人言论》漫画",
    width: 1496,
    height: 997,
  },
];

export default function DesktopPage() {
  const titleClassName =
    "mb-6 flex max-w-full min-w-0 items-center justify-center border-y border-zinc-300/80 bg-zinc-50/70 px-7 py-2 text-center text-[22px] font-semibold leading-[1.57] tracking-widest text-zinc-800 md:text-[28px] dark:border-zinc-600/80 dark:bg-zinc-800/50 dark:text-zinc-300";

  return (
    <div className="w-full flex flex-col items-center">
      <section className="box-border flex flex-col items-center px-5 py-12 w-full 2xl:w-384 min-h-[calc(100svh-var(--spacing)*33)]">
        {imageData.map((item, index) => (
          <div
            key={item.url}
            className={index === imageData.length - 1 ? "flex w-full flex-col items-center" : "mb-4 flex w-full flex-col items-center"}
          >
            <h2 className={titleClassName}>{item.title}</h2>
            <Image
              src={item.url}
              alt={item.title}
              width={item.width}
              height={item.height}
              className={index === imageData.length - 1 ? "mb-2" : "mb-12"}
              priority={index === 0}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
