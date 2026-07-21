"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { LinkIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { copyLinkFun } from "@/lib/utils"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { articleRouter } from "@/lib/utils"
import clsx from "clsx";
import { toast } from "sonner"

gsap.registerPlugin(useGSAP, SplitText);

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function ButtonArea() {
    const [openindex, setOpenIndex] = useState(0);
    const container = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    const { contextSafe } = useGSAP({ scope: container });

    // The animation after clicking on the red heart
    const animateFun = contextSafe(() => {
        let split = SplitText.create(textRef.current, { type: "chars,words,lines" });

        gsap.set(textRef.current, { opacity: 1 });

        const tl = gsap.timeline();

        let number = randomInt(1, 2);

        if (number === 1) {
            tl.from(
                split.chars,
                {
                    x: 150,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power4",
                    stagger: 0.12
                })
                .to(
                    split.chars,
                    {
                        x: -150,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power4.in",
                        stagger: 0.12
                    },
                    "+=0.3"
                );

        } else {
            tl.from(
                split.chars,
                {
                    y: -100,
                    opacity: 0,
                    rotation: "random(-80, 80)",
                    duration: 0.7,
                    ease: "back",
                    stagger: 0.15
                })
                .to(
                    split.chars,
                    {
                        y: 300,
                        opacity: 0,
                        rotation: "random(-60, 60)",
                        duration: 2.1,
                        ease: "back",
                        stagger: 0.15
                    }, "+=0.3")

        }

    });

    let articleIndex = articleRouter.indexOf(pathname);

    const leftClickFun = () => {
        let index = articleRouter.indexOf(pathname);
        if (index < 0) return;
        if (index === 0) {
            toast.error('目前已是第一篇文章');
        } else {
            let url = articleRouter[index - 1];
            router.push(url);
        }
    }

    const rightClickFun = () => {
        let index = articleRouter.indexOf(pathname);
        if (index > articleRouter.length - 1) return;
        if (index === articleRouter.length - 1) {
            toast.error('目前已是最后一篇文章');
        } else {
            let url = articleRouter[index + 1];
            router.push(url);
        }
    }

    return (
        <div className="w-full flex items-center justify-between" ref={container}>
            <HoverCard openDelay={300} open={openindex === -1} onOpenChange={(open) => {
                if (open) {
                    setOpenIndex(-1);
                }

            }}>
                <HoverCardTrigger>
                    <ArrowLeftIcon onClick={leftClickFun} className={clsx("size-7 b:size-7 b:hover:scale-110 transition", articleIndex !== 0 ? "text-text1 cursor-pointer" : "text-gray-300 dark:text-gray-600")} />
                </HoverCardTrigger>

                <HoverCardContent side="top" align="start" sideOffset={9} alignOffset={-30} className="hover-card-content w-22 h-9">
                    <div>上一篇文章</div>
                </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={300} open={openindex === 0} onOpenChange={(open) => {
                if (open) {
                    setOpenIndex(0);
                }

            }}>
                <HoverCardTrigger>
                    <div onClick={animateFun}
                        className="text-red-500 text-2xl b:text-3xl cursor-pointer
         animate-pulse
         drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]
         hover:scale-110 transition flex items-center justify-center"
                    >
                        <Image
                            src="/media/heart.png"
                            alt="红心"
                            width={30}
                            height={30}
                            className=""

                        />

                    </div>
                </HoverCardTrigger>

                <HoverCardContent side="top" align="start" sideOffset={7} alignOffset={-37} className="hover-card-content w-26 h-9">
                    <div>快来点赞吧！</div>
                </HoverCardContent>

            </HoverCard>

            <HoverCard openDelay={300} open={openindex === 1} onOpenChange={(open) => {
                if (open) {
                    setOpenIndex(1);
                }

            }}>
                <HoverCardTrigger>
                    <LinkIcon onClick={copyLinkFun} className="size-6 b:size-7 b:hover:scale-110 transition text-maincolor dark:text-foreground cursor-pointer" />
                </HoverCardTrigger>

                <HoverCardContent side="top" align="start" sideOffset={9} alignOffset={-30} className="hover-card-content w-22 h-9">
                    <div>复制链接</div>
                </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={300} open={openindex === 2} onOpenChange={(open) => {
                if (open) {
                    setOpenIndex(2);
                }

            }}>
                <HoverCardTrigger>
                    <ArrowRightIcon onClick={rightClickFun} className={clsx("size-7 b:size-7 b:hover:scale-110 transition", articleIndex !== articleRouter.length - 1 ? "text-text3 cursor-pointer" : "text-gray-300 dark:text-gray-600")} />
                </HoverCardTrigger>

                <HoverCardContent side="top" align="start" sideOffset={9} alignOffset={-30} className="hover-card-content w-22 h-9">
                    <div>下一篇文章</div>
                </HoverCardContent>
            </HoverCard>

            <div className="popup-text" ref={textRef}>
                曝光老赖，人人有责
            </div>
        </div>
    )
}