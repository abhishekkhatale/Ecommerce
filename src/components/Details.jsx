import axios from "../utils/Axios";
import { FaStar } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loading from "./Loading";
import { productcontext } from "../utils/Context";
import { motion } from "framer-motion";

export default function Details() {
  const [products, setproducts] = useContext(productcontext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  const productdeletehandler = (id) => {
    const filtreredproduct = products.filter((p) => p.id !== id);
    setproducts(filtreredproduct);
    localStorage.setItem("products", JSON.stringify(filtreredproduct));
    navigate(`/`);
  };

  return product ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
      <Link
        to={`/`}
        className="text-sm bg-[#000] px-4 py-2 text-[#fff] rounded-md hover:bg-[#3b3b3b] mb-6 transition duration-300"
      >
        ← Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6 md:flex md:space-x-6 space-y-6 md:space-y-0"
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-1/3 h-80 object-cover rounded-lg"
          src={product.image}
          alt={product.title}
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
            <p className="text-xl font-semibold text-gray-800 mt-4">${product.price}</p>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">{product.description}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to={`/edit/${product.id}`}
              className="bg-green-600 hover:bg-green-700 transition duration-300 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FiEdit className="mr-2" /> Edit
            </Link>
            <button
              onClick={() => productdeletehandler(product.id)}
              className="bg-red-600 hover:bg-red-700 transition duration-300 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loading />
  );
}
