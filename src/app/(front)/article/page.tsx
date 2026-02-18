import { getAllPosts } from "@/lib/api";
import Link from "next/link";

const otherArray = [
  {
    key: 'heike',
    title: '王思宇派黑客奇袭我网站服务器全程',
    desc: '网站于2025年11月18日上线，在2025年12月初，王思宇竟然派黑客奇袭了我这个小网站，这是出乎意料的，可见王思宇的重视程度。'
  },
  {
    key: 'hairen',
    title: 'QQ群的骇人言论',
    desc: '有人在QQ群中说，曾经去缅北参加了培训，新学了一招，叫水牢，就是把人困在水里，然后放电，全方位的电。'
  },
  {
    key: 'heike2',
    title: '与黑客的第二次交锋',
    desc: '在与黑客第一次交锋胜利后，网站稳定运行了一个多月，王思宇团队不甘心，又想出了一个计策，迫使我与黑客进行了第二次交锋, 黑客亮出了他的杀手锏。'
  },
  {
    key: 'ouji',
    title: '骗子偶寄和其小号',
    desc: '本文是群友整理出来的，曝光了王思宇及其团队在QQ群骗人的过程。经我确认，偶寄就是王思宇，Dx是原辽宁志在远方网络科技的产品部领导。'
  }
];

export default function Article() {
  const allPosts = getAllPosts();

  return (
    <div className="w-full min-h-[calc(100svh-var(--spacing)*42)] b:min-h-[calc(100svh-var(--spacing)*33)] flex justify-center bg-thirdground">
      <section className="w-full h-full xl:w-320 flex flex-col items-center pt-10 pb-10 b:pt-15 b:pb-15 px-4 sm:px-8 box-border tracking-wider">
        <div className="grid grid-cols-1 b:grid-cols-2 gap-y-8 gap-x-11 w-full b:px-5 box-border">
          {allPosts.map((post) => (
            <Link href={`/article/${post.slug}`} key={post.slug}>
              <section className="flex flex-col p-4 box-border shadow-article rounded-lg bg-artilebackground h-48 cursor-pointer b:hover:translate-y-[-4px] transition-transform duration-400 ease-out border border-[#E9ECEF] dark:border-[#424A58]">
                <div className="border-b border-b-gray-300 text-xl b:text-[22px] leading-[1.3] font-semibold pb-1.5 text-gray-800 dark:text-hometitle b:hover:text-secondmaincolor dark:b:hover:text-maincolor transition-all duration-400 ease-out truncate">
                  {post.title}
                </div>
                <div className="text-base b:text-[17px] leading-[1.4] pt-2.5 line-clamp-5 break-all justify-cjk">
                  {post.excerpt}
                </div>
              </section>
            </Link>
          ))}

          {otherArray.map((post) => (
            <Link href={`/article/${post.key}`} key={post.key}>
              <section className="flex flex-col p-4 box-border shadow-article rounded-lg bg-artilebackground h-48 cursor-pointer b:hover:translate-y-[-4px] transition-transform duration-400 ease-out border border-[#E9ECEF] dark:border-[#424A58]">
                <div className="border-b border-b-gray-300 text-xl b:text-[22px] leading-[1.3] font-semibold pb-1.5 text-gray-800 dark:text-hometitle b:hover:text-secondmaincolor dark:b:hover:text-maincolor transition-all duration-400 ease-out truncate">
                  {post.title}
                </div>
                <div className="text-base b:text-[17px] leading-[1.4] pt-2.5 line-clamp-5 break-all justify-cjk">
                  {post.desc}
                </div>
              </section>
            </Link>
          ))}
         
        </div>
      </section>
    </div>
  );
}
