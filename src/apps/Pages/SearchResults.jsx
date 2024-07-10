import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../Component/Product/ProductCard";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:3003/api/products`)
        .then((res) => res.json())
        .then((data) => {
          const filteredProducts = data.data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [query]);

  return (
    <div className="my-5 min-h-screen">
      <h1 className="text-2xl font-bold mb-20 flex items-center">
        Search Results
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
