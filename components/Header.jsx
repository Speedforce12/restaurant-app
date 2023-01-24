import React from "react";
import Sidebar from "./Sidebar";
import { BiSearch } from "react-icons/bi";
import UserIcon from "./UserIcon";
import { RiShoppingBasket2Line } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {

  const{ cartItems }= useSelector((state) => state.menu);

  const getTotalQuantity = () => {
  return cartItems.reduce((accumulator, item) =>accumulator + item.quantity,0)
  };

  return (
    <div className='flex items-center justify-between gap-4  p-5'>
      {/* left nav */}
      <div className='flex items-center space-x-4'>
        <Sidebar />

        <Link
          href='/'
          className='hidden text-2xl font-bold  text-orange-500 md:flex md:whitespace-nowrap'>
          Bell Fresh
        </Link>
      </div>

      {/* middle */}
      <div className='flex w-[200px]  items-center rounded-lg bg-gray-300 p-2 md:w-[500px] md:space-x-3'>
        <BiSearch className='text-xl text-orange-400' />
        <input
          type='text'
          className='bg-transparent px-2 text-gray-900 outline-none placeholder:text-gray-700'
          placeholder='Search'
        />
      </div>

      {/* right side */}
      <div className='flex items-center justify-between md:space-x-6'>
        <div className='hidden md:flex'>
          <ThemeToggle />
        </div>
        <div className='hidden md:flex'>
          <UserIcon />
        </div>
        <Link
          href='/cart'
          className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0E4A9]'>
          <RiShoppingBasket2Line className='text-2xl text-orange-400' />
          <div className='absolute -top-3 -right-1 flex  h-5 w-5 items-center justify-center rounded-full bg-green-400 text-white'>
            <p className='text-xs font-semibold text-white'>
              {getTotalQuantity() || 0}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
