import CartItem from "@/components/CartItem";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStripe } from "@/stripe/stripe";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  const { cartItems } = useSelector((state) => state.menu);

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const createCheckOutSessions = async () => {
    const stripe = await getStripe();

    // call backend to create checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: cartItems,
      email: session?.user?.email,
      name: session?.user?.name,
    });

    // redirect to checkout session from stripe

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) toast.error(result.error.message);
  };

  const getTotal = () => {
    return cartItems
      .reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      )
      .toFixed(2);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section>
      <h1 className='sr-only'>Checkout</h1>

      <form
        className='mx-auto grid max-w-7xl grid-cols-1  md:grid-cols-2'
        onSubmit={handleSubmit(onSubmit)}>
        <div className=' max-w-[640px] p-5'>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-3'>
              <h1 className='text-2xl font-extrabold text-gray-800 dark:text-white '>
                Shipping information
              </h1>
              <Image src='/images/shipping.png' alt='' width='35' height='35' />
            </div>

            <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
              <div className='flex w-full flex-col'>
                <label className='checkout-label'>First Name</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("firstName")}
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Last Name</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("lastName")}
                />
              </div>

              <div className='flex flex-col'>
                <label className='checkout-label'>Phone</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("phone")}
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Email</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("email")}
                />
              </div>

              <div className='flex w-full flex-col'>
                <label className='checkout-label'>Address</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("address")}
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Street</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("street")}
                />
              </div>

              <div className='flex flex-col'>
                <label className='checkout-label'>Building Number</label>
                <input
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("buildingNo")}
                />
              </div>
              <div className='flex flex-col'>
                <label className='checkout-label'>Instruction (optional)</label>
                <textarea
                  type='text'
                  className='rounded-md border border-orange-200 bg-[#F9F8F5] px-4 py-2 focus:outline-none'
                  {...register("instructions")}
                />
              </div>
            </div>
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
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}

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
                      Total
                    </h6>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <p className='font-medium text-gray-600 dark:text-white'>
                      ${getTotal() || 0}
                    </p>
                  </div>
                </div>
                <div className='flex w-full flex-col items-center space-y-3 p-2'>
                  <button
                    type='submit'
                    onClick={createCheckOutSessions}
                    className='w-full rounded-md bg-[#DC9F42] px-4 py-2 text-center text-xl font-extrabold text-white transition duration-200 hover:border-2 hover:border-[#F0E4A9] hover:bg-[#f1e6aab5] hover:text-orange-500'>
                    Stripe Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default checkout;
