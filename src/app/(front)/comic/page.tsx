
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";
import { connection } from 'next/server'
import { Config } from '@/db/schema';
import { getConfig } from "@/db/queries"
import { Ban } from "lucide-react";

export default async function ComicPage() {
  await connection();

  const config: Config[] = await getConfig();
  const temp = config.find(u => u.attr === "comicState");
  let comicFlag = false;
  if (temp && temp.value !== "0") comicFlag = true;

  return (
    <div className="w-screen">
      <div className="hidden b:block w-full">
        {!comicFlag
          ? <DesktopPage />
          : <section className="flex w-full flex-col items-center justify-center min-h-[calc(100svh-var(--spacing)*33)]">
            <div className="flex flex-col items-center pb-20 box-border text-[17px]">
              <Ban size={64} strokeWidth={1} className="text-maincolor" />
              <div className="mt-3 text-maincolor font-semibold tracking-wider text-center leading-relaxed">由于内容限制<br />完整漫画已发布于官方QQ群<br />欢迎前往查看</div>
            </div>
          </section>
        }
      </div>
      <div className="block b:hidden w-full">
        {!comicFlag
          ? <MobilePage />
          : <section className="flex w-full flex-col items-center justify-center min-h-[calc(100svh-var(--spacing)*14)]">
            <div className="flex flex-col items-center pb-20 box-border text-[17px]">
              <Ban size={64} strokeWidth={1} className="text-maincolor" />
              <div className="mt-3 text-maincolor font-semibold tracking-wider text-center leading-relaxed">由于内容限制<br />完整漫画已发布于官方QQ群<br />欢迎前往查看</div>
            </div>
          </section>
        }
      </div>
    </div>
  );
}
