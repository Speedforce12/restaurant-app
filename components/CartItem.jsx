import item from "@/pages/items/[id]";
import { decrement, increment, removeItem } from "@/redux/reducer";
import Link from "next/link";
import React from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import {  useDispatch } from "react-redux";

const CartItem = ({item}) => {
  const dispatch = useDispatch()

  return (
    <Link
      href={`items/${item._id}`}
      className='flex w-full items-center space-x-3 rounded-md border border-gray-200  p-2 shadow-sm dark:border-gray-700'>
      <img src={item.picture} alt='' className='h-16 w-16 object-cover' />
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-full flex-col space-y-2'>
          <h6 className='text-md font-semibold text-gray-800 dark:text-white'>
            {item.name}
          </h6>
          <div className='flex items-center  space-x-2'>
            <button onClick={() => dispatch(decrement(item._id))}>
              <HiOutlineMinusCircle className='text-2xl text-orange-500' />
            </button>
            <span className='text-lg font-bold text-gray-700 dark:text-orange-300'>
              {item.quantity ? item.quantity : 0}
            </span>
            <button onClick={() => dispatch(increment(item._id))}>
              <HiOutlinePlusCircle className='text-2xl text-orange-500' />
            </button>
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <button
            className='text-md ml-7 font-semibold text-gray-800'
            onClick={() => dispatch(removeItem(item._id))}>
            <IoClose className='text-lg text-rose-500' />
          </button>
          <p className='font-medium text-gray-600 dark:text-white'>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          {/* price times amount */}
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
