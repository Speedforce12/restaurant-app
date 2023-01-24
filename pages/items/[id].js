import { getMenu } from "@/lib/helpers";
import { addToCart, decrement, increment } from "@/redux/reducer";
import Image from "next/image";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import {  useDispatch } from "react-redux";

const item = ({ menu }) => {
  const dispatch = useDispatch();

 console.log(menu.quantity)
  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1  md:grid-cols-2 md:items-center lg:mt-14'>
      <div className='max-w-xl p-5'>
        <div className='flex items-center'>
          <Image
            src={menu.picture}
            width='250'
            height='200'
            className='rounded-md  object-cover'
            alt=''
            priority='true'
          />
        </div>
      </div>
      <div className='max-w-xl p-5'>
        <div className='flex flex-col space-y-6'>
          <h2 className='text-xl font-extrabold text-gray-800 dark:text-white'>
            {menu.name}
          </h2>
          <h5 className='text-base text-gray-500'>{menu.description} </h5>
          <span className='flex  items-center text-2xl font-extrabold text-orange-600'>
            $
            <h6 className='pl-1 text-xl font-extrabold text-gray-800  dark:text-orange-300'>
              {menu.price}
            </h6>
          </span>

          <div className='items-center flex space-x-3'>
            <span className='text-sm font-extrabold text-gray-800 dark:text-white'>
              Category
            </span>
            <span className='text-sm font-bold text-orange-500 dark:text-orange-700 bg-orange-200 rounded-md py-0.5 px-2'>
              {menu.categories}
            </span>

          </div>
          <div>
            <button
              className='rounded-lg  bg-[#D46E0D] py-2 px-4 text-white shadow-orange-200 drop-shadow-lg'
              onClick={() => dispatch(addToCart(menu))}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default item;

export async function getServerSideProps(context) {
  const menuId = context.params.id;
  const menu = await getMenu(menuId);

  return {
    props: {
      menu,
    },
  };
}
