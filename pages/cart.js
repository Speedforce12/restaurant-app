import CartItem from "@/components/CartItem";
import EmptyCart from "@/components/EmptyCart";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const cart = () => {
  const { cartItems } = useSelector((state) => state.menu);

  
// get grand total price of all items 
  const getTotal = () => {
    return cartItems.reduce(
     (accumulator, item) => accumulator + item.quantity * item.price,0).toFixed(2)

  }

  
  if (cartItems.length ===0 ) {
    return (
      <section className='mx-auto flex max-w-4xl flex-col items-center justify-center'>
        <h1 className='mt-5 text-center text-3xl font-extrabold '>
          Your Cart is empty
        </h1>

        <div className='h-full w-full lg:h-[700px] lg:w-[700px]'>
          <EmptyCart />
        </div>
      </section>
    );
  }
  return (
    <div className='mx-auto mt-3 grid max-w-6xl grid-cols-1 p-4 lg:grid-cols-2'>
      {/* cart items left */}
      <div className='flex w-full flex-col space-y-3 lg:w-4/5'>
        <div className='flex items-center space-x-4'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Cart
          </h2>
          <Image src='/images/cart.png' alt='' width='40' height='40' />
        </div>

        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
          Hi Speedy, below is your cart:
        </h3>

        <div className='flex flex-col space-y-2'>
          {cartItems.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
      </div>
      {/* right side fees */}
      <div className='mt-6 flex flex-col space-y-3 lg:mt-0'>
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
                Total
              </h6>
              <p className='font-medium text-gray-600 dark:text-white'>
                Total Items
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='font-medium text-gray-600 dark:text-white'>
                ${getTotal()}
              </p>
              <p className='font-medium text-gray-600 dark:text-white'>
                {cartItems.length}
              </p>
            </div>
          </div>
          <div className='flex w-full flex-col space-y-3 p-2'>
            <Link
              href='/'
              className='w-full rounded-md border border-[#F0E4A9] bg-[#F9F8F5] px-4 py-2 text-center text-xl font-bold text-gray-500 transition duration-200 hover:border-[#ecde97] hover:bg-[#F0E4A9] hover:text-orange-400'>
              Continue Shopping
            </Link>
            <Link href="/checkout"
              className='w-full rounded-md bg-[#DC9F42] px-4 py-2 text-center text-xl font-extrabold text-white transition duration-200 hover:border-2 hover:border-[#F0E4A9] hover:bg-[#f1e6aab5] hover:text-orange-500'>
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
