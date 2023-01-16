import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative z-10 flex h-10 w-10 items-center justify-center rounded-md bg-[#DC9F42] text-white focus:outline-none hover:bg-[#F0E4A9] hover:text-gray-800'>
        <svg
          className='h-6 w-6'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      <div
        className={`${isOpen ? "block" : "hidden"} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 left-0 z-20 w-[250px] transform overflow-y-auto bg-[#F9F8F5] duration-300 ease-in-out`}>
        <div className='flex items-center justify-between bg-[#F0E4A9] p-4'>
         <img src="/images/logo.png" alt=""  className="h-14"/>
          <h1 className='text-xl font-bold text-orange-400'>Bell Fresh</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-orange-800 focus:outline-none'>
            <svg
              className='h-6 w-6'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='space-y-5 px-4 py-2'>
          <Link href='/' className='nav-items block px-2 py-1 font-medium text-gray-800'>
            Home
          </Link>
          <Link href='/about' className='nav-items block px-2 py-1 font-medium text-gray-800'>
            About
          </Link>
          <Link href='/menu' className='nav-items block px-2 py-1 font-medium text-gray-800'>
            Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
