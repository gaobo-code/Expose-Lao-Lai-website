import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCompanies, getCompanyBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { ArticleBody } from "@/components/article-body";
import { ArticleHeader } from "@/components/article-header";
import { ArticleComic } from "@/components/article-comic";
import { ArticleReplies } from "@/components/article-replies";
import { ArticleActions } from "@/components/article-actions";
import DesktopGroupArea from "../../desktop-group-area";
import MobileGroupArea from "../../mobile-group-area";

type Params = { params: Promise<{ slug: string }> };

export default async function Company({ params: paramsPromise }: Params) {
  const { slug } = await paramsPromise;
  const post = getCompanyBySlug(slug);
  if (!post) notFound();

  const content = await markdownToHtml(post.content || "");
  const companies = getAllCompanies();
  const index = companies.findIndex((item) => item.slug === post.slug);
  const caseNumber = String(index + 1).padStart(2, "0");
  const previousHref = index > 0 ? `/all/company/${companies[index - 1].slug}` : undefined;
  const nextHref = index < companies.length - 1 ? `/all/company/${companies[index + 1].slug}` : undefined;

  return (
    <>
      <ArticleHeader title={post.title} type={1} caseNumber={caseNumber} backHref="/all/company" />
      <ArticleComic type={1} slug={post.slug} comicCount={post.comicCount} />
      <ArticleBody content={content} type={1} />
      <div data-jump-target="group" className="mt-5 hidden b:block">
        <DesktopGroupArea variant="company" />
      </div>
      <div data-jump-target="group" className="mt-4 block b:hidden">
        <MobileGroupArea variant="company" />
      </div>
      <ArticleActions
        archiveHref="/all/company"
        previousHref={previousHref}
        nextHref={nextHref}
        type={1}
      />
      <ArticleReplies replies={post.replies} type={1} />
    </>
  );
}

export async function generateMetadata({ params: paramsPromise }: Params): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const post = getCompanyBySlug(slug);
  if (!post) notFound();

  return {
    title: post.title,
    alternates: { canonical: `https://llwsydgs.com/all/company/${slug}` },
    openGraph: { title: post.title, url: `https://llwsydgs.com/all/company/${slug}` },
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
  return getAllCompanies().map((company) => ({ slug: company.slug }));
}
