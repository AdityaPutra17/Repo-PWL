import React from "react";
import Price from "../Atomic/Price";
import Rating from "../Atomic/Rating";

const ProductInfo = ({ price, rating }) => {
  return (
    <div className="flex gap-10 my-5">
      <Price amount={price} />
      <Rating value={rating} />
    </div>
  );
};

export default ProductInfo;
