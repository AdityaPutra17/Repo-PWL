"use client";
import React, { useRef } from "react";
import { FiSearch, FiCamera } from "react-icons/fi";

const InputSearch = () => {
  const searchRef = useRef(null);

  const handleSearch = () => {
    const keyword = searchRef.current.value.trim();
    if (keyword) {
      window.location.href = `/search?query=${keyword}`;
    }
  };

  return (
    <div>
      <div className="relative flex w-[800px]">
        <input
          placeholder="Search in Adifa"
          className="w-full p-2 rounded-full bg-gray-100 focus:outline-none pl-5"
          ref={searchRef}
        />
        <button onClick={handleSearch}>
          <FiSearch className="absolute right-12 top-3 text-gray-500" />
        </button>
        <a href="/searchimg" className="absolute top-2.5 right-4">
          <FiCamera className="text-xl text-gray-500" />
        </a>
      </div>
    </div>
  );
};

export default InputSearch;
