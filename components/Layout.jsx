import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="mx-auto">
      <Header />
      <div className='h-auto w-screen'>{children}</div>
    </div>
  );
};

export default Layout;
