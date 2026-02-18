"use client"

import Lottie from "lottie-react"
import animationData from "@/app/wolf.json"

export default function LottieArea() {
  return <Lottie
    animationData={animationData}
    loop
    autoplay
    className=""
  />
}