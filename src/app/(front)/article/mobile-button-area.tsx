"use client";

import { toast } from "sonner"
import { LinkIcon } from "@heroicons/react/24/solid";
import { copyLinkFun } from "@/lib/utils";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(useGSAP, SplitText);

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function MobileButtonArea() {

    const container = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

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
            // 只 set 一次，避免抖动
            gsap.set(split.lines, {
                transformOrigin: "50% 50% -160px",
                transformPerspective: 800,
                force3D: true,
                willChange: "transform, opacity"
            })

            const tl = gsap.timeline()

            // 入场
            tl.fromTo(
                split.lines,
                {
                    rotationX: -100,
                    opacity: 0
                },
                {
                    rotationX: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.25
                }
            )

                // 出场（最终 opacity: 0）
                .to(
                    split.lines,
                    {
                        rotationX: 80,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in",
                        stagger: 0.2
                    },
                    "+=0.3"
                )
        }

    });

    return (
        <div className="w-full flex items-center justify-between" ref={container}>
            <div onClick={animateFun}
                className="text-red-500 text-2xl b:text-3xl cursor-pointer
                     animate-pulse
                     drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]
                     hover:scale-110 transition flex items-center justify-center"
            >
                <Image
                    src="/heart.png"
                    alt="红心"
                    width={29}
                    height={29}
                    className=""

                />

            </div>

            <LinkIcon onClick={copyLinkFun} className="size-7 b:size-7 b:hover:scale-110 transition text-maincolor dark:text-foreground cursor-pointer" />
            <div className="popup-text-mobile" ref={textRef}>
                曝光老赖<br />
                人人有责
            </div>
        </div>
    )
}