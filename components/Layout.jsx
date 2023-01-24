import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <div className='flex min-h-screen flex-col bg-[#F9F8F5] dark:bg-black'>
      {router.pathname !== "/auth/register" &&
        router.pathname !== "/auth/login" && <Header path={router.route} />}

      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
