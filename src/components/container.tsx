type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="w-8/10 min-w-sm mx-auto">{children}</div>;
};

export default Container;
