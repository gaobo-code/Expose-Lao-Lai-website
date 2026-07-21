import { Article, WithContext } from 'schema-dts'

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
};

export default function ArticleJsonLd({
  title,
  description,
  path,
  image = "https://llwsydgs.com/opengraph-image.png",
  datePublished,
  dateModified,
  authorName = "高勃",
}: ArticleJsonLdProps) {

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: [image],
    inLanguage: "zh-CN",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "老赖王思宇的故事",
      logo: {
        "@type": "ImageObject",
        url: "https://llwsydgs.com/web-app-manifest-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": path,
    },
    url: path,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
