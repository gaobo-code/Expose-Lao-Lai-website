"use client";

import { useEffect } from "react";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fade = cssTransition({
  enter: "fadeIn",
  exit: "fadeOut"
});

// When the user accesses the project for the first time, a prompt message pops up
export default function GlobalToast() {
  useEffect(() => {
    // 只在第一次访问全站弹窗
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      toast("本网站分为首页、文章、图片、视频四个板块，记载的是真人真事，我愿意为本网站的内容承担法律责任。本网站的图片和视频均取材自网络的公开数据，不涉及任何侵权。", {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        className: '!pt-3 !px-4 !pb-4 !box-border b:!w-[500px] b:!rounded-xs !text-gray-800 !normal-font',
        transition: Fade, // 使用 fade 动画
      });
      localStorage.setItem("hasVisited", "true");
    }

    const hasVisitedSession = sessionStorage.getItem("hasVisitedSession");
    if (!hasVisitedSession) {
      setTimeout(() => {
        sessionStorage.setItem("hasVisitedSession", "true");
      }, 500);
    }

  }, []);

  return <ToastContainer className="justify-cjk" />;
}
