import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productcontext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function Create() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(productcontext);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const minLength = 5;
        
        if (formData.title.trim().length < minLength) {
            newErrors.title = "Title must be at least 5 characters";
        }
        if (formData.description.trim().length < minLength) {
            newErrors.description = "Description must be at least 5 characters";
        }
        if (formData.category.trim().length < minLength) {
            newErrors.category = "Category must be at least 5 characters";
        }
        if (formData.image.trim().length < minLength) {
            newErrors.image = "Image URL must be at least 5 characters";
        }
        if (!formData.price || isNaN(formData.price)) {
            newErrors.price = "Please enter a valid price";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const Addproducthandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const product = {
            id: nanoid(),
            ...formData,
            price: parseFloat(formData.price)
        };

        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        toast.success("Product added successfully!");
        navigate('/');
    };

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const inputVariants = {
        focus: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-8"
            >
                <Link 
                    to={`/`} 
                    className="text-sm bg-black px-4 py-2 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-1"
                >
                    ← Back to Home
                </Link>
            </motion.div>

            <motion.form 
                onSubmit={Addproducthandler}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>
                
                <div className="space-y-4">
                    {['title', 'price', 'description', 'category', 'image'].map((field) => (
                        <div key={field}>
                            <motion.div whileFocus="focus" whileTap="tap" variants={inputVariants}>
                                {field === 'description' ? (
                                    <textarea
                                        name={field}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        onChange={handleChange}
                                        value={formData[field]}
                                        className={`w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                            errors[field] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                        }`}
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        type={field === 'price' ? 'number' : 'text'}
                                        name={field}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        onChange={handleChange}
                                        value={formData[field]}
                                        className={`w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                            errors[field] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                        }`}
                                        step={field === 'price' ? "0.01" : undefined}
                                    />
                                )}
                            </motion.div>
                            <AnimatePresence>
                                {errors[field] && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-red-500 text-xs mt-1 pl-1"
                                    >
                                        {errors[field]}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Create Product'
                    )}
                </motion.button>
            </motion.form>

            {/* Preview Section */}
            {formData.image && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 w-full max-w-md"
                >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Image Preview</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <img 
                            src={formData.image} 
                            alt="Product preview" 
                            className="w-full h-48 object-contain rounded"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Create;