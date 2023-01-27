import React from "react";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { shootFireworks } from "@/lib/fireworks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/reducer";

const succession = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (window.location.href.includes("success")) {
      shootFireworks();
      dispatch(clearCart());
    }
  }, []);

  return (
    <div className='container mx-auto py-12 px-6 text-center xl:max-w-screen-xl'>
      <div className='mx-auto max-w-lg rounded-md bg-gray-100 py-4 px-8'>
        <h2 className='flex flex-col items-center space-x-1 text-4xl font-semibold'>
          <MdOutlineCheckCircleOutline className='h-12 w-12 flex-shrink-0 text-green-600' />
          <span>Thanks for your order!</span>
        </h2>
        <p className='mt-3 text-lg'>Check your inbox for the receipt.</p>
      </div>
    </div>
  );
};

export default succession;
