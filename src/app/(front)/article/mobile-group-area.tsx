import { getDigitMap } from "@/lib/utils"
import { groupData } from "@/lib/data"

export default async function MobileGroupArea() {
    
    return (
        <>
            <section className="w-full xl:w-320 bg-articlebackground mb-3 b:mb-5 b:rounded-lg b:shadow-[0_7px_18px_rgba(24,39,75,0.05),0_2px_6px_rgba(24,39,75,0.035)] dark:b:shadow-[0_7px_18px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)] b:border b:border-[#F1F3F5] dark:b:border-[#424A58] text-base tracking-[0.15em] px-4 sm:px-8 b:px-12 py-3 box-border animated-text break-words">
                <span>欢迎加入官方QQ群：</span><br />{groupData.map((item, index) => (<span key={index}><span className="mr-0.5" dangerouslySetInnerHTML={{ __html: getDigitMap(index) }} /><span>{item.groupname}</span>（<span>{item.groupnumber}</span>）<br /></span>))}<span>第一时间获取网站最新动态，欢迎参与讨论，关于老赖王思宇的精彩言论，将同步发布在网站评论区。</span>
            </section>
        </>
    )
}
