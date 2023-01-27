import { addToCart} from "@/redux/reducer";
import Image from "next/image";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();


  return (
    <>
      {item && item.length > 0 ? (
        item.map((menu) => (
          <div
            
            className='group m-2 cursor-pointer rounded-xl bg-white p-4 drop-shadow-lg transition duration-200 hover:bg-[#f4d01c95]'
            key={menu._id}>
            <Link
              href={`/items/${menu._id}`}
              className='flex flex-col items-center justify-center'>
              <Image src={menu.picture} alt='menu item' width={160} height={120} className='object-contain h-44' />
            </Link>
            <div className='flex w-48 flex-col items-center  justify-center text-center'>
              <span className='mb-2 whitespace-normal text-lg font-semibold tracking-tight group-hover:text-white dark:text-white'>
                {menu.name}
              </span>

              <p className='w-48 truncate border-t border-b py-1.5 text-sm font-normal tracking-tighter text-gray-500 group-hover:text-white'>
                {menu.description}
              </p>
              <div className='mt-2 flex w-full items-center justify-between px-3'>
                <span className='text-xl font-bold group-hover:text-white dark:text-white'>
                  $ {menu.price}
                </span>
                <button onClick={() => dispatch(addToCart(menu))}>
                  <IoMdAddCircleOutline className='text-3xl text-orange-500 group-hover:text-white' />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='flex w-full flex-col items-center justify-center'>
          <img src='/images/NotFound.png' alt="" className='h-340' />
          <p className='text-headingColor my-2 text-xl font-semibold'>
            Items Not Available
          </p>
        </div>
      )}
    </>
  );
};

export default MenuItem;
