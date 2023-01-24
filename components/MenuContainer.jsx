import { categories } from "@/lib/data";
import React, { useState } from "react";
import MenuFilter from "./MenuFilter";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { useQuery } from "react-query";
import { getMenu, getMenus } from "@/lib/helpers";
import Loader from "./Loader";


const MenuContainer = () => {
  // cache data
  const { isLoading, isError, data, error } = useQuery(
    "menus",
    getMenus,
    {
      select: (data) => data.sort((a, b) => b._id - a._id),
    }
  );
  const [filter, setFilter] = useState("Drinks");
  
  {isLoading  && (<Loader/>)}


  return (
    <div className='my-6'>
      <motion.p
        className='before:content relative mr-auto from-orange-400 to-orange-600 text-2xl font-semibold text-gray-700 transition-all duration-100 ease-in-out before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-16 before:rounded-lg before:bg-gradient-to-tr dark:text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 2 }}>
        Popular Dishes
      </motion.p>
      <div className='my-6 flex snap-x snap-mandatory justify-start overflow-x-auto scroll-smooth scrollbar-none lg:items-center lg:justify-center'>
        {categories &&
          categories.map((item) => (
            <MenuFilter
              key={item.id}
              category={item}
              filter={filter}
              setFilter={setFilter}
            />
          ))}
      </div>

      <section className='my-6 flex min-h-[96px] snap-x snap-mandatory items-center justify-start overflow-x-auto scroll-smooth scrollbar-none lg:grid lg:grid-cols-6'>
          
        <MenuItem item={ data?.filter((n)=> n.categories === filter)} />
      </section>
    </div>
  );
};

export default MenuContainer;
