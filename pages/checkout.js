import CartItem from "@/components/CartItem";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const checkout = () => {
  return (
    <section>
      <h1 class='sr-only'>Checkout</h1>

      <div class='mx-auto grid max-w-7xl grid-cols-1  md:grid-cols-2'>
        <div className=' max-w-[640px] p-5'>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-3'>
              <h1 className='text-2xl font-extrabold text-gray-800 dark:text-white '>
                Shipping information
              </h1>
              <Image src='/images/shipping.png' alt='' width='35' height='35' />
            </div>

            <form className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
              <div className='flex w-full flex-col'>
                <label className='checkout-label'>First Name</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Last Name</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>

              <div className='flex flex-col'>
                <label className='checkout-label'>Phone</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Email</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>

              <div className='flex w-full flex-col'>
                <label className='checkout-label'>Address</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Street</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>

              <div className='flex flex-col'>
                <label className='checkout-label'>Building Number</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Instruction (optional)</label>
                <textarea
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                />
              </div>

              
            </form>
          </div>
        </div>
        <div className='max-w-[640px] p-5'>
          <div className='flex items-center space-x-3'>
            <h1 className='text-xl font-bold text-gray-800 dark:text-white'>
              Your Order
            </h1>
            <Image src='/images/checkout.png' alt='' width='35' height='35' />
          </div>

          <div className='mt-5 space-y-3 lg:mt-10'>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <div className='mt-6 flex flex-col space-y-3 lg:mt-2'>
              <div className='flex items-center space-x-3'>
                <h2 className='text-xl font-semibold text-gray-700 dark:text-white'>
                  Order Fees:
                </h2>
                <Image src='/images/order.png' alt='' width='30' height='30' />
              </div>
              <div className='space-y-3 '>
                <div className='flex w-full items-center justify-between'>
                  <div className='flex w-full flex-col space-y-2'>
                    <h6 className='text-md font-semibold text-gray-800 dark:text-white'>
                      Subtotal
                    </h6>
                    <p className='font-medium text-gray-600 dark:text-white'>Total</p>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <p className='font-medium text-gray-600 dark:text-white'>$125.85</p>
                    <p className='font-medium text-gray-600 dark:text-white'>$125.85</p>
                  </div>
                </div>
                <div className='flex w-full flex-col space-y-3 p-2'>
                  <Link
                    href='#'
                    className='w-full rounded-md bg-[#DC9F42] px-4 py-2 text-center text-xl font-extrabold text-white transition duration-200 hover:border-2 hover:border-[#F0E4A9] hover:bg-[#f1e6aab5] hover:text-orange-500'>
                    Purchase
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default checkout;
