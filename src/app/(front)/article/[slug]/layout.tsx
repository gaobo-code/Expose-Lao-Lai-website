import ArticleLayoutShell from "../article-layout-shell";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleLayoutShell>{children}</ArticleLayoutShell>;
}
