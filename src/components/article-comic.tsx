import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

type Props = { type: 1 | 2; slug: string; comicCount: number };

const comicBlurDataURL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Cdefs%3E%3CradialGradient id='a' cx='22%25' cy='18%25' r='82%25'%3E%3Cstop stop-color='%23363b48'/%3E%3Cstop offset='.52' stop-color='%231b1d25'/%3E%3Cstop offset='1' stop-color='%230b0c10'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='88%25' cy='82%25' r='62%25'%3E%3Cstop stop-color='%23503b4c' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%23503b4c' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='32' height='20' fill='url(%23a)'/%3E%3Crect width='32' height='20' fill='url(%23b)'/%3E%3C/svg%3E";

function getImageDimensions(category: string, slug: string, filename: string) {
  const imagePath = path.join(process.cwd(), "public", "all", category, slug, filename);
  const image = readFileSync(imagePath);
  const format = image.toString("ascii", 12, 16);

  if (format === "VP8X") {
    return { width: image.readUIntLE(24, 3) + 1, height: image.readUIntLE(27, 3) + 1 };
  }

  if (format === "VP8L" && image[20] === 0x2f) {
    return {
      width: 1 + image[21] + ((image[22] & 0x3f) << 8),
      height: 1 + ((image[22] & 0xc0) >> 6) + (image[23] << 2) + ((image[24] & 0x0f) << 10),
    };
  }

  throw new Error(`Unsupported WebP image: ${imagePath}`);
}

export function ArticleComic({ type, slug, comicCount }: Props) {
  const category = type === 1 ? "company" : "relative";
  const base = `/all/${category}/${encodeURIComponent(slug)}`;
  const desktopSize = getImageDimensions(category, slug, "desktop.webp");

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_80px_rgba(0,0,0,.45)] b:rounded-3xl" aria-label="档案图像记录">
      <Image src={`${base}/desktop.webp`} alt="" {...desktopSize} priority placeholder="blur" blurDataURL={comicBlurDataURL} sizes="100vw" className="hidden h-auto w-full b:block" />
      <div className="b:hidden">
        {Array.from({ length: comicCount }, (_, index) => {
          const number = String(index + 1).padStart(2, "0");
          const filename = `mobile_${number}.webp`;
          const size = getImageDimensions(category, slug, filename);
          return <Image key={number} src={`${base}/${filename}`} alt="" {...size} priority={index < 4} placeholder="blur" blurDataURL={comicBlurDataURL} sizes="(max-width: 616px) 100vw, 616px" className="mx-auto block h-auto w-full max-w-[616px]" />;
        })}
      </div>
    </section>
  );
}
