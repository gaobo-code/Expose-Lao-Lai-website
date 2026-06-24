import LeftDesktopArea from './left-desktop-area';
import TopDesktopArea from "./top-desktop-area";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen bg-background overflow-hidden flex">
      <LeftDesktopArea />
      <div className="h-full w-[calc(100%-var(--spacing)*60))]">
        <TopDesktopArea />
        <div className="w-full h-[calc(100%-var(--spacing)*12))] overflow-x-hidden overflow-y-auto p-5 box-border">{children}</div>
      </div>
    </main>
  );
}
