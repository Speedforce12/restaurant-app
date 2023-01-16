import React from "react";
import Sidebar from "./Sidebar";
import { BiSearch } from "react-icons/bi";
import UserIcon from "./UserIcon";
import { RiShoppingBasket2Line } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className='flex items-center justify-between gap-4  p-5'>
      {/* left nav */}
      <div className='flex items-center space-x-4'>
        <Sidebar />

        <h1 className='text-2xl font-bold text-orange-500  hidden md:flex md:whitespace-nowrap'>Bell Fresh</h1>
      </div>

      {/* middle */}
      <div className='flex w-[200px]  md:w-[500px] items-center md:space-x-3 rounded-lg bg-gray-300 p-2'>
        <BiSearch className='text-xl text-orange-400' />
        <input
          type='text'
          className='bg-transparent px-2 outline-none placeholder:text-gray-700 text-gray-900'
          placeholder='Search'
        />
      </div>

      {/* right side */}
      <div className='flex items-center justify-between md:space-x-6'>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex">
          <UserIcon />
        </div>
        <Link href="/cart" className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0E4A9]'>
          <RiShoppingBasket2Line className='text-2xl text-orange-400' />
          <div className='absolute -top-3 -right-1 flex  h-5 w-5 items-center justify-center rounded-full bg-green-400 text-white'>
            <p className='text-xs font-semibold text-white'>12</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
