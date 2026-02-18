import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => { 
  return (
    <>
      <Header />
      <Content>
        <div className="w-full flex flex-col items-center">
          <main className="w-full flex flex-col items-center min-h-[calc(100svh-var(--spacing)*42)] b:min-h-[calc(100svh-var(--spacing)*33)]">
            {children}
          </main>
          <Footer />
        </div>
      </Content>
    </>
  );
};

export default LayoutWrapper;
