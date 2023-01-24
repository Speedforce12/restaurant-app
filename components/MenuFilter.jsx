import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";

const MenuFilter = ({ category, filter, setFilter }) => {
  
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className={`${
        filter === category.filter ? "bg-[#f4d01cc3]" : "bg-[#f0e4a9b3]"
      } group m-2 cursor-pointer snap-start rounded-2xl border-2 border-[#ead671] p-6 drop-shadow-lg  transition duration-200 hover:bg-[#f4d01cc3]`}
      onClick={() => setFilter(category.filter)}>
      <div className='mb-2  flex h-12 w-20 flex-col items-center justify-center'>
        <IoFastFood
          className={`${
            filter === category.filter ? "text-white" : "text-[#efcb16]"
          } text-4xl  group-hover:text-white`}
        />
      </div>
      <h3
        className={` ${
          filter === category.filter ? "text-white" : "text-gray-700"
        } text-center text-base font-bold  group-hover:text-white`}>
        {category.name}
      </h3>
    </motion.div>
  );
};

export default MenuFilter;
