import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { productcontext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [products] = useContext(productcontext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredproduct, setfilteredproduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getproductcategory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredproduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!filteredproduct || category == "undefined") {
      setfilteredproduct(products);
    }

    if (category != "undefined") {
      setIsLoading(true);
      // Simulate API call delay for demo purposes
      const timer = setTimeout(() => {
        setfilteredproduct(products.filter((p) => p.category == category));
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [category, products]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Nav />
      <div className="overflow-y-auto min-h-screen p-5 md:p-10 w-full scroll-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loading />
          </div>
        ) : (
          <motion.div
            className="w-full flex flex-wrap justify-center gap-5 md:gap-7"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {filteredproduct &&
                filteredproduct.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Link
                      to={`/details/${p.id}`}
                      className="block w-[250px] md:w-[270px] h-fit bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="overflow-hidden"
                      >
                        <img
                          className="w-full h-40 object-contain bg-gray-100 p-4"
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                        />
                      </motion.div>
                      <div className="p-4">
                        <motion.h2
                          className="text-md font-bold line-clamp-1"
                          whileHover={{ color: "#3b82f6" }}
                        >
                          {p.title}
                        </motion.h2>
                        <p className="text-gray-600 text-xs mt-1">
                          {p.category}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-blue-600">
                          ${p.price}
                        </p>
                        <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </AnimatePresence>

            {filteredproduct && filteredproduct.length === 0 && (
              <motion.div
                className="w-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold text-gray-600">
                  No products found
                </h3>
                <p className="text-gray-500 mt-2">
                  {category !== "undefined"
                    ? `No items in category "${category}"`
                    : "No products available"}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Home;