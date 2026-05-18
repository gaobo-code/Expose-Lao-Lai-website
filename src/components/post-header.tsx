type Props = {
  title: string;
};

export function PostHeader({ title }: Props) {
  return (
    <>
      <div className="w-full text-[28px] sm:text-[32px] b:text-[36px] pb-4 b:pb-8 font-bold text-left b:text-center">{title}</div>
    </>
  );
}
