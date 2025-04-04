import React, { useContext, useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { FaBox } from "react-icons/fa";
import { productcontext } from '../utils/Context';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Nav() {
  const [products] = useContext(productcontext);
  const [isOpen, setIsOpen] = useState(false);
  const { search, pathname } = useLocation();

  let uniquecategory = products?.reduce((acc, cv) => [...acc, cv.category], []);
  uniquecategory = [...new Set(uniquecategory)];

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const sidebarContent = (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="h-full bg-white p-5 shadow-lg"
    >
      {(pathname !== "/" || search.length > 0) && (
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 px-4 bg-[#000] text-[#fff] rounded-lg font-semibold hover:bg-[#505050] flex items-center gap-2"
          >
            <IoHomeOutline size={20} /> Go to home
          </motion.button>
        </Link>
      )}

      <Link to="/create">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-5 py-2 px-4 bg-[#000] text-[#fff] rounded-lg font-semibold hover:bg-[#505050] flex items-center gap-2"
        >
          <FiPlusCircle size={20} /> Add new products
        </motion.button>
      </Link>

      <h1 className="mt-6 text-lg font-bold text-[#000000]">Category Filter</h1>
      <div className="mt-4 space-y-2">
        {uniquecategory.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/?category=${c}`}
              className="flex items-center gap-2 p-3 rounded-lg text-[#000000] hover:text-[#ffffff] hover:bg-[#000000] transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FaBox size={20} /> {c}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block  w-[20%] h-full left-0 bg-[#fff] ">
        {sidebarContent}
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#fff]  p-4 shadow-md flex items-center justify-between z-50">
        <h1 className="text-xl font-bold text-[#000]">Menu</h1>
        <button onClick={toggleMenu}>
          {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-[80%] h-full bg-white z-40 pt-10 shadow-xl md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
