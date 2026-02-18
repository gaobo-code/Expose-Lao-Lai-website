import { CloudIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import AnimatedNumbers from "@/components/animated-number";
import { guansi, tianyanchafengxian, aiqichasifa, gerenzhixing, gongsizhixing } from "@/lib/constants"

export default function ActiveChart() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 b:gap-6 lg:gap-8 xl:gap-12 w-full b:px-5 box-border">
            <div className="flex flex-col items-center justify-center py-[12px] lg:py-[16px] xl:py-[24px] box-border rounded-[12px] bg-[#f2f2f2] dark:bg-artilebackground hover:shadow-xl hover:scale-103 transition-all duration-600 ease-out dark:opacity-90">
                <CloudIcon className="size-7 lg:size-8 xl:size-10 text-maincolor mb-1 lg:mb-2 xl:mb-4" />
                <span className="normal-font text-[36px] lg:text-[44px] xl:text-[52px] font-black  tracking-wide leading-none mb-1 lg:mb-2 [transform:scaleY(0.9)]">
                    <AnimatedNumbers number={tianyanchafengxian}></AnimatedNumbers>
                </span>
                <span className="text-base lg:text-lg font-medium">
                    天眼查风险
                </span>
            </div>
            <div className="flex flex-col items-center justify-center py-[12px] lg:py-[16px] xl:py-[24px] box-border rounded-[12px] bg-[#f2f2f2] dark:bg-artilebackground hover:shadow-xl hover:scale-103 transition-all duration-600 ease-out dark:opacity-90">
                <LockClosedIcon className="size-7 lg:size-8 xl:size-10 text-maincolor mb-1 lg:mb-2 xl:mb-4" />
                <span className="normal-font text-[36px] lg:text-[44px] xl:text-[52px] font-black  tracking-wide leading-none mb-1 lg:mb-2 [transform:scaleY(0.9)]">
                    <AnimatedNumbers number={aiqichasifa}></AnimatedNumbers>
                </span>
                <span className="text-base lg:text-lg font-medium">
                    爱企查司法案件
                </span>
            </div>
            <div className="flex flex-col items-center justify-center py-[12px] lg:py-[16px] xl:py-[24px] box-border rounded-[12px] bg-[#f2f2f2] dark:bg-artilebackground hover:shadow-xl hover:scale-103 transition-all duration-600 ease-out dark:opacity-90">
                <ExclamationCircleIcon className="size-7 lg:size-8 xl:size-10 text-maincolor mb-1 lg:mb-2 xl:mb-4" />
                <span className="normal-font text-[36px] lg:text-[44px] xl:text-[52px] font-black  tracking-wide leading-none mb-1 lg:mb-2 [transform:scaleY(0.9)]">
                    <AnimatedNumbers number={gerenzhixing}></AnimatedNumbers>
                </span>
                <span className="text-base lg:text-lg font-medium">
                    个人执行失败案件
                </span>
            </div>
            <div className="flex flex-col items-center justify-center py-[12px] lg:py-[16px] xl:py-[24px] box-border rounded-[12px] bg-[#f2f2f2] dark:bg-artilebackground hover:shadow-xl hover:scale-103 transition-all duration-600 ease-out dark:opacity-90">
                <ExclamationTriangleIcon className="size-7 lg:size-8 xl:size-10 text-maincolor mb-1 lg:mb-2 xl:mb-4" />
                <span className="normal-font text-[36px] lg:text-[44px] xl:text-[52px] font-black  tracking-wide leading-none mb-1 lg:mb-2 [transform:scaleY(0.9)]">
                    <AnimatedNumbers number={gongsizhixing}></AnimatedNumbers>
                </span>
                <span className="text-base lg:text-lg font-medium">
                    公司执行失败案件
                </span>
            </div>
        </div>

    );
}    