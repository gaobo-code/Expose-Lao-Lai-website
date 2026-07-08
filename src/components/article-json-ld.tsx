type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  authorName?: string;
};

export default function ArticleJsonLd({
  title,
  description,
  path
}: ArticleJsonLdProps) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: ["https://llwsydgs.com/opengraph-image.png"],
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      name: "高勃",
    },
    publisher: {
      "@type": "Organization",
      name: "老赖王思宇的故事",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": path,
    },
    path: path
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
