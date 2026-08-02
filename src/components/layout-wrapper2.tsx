import Header from "./header";
import Content2 from "./content2";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const LayoutWrapper2 = ({ children }: Props) => { 
  return (
    <>
      <Header />
      <Content2>
        <div className="w-full flex flex-col items-center">
          <main className="w-full flex flex-col items-center min-h-[calc(100svh-var(--spacing)*14)] b:min-h-[calc(100svh-var(--spacing)*17)]">
            {children}
          </main>
        </div>
      </Content2>
    </>
  );
};

export default LayoutWrapper2;
