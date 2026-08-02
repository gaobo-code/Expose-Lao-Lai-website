import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllRelatives, getRelativeBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { ArticleBody } from "@/components/article-body";
import { ArticleHeader } from "@/components/article-header";
import { ArticleComic } from "@/components/article-comic";
import { ArticleReplies } from "@/components/article-replies";
import { ArticleActions } from "@/components/article-actions";
import DesktopGroupArea from "../../desktop-group-area";
import MobileGroupArea from "../../mobile-group-area";

type Params = { params: Promise<{ slug: string }> };

export default async function Relative({ params: paramsPromise }: Params) {
  const { slug } = await paramsPromise;
  const post = getRelativeBySlug(slug);
  if (!post) notFound();

  const content = await markdownToHtml(post.content || "");
  const relatives = getAllRelatives();
  const index = relatives.findIndex((item) => item.slug === post.slug);
  const caseNumber = String(index + 1).padStart(2, "0");
  const previousHref = index > 0 ? `/all/relative/${relatives[index - 1].slug}` : undefined;
  const nextHref = index < relatives.length - 1 ? `/all/relative/${relatives[index + 1].slug}` : undefined;

  return (
    <>
      <ArticleHeader title={post.title} type={2} caseNumber={caseNumber} backHref="/all/relative" />
      <ArticleComic type={2} slug={post.slug} comicCount={post.comicCount} />
      <ArticleBody content={content} type={2} />
      <div data-jump-target="group" className="mt-5 hidden b:block">
        <DesktopGroupArea variant="relative" />
      </div>
      <div data-jump-target="group" className="mt-4 block b:hidden">
        <MobileGroupArea variant="relative" />
      </div>
      <ArticleActions
        archiveHref="/all/relative"
        previousHref={previousHref}
        nextHref={nextHref}
        type={2}
      />
      <ArticleReplies replies={post.replies} type={2} />
    </>
  );
}

export async function generateMetadata({ params: paramsPromise }: Params): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const post = getRelativeBySlug(slug);
  if (!post) notFound();

  return {
    title: post.title,
    alternates: { canonical: `https://llwsydgs.com/all/relative/${slug}` },
    openGraph: { title: post.title, url: `https://llwsydgs.com/all/relative/${slug}` },
    twitter: { title: post.title },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      }
    }
  };
}

export function generateStaticParams() {
  return getAllRelatives().map((relative) => ({ slug: relative.slug }));
}
