import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <div
          className={`relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 ${
            resolvedTheme === "dark" ? "justify-end" : "justify-start"
          }`}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          <span className='absolute left-0'>🌜</span>
          <motion.div
            className='z-40 h-5 w-5 rounded-full bg-white'
            layout
            transition={spring}
          />

          <span className='absolute right-0.5'>🌞</span>
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
