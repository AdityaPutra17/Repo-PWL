import { FiShoppingCart, FiUser } from "react-icons/fi";
import InputSearch from "./InputSearch.jsx";

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 ">
      <div className="mx-12 flex justify-between items-center">
        <div className="font-serif text-xl font-bold">
          <a href="/">Adifa</a>
        </div>

        <InputSearch />

        <div className="flex items-center space-x-4">
          <FiShoppingCart className="text-gray-600 text-xl" />
          <FiUser className="text-gray-600 text-xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
