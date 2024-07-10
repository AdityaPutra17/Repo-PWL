import React from "react";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import Productlist from "../../Component/Product/Productlist";

const Home = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="flex justify-center">
        <img src={banner} alt="" className="text-center" />
      </div>

      <div>
        <h1 className="text-4xl font-bold my-6">Featured Products</h1>
        <Productlist />
      </div>

      <div className="flex justify-center">
        <img src={banner2} alt="" className="py-10" />
      </div>

      <div>
        <div className="flex justify-between my-6">
          <h1 className="text-4xl font-bold ">Explore Products</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full">
            View All Products
          </button>
        </div>

        <Productlist />
      </div>
    </div>
  );
};

export default Home;
