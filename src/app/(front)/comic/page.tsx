
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";

export default function ComicPage() {
  
  return (
    <div className="w-screen">
      <div className="hidden b:block w-full">
          <DesktopPage />
      </div>
      <div className="block b:hidden w-full">
          <MobilePage />
      </div>
    </div>
  );
}
