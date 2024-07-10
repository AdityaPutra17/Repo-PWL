// import React, { useEffect, useState } from "react";
import { FiChevronRight, FiShoppingCart } from "react-icons/fi";
// import ProductInfo from "../Component/Product/ProductInfo";
// import { useParams } from "react-router-dom";

// const Detail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3003/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
// <div className="my-5 ">
//   <h1 className="text-2xl mb-20 flex items-center">
//     Home <FiChevronRight /> Produk <FiChevronRight />
//     <span className="font-semibold">Detail</span>
//   </h1>
// <div className="flex justify-center">
//   <div className="w-1/2">
//     <img src={product.image} alt="" width={"60%"} />
//   </div>
//   <div className="w-1/2">
//     <h1 className="my-5 font-bold text-4xl">{product.title}</h1>
//     <ProductInfo price={product.price} rating={product.rating} />
//     <p>{product.desc}</p>
//     <button className="my-5 flex gap-5 py-4 px-6 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
//       <FiShoppingCart className="text-white text-xl" /> Add to Cart
//     </button>
//   </div>
// </div>
// </div>
//   );
// };

// export default Detail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/products/${id}`
        );
        setProduct(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-10 min-h-full">
      <a href="/" className="text-2xl mb-20 flex items-center">
        Home <FiChevronRight /> Produk <FiChevronRight />
        <span className="font-semibold">Detail</span>
      </a>
      {product && (
        <div className="flex justify-center items-center gap-10 ">
          <div className="w-1/2 bg-red-600 mb-16">
            <img src={product.image} alt="" />
          </div>
          <div className="w-1/2">
            <h1 className="my-5 font-bold text-4xl">{product.title}</h1>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.round(product.rating)
                        ? "text-yellow-300"
                        : "text-gray-200 dark:text-gray-600"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {product.rating}
              </span>
            </div>
            <p className="text-4xl font-bold">$ {product.price}</p>
            <p className="text-xl my-10">{product.desc}</p>
            <button className="my-5 flex gap-5 py-4 px-6 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
              <FiShoppingCart className="text-white text-xl" /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
