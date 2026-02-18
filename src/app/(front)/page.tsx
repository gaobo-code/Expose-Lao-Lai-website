import Image from "next/image";
import ImageArea from "./image-area";
import ActiveChart from "./active-chart";
import { guansi,gerenzhixing,gongsizhixing } from "@/lib/constants"

// Calculate age based on date of birth
function calculateAge(birthDate:string) {
    // Convert birthDate to a Date object
    const birth = new Date(birthDate);
    const today = new Date();

    // Calculate age by subtracting birth year from current year
    let age = today.getFullYear() - birth.getFullYear();

    // Check if birthday has passed this year, and adjust age accordingly
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--; // Birthday hasn't occurred yet this year, subtract 1
    }

    return age;
}

export default function Home() {

  let age = calculateAge("1986-06-06");

  return (
    <>
      <section className="w-full xl:w-320 flex flex-col items-center pt-15 pb-22 px-4 sm:px-8 box-border">
        <div className="relative mb-13 normal-font">
          <h1 className="text-6xl sm:text-7xl b:text-8xl font-extrabold opacity-40 dark:opacity-8 text-outline uppercase leading-[1.3] tracking-widest">
            LaoLai
          </h1>

          <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-[27px] sm:text-[29px] b:text-[35px] b:text-4xl font-semibold leading-[1.6] text-hometitle tracking-wider">
              关于老赖
            </h1>
            <div className="h-[3px] w-[60px] bg-maincolor"></div>
          </div>
        </div>
        <div className="w-full flex flex-col b:flex-row mb-13">
          <div className="b:flex-5 @container mb-8 b:mb-0">
            <div className="b:ml-[4%] b:mr-[5%] b:h-full @a:rounded-[10px] @a:border-[12px] @a:border-solid @a:border-[#f2f2f2] dark:@a:border-[#303641]">
              <Image
                src="/wangsiyu.webp"
                alt="老赖王思宇年轻时的照片"
                className="m-auto"
                width={370}
                height={492}
                priority
              />
            </div>
          </div>
          <div className="b:flex-7 b:px-4 box-border tracking-wider b:tracking-widest">
            <div className="mb-5">
              <div className="text-[17px] font-bold text-secondmaincolor dark:text-maincolor mb-2">
                个人信息
              </div>
              <div className="text-[19px] leading-[1.6] break-all justify-cjk">
                <span>姓名：</span>
                <span className="mr-6 font-bold">王思宇</span>
                <span>年龄：</span>
                <span className="mr-6 font-bold">{age}岁</span>
                <span>地理位置：</span>
                <span className="mr-6 font-bold">沈阳市</span>
                <span>出生地：</span>
                <span className="mr-6 font-bold">哈尔滨市依兰县</span>
                <span>身份证号：</span>
                <span className="font-bold">2301231986****317X</span>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-[17px] font-bold text-secondmaincolor dark:text-maincolor mb-2">
                所属公司
              </div>
              <div className="text-[19px] leading-[1.6] justify-cjk">
                辽宁志在远方网络科技有限公司（老板）、大连火石致远科技有限公司（老板）、沈阳高创网络科技有限公司（最大股东）、
                <span
                  className="font-bold"
                >
                  沈阳衡源网络科技有限公司
                </span>
                （实际控制人）
              </div>
            </div>
            <div className="">
              <div className="text-[17px] font-bold text-secondmaincolor dark:text-maincolor mb-2">
                主要事迹
              </div>
              <div className="text-[0]  leading-[1.6] justify-cjk">
                <span className="text-[19px]">
                  王思宇于2020年成立了辽宁志在远方网络科技有限公司，这是一家以软件开发和软件外包为服务的公司，员工人数最多时达到50人，然而
                </span>
                <span className="text-[19px]">
                  他从一开始就没有打算认真的把这家公司经营好。对待员工，他使用暴力、罚款、骗术来管理，不尊重技术人员，奴隶化盛行，后期大肆欠薪，十分嚣张。
                </span>
                <span className="text-[19px]">
                  对待客户，他拿到项目定金之后，故意违背约定，按照简化版，或者直接按照错误的需求去做，做出来的东西对客户完全没用，这导致客户非常的不满。
                </span>
                <span className="text-[19px]">
                  该公司实际运营2年多，被愤怒的员工和客户告上了法庭，2年之间吃了{guansi}个官司，名誉扫地。王思宇也在沈阳藏了起来，所有人都找不到他，
                </span>
                <span className="text-[19px]">
                  以此来躲避法院的强制执行。截至到目前，他在法院留下了22起无法执行的案件，公司和王思宇本人均以失信。王思宇于2023年6月被限制高消费，于2024年6月成为了老赖
                </span>
                <span className="text-[19px]">
                  ，他已经被禁止注册公司，然后他想着用他的同伙甄世昊（原辽宁志在远方网络科技的总经理）的名义去注册公司，成立了沈阳衡源网络科技有限公司，
                </span>
                <span className="text-[19px]">
                  这家公司实际上就是辽宁志在远方网络科技有限公司的换壳公司，依然采用的是原班人马。目前，王思宇本人和他的团队活跃在qq群、百度贴吧，
                </span>
                <span className="text-[19px]">
                  以软件开发、出售服务、出售源码的名义，毫无底线的骗钱，甚至连30多块钱都去骗，而并不提供相应的服务，被众多网友辱骂和谴责。据我对他的了解，
                </span>
                <span className="text-[19px]">
                  他是一个极其擅长骗术，编故事，策划阴谋诡计的人，他的文化程度虽然不高，但是他的骗术却很难让人识破，此外，他还具有很强的暴力倾向，特别会耍无赖。
                </span>
                <span className="text-[19px]">
                  我与他打交道的过程中，发现此人具有恐怖主义倾向，理论上，只有从监狱里出来的人才是这样一种行事做派。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic scrolling digital module */}
        <ActiveChart></ActiveChart>

      </section>

      <div className="w-screen flex justify-center bg-secondbackground">
        <section className="w-full xl:w-320 flex flex-col items-center pt-15 pb-23 px-4 sm:px-8 box-border">
          <div className="relative mb-13 normal-font">
            <h1 className="text-6xl sm:text-7xl b:text-8xl font-extrabold opacity-40 dark:opacity-8 text-outline uppercase leading-[1.3] tracking-normal">
              Evidence
            </h1>

            <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-[27px] sm:text-[29px] b:text-[35px] b:text-4xl font-semibold leading-[1.6] text-hometitle">
                证&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;据
              </h1>
              <div className="h-[3px] w-[60px] bg-maincolor"></div>
            </div>
          </div>
          <div className="w-full b:px-5 box-border mb-13 leading-[1.6] tracking-wider b:tracking-widest text-[0] justify-cjk">
            <span className="text-[19px]">
              下面的图片作为证据，它们的来源分别是&nbsp;
            </span>
            <a
              href="https://zxgk.court.gov.cn/" 
              className="font-bold underline text-[19px]"
              target="_blank"
            >
              公开执行网
            </a>
            <span className="text-[19px]">&nbsp;和&nbsp;</span>
            <a
              href="https://www.tianyancha.com/"
              className="font-bold underline text-[19px]"
              target="_blank"
            >
              天眼查APP
            </a>
            <span className="text-[19px]">
              &nbsp;。来自公开执行网的证据有{gongsizhixing}条，是员工和客户对于王思宇公司的财产申请了强制执行，最后没有执行到钱，由于法院起诉和执行有一个周期，
            </span>
            <span className="text-[19px]">
              王思宇提前转移了公司财产，或者资金流水没有经过公司账户，所以执行失败，最后结果是公司成为了失信被执行人，王思宇被限制了高消费。来自天眼查APP的证据有{gerenzhixing}条，是员工对于王思宇个人的
            </span>
            <span className="text-[19px]">
              财产申请了强制执行，最后没有执行到钱，他已将财产提前转移给了他的家人，他的名下（房产、银行卡、微信、支付宝）都没有钱，最后结果是王思宇成为了失信被执行人，也就是
            </span>
            <span className="text-[19px]">
              “老赖”。以上并不包括赢了官司，没有申请强制执行的情况，也不包括在劳动局投诉，通过劳动局处理的案件，也不包括沈阳高创网络科技，因公司提前注销，导致员工无法起诉和执行的案件，这三种情况也有相当多的人数。
            </span>
          </div>

          {/* Image module */}
          <ImageArea></ImageArea>
        </section>
      </div>
    </>
  );
}
