import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productcontext } from "../utils/Context";
import { motion } from "framer-motion";

function Edit() {
  const [products, setproducts] = useContext(productcontext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const changehandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const Addproducthandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert("Every field must have at least 5 characters");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copydata = [...products];
    copydata[pi] = { ...products[id], ...product };

    setproducts(copydata);
    localStorage.setItem("products", JSON.stringify(copydata));
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#f1f1f1] p-4">
      <Link
        to={`/`}
        className="text-sm bg-[#000] mb-6 px-4 py-2 text-white rounded-md hover:bg-[#3b3b3b] transition duration-300"
      >
        ← Back to Home
      </Link>

      <motion.form
        onSubmit={Addproducthandler}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Edit Product
        </h2>

        {["title", "price", "description", "category", "image"].map((field) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * Math.random(), duration: 0.4 }}
            className="mb-4"
          >
            {field === "description" ? (
              <textarea
                placeholder="Description"
                onChange={changehandler}
                name="description"
                value={product?.description || ""}
                className="w-full h-28 p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                placeholder={
                  field.charAt(0).toUpperCase() + field.slice(1).replace("URL", "")
                }
                onChange={changehandler}
                name={field}
                value={product?.[field] || ""}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            )}
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Edit;
