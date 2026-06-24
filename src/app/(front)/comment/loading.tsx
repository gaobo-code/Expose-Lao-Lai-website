import LottieArea from '@/components/lottie-area'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-background z-200">
            <div className="absolute top-47/100 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">

                <div className="w-50 h-50 b:w-60 b:h-60">
                    <LottieArea></LottieArea>
                </div>

                {/* Spinner */}
                {/* <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-slate-600 border-t-transparent animate-spin"></div>
                </div> */}

                {/* Text */}
                <p className="text-slate-600 dark:text-slate-100 text-sm tracking-widest animate-pulse">
                    LOADING
                </p>

            </div>
        </div>
    )
}
