import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const LayoutInit = ({ children }) => {
  return (
    <div>
      <Navbar />

      <section className="container mx-auto">
        <div className="">{children}</div>
      </section>

      <Footer />
    </div>
  );
};

export default LayoutInit;
