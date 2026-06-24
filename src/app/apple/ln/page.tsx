import { LnForm } from "./ln-form";
import { Suspense } from "react";

export default function AdminLn() {
  return (
    <main className="w-screen h-svh bg-secondbackground flex justify-center items-center">
      <div className="w-full max-w-md space-y-8 p-4 relative -top-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wider">网站后台</h1>
          <p className="mt-3 text-md">
            曝光老赖，人人有责，共同建立诚信社会！
          </p>
        </div>

        <div className="mt-8 shadow-md rounded-lg p-6 bg-areabackground">
          <Suspense fallback={<div className="max-w-md h-116.5 flex justify-center items-center"></div>}>
            <LnForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}


