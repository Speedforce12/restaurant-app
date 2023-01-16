import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className='relative flex items-center overflow-hidden'>
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-800 to-black/50 opacity-80'></div>
      <img
        src='/images/heroBg.jpg'
        fill
              className='h-36 w-full rounded-3xl object-cover bg-white'
        alt='hero image'
        priority
      />

      <div className='absolute flex items-center justify-between  p-3'>
        <div className=' hidden flex-1 items-center space-x-2 md:flex'>
          <img
            src='/images/heroicon.png'
            alt=''
            className='h-28 w-28 object-cover'
          />
          <div className='grid space-y-2'>
            <h2 className='text-3xl font-semibold text-white'>Bell Fresh</h2>
            <p className='text-base font-medium text-gray-300'>
              Fresh & healthy food recipe
            </p>
          </div>
        </div>
        <div className='absolute md:-right-[900px]  flex items-center justify-center divide-opacity-60 divide-x-2 divide-slate-200 divide-dotted'>
          <div className='flex flex-col justify-between px-4'>
            <h2 className='text-3xl font-bold text-[#DC9F42]'>24</h2>
            <p className="text-sm whitespace-nowrap text-white">total Item</p>
          </div>
          <div className="flex flex-col px-4">
            <h2 className='text-3xl font-bold text-[#DC9F42]'>24</h2>
            <p className="text-sm text-white">category</p>
          </div>
          <div className='flex justify-between flex-col px-4'>
            <h2 className='text-3xl font-bold text-[#DC9F42]'>24</h2>
            <p className="text-sm text-white">Outlet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
