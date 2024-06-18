import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex flex-1 justify-between items-center p-2 md:p-0 md:px-32 md:py-3 shadow-sm">
      <button onClick={() => navigate("/")}>
        <img src="/logo.svg" alt="logo" className="h-5 md:h-8" />
      </button>
      <div className="hidden md:flex">
        <input
          type="text"
          placeholder="Search Products..."
          className="border border-gray-300 rounded-md px-2 w-[400px] bg-gray-50 outline-brand"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="text-brand hidden md:flex gap-x-4">
        <button
          onClick={() => navigate("/products")}
          className="hover:underline hover:underline-offset-2 transition-all duration-200"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/recommendations")}
          className="hover:underline hover:underline-offset-2 transition-all duration-200"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
};

export default Navbar;
