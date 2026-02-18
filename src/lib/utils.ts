import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MouseEventHandler } from "react";
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Copy link function
export const copyLinkFun: MouseEventHandler<SVGSVGElement> = (event) => {
  const url = window.location.href; // Get the current URL

  // Try using Clipboard API first (modern browsers)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('复制链接成功');
    }).catch((err) => {
      toast.error('复制链接失败');
    });
  }
  // Fallback to document.execCommand (for older browsers and mobile)
  else {
    const textArea = document.createElement('textarea');
    textArea.value = url; // Set the value to the current URL
    document.body.appendChild(textArea);
    textArea.select(); // Select the text
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('复制链接成功');
      } else {
        toast.error('复制链接失败');
      }
    } catch (err) {
      toast.error('复制链接失败');
    }
    document.body.removeChild(textArea); // Clean up
  }
}

