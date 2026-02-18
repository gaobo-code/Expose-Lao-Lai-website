import Image from "next/image";

type imageProps = {
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

type Props = {
  imageData: Array<imageProps>;
  openDialogMobileFun: (index: number) => void;
};

export default function MobileImageRender({
  imageData,
  openDialogMobileFun,
}: Props) {
  let imageRender: Array<React.ReactNode> = [];

  imageData.forEach((item, index) => {
    imageRender.push(
      <div
        key={index}
        className="flex flex-col items-center justify-center mb-12"
      >
        <Image
          src={item.url}
          alt={item.title}
          width={item.width}
          height={item.height}
          className="mb-4"
          {...(index === 0 ? { priority: true } : {})}
          onClick={() => openDialogMobileFun(index)}
        />
        <div className="max-w-[616px] text-lg  leading-[1.6] tracking-wider justify-cjk">
          {item.description}
        </div>
      </div>
    );
  });

  return (
    <section className="w-full flex flex-col items-center pt-10 pb-10 px-4 box-border">
      {imageRender}
    </section>
  );
}
