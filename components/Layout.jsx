import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col h-auto">
      <Header />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
