export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-200">
      <div className="flex flex-col items-center gap-6">
        
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-slate-600 dark:text-slate-100 border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-slate-600 dark:text-slate-100 text-sm tracking-widest animate-pulse">
          LOADING
        </p>

      </div>
    </div>
  )
}
