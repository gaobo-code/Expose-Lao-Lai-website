"use client";

type Props = {
    setColor: (color: string) => void;
};

export default function ColorTextArea({ setColor }: Props) {

    // change text color
    function changeTextColor(color: string) {
        setColor(color);
        sessionStorage.setItem("articleColor", color);
    }

    return (
        <div className="flex items-center">
            <div className="w-4.5 h-4.5 bg-foreground cursor-pointer" title="改变字体颜色" onClick={()=>changeTextColor('normal')}></div>
            <div className="w-4.5 h-4.5 bg-text1 ml-2 cursor-pointer" title="改变字体颜色" onClick={()=>changeTextColor('text1')}></div>
            <div className="w-4.5 h-4.5 bg-text2 ml-2 cursor-pointer" title="改变字体颜色" onClick={()=>changeTextColor('text2')}></div>
            <div className="w-4.5 h-4.5 bg-text3 ml-2 cursor-pointer" title="改变字体颜色" onClick={()=>changeTextColor('text3')}></div>
            <div className="w-4.5 h-4.5 bg-text4 ml-2 cursor-pointer" title="改变字体颜色" onClick={()=>changeTextColor('text4')}></div>
        </div>
    )
}