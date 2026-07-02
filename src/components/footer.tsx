export function Footer() {
  return (
    <footer className="w-screen bg-background min-h-28 b:min-h-16 max-h-28 b:max-h-16 box-border flex items-center justify-center shadow-footer normal-font">
      <div className="w-full xl:w-320 flex flex-col b:flex-row items-center justify-around px-4 b:px-0 box-border">
        <span className="hidden b:block mb-2 b:mb-0 text-sm b:text-base">
          曝光老赖，人人有责，我愿意为本网站内容承担法律责任
        </span>
        <span className="block b:hidden mb-2 b:mb-0 text-sm b:text-base">
          曝光老赖，人人有责
        </span>
        <span className="block b:hidden mb-2 b:mb-0 text-sm b:text-base">
          我愿意为本网站内容承担法律责任
        </span>
        <span className="text-sm b:text-base hidden b:block">
          备案号：
          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            className="underline text-sm b:text-base"
            target="_blank"
          >
            辽ICP备2025068275号-1
          </a>
        </span>
        <span className="text-sm b:text-base block b:hidden">
          备案号：
           <a
            href="https://beian.miit.gov.cn/#/home"
            className="underline text-sm b:text-base"
            target="_blank"
          >
            辽ICP备2025068275号-1
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
