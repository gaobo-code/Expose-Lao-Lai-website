"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ColorTextArea from "./color-text-area";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Props = {
    children?: React.ReactNode;
};

export default function ArticleWrapper({ children }: Props) {

    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        const articleColor = sessionStorage.getItem("articleColor");
        if (articleColor) {
            setColor(articleColor);
        } else {
            setColor('normal');
        }

    }, []);

    if (!color) {
        return <div className="w-full h-[calc(100svh-var(--spacing)*14)] b:h-[calc(100svh-var(--spacing)*17)]">
        </div> 
    }

    return (
        <>
            <div className={clsx('w-full h-14 flex justify-between items-center')}>
                <Link href="/article" aria-label="文章" className={clsx('h-full flex items-center b:hover:text-secondmaincolor dark:b:hover:text-maincolor relative -left-2.5', color === 'text1' && "text-text1", color === 'text2' && "text-text2", color === 'text3' && "text-text3", color === 'text4' && "text-text4")}>
                    <ChevronLeftIcon className="size-7" />
                    <span className="text-[19px] font-bold">返回文章列表</span>
                </Link>
                <ColorTextArea setColor={setColor}></ColorTextArea>
            </div>
            <div className={clsx('w-full pt-5 pb-10 b:pt-10 b:pb-10 tracking-wider b:tracking-widest', color === 'text1' && "text-text1", color === 'text2' && "text-text2", color === 'text3' && "text-text3", color === 'text4' && "text-text4")}>
                {children}
            </div>
        </>
    )
}