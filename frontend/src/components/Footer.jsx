import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-brand">
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center md:px-32 py-8">
        <div className="text-white text-center md:text-left">
          <div className="text-2xl font-semibold uppercase">Reflection</div>
          <div className="text-sm">© 2021 All Rights Reserved</div>
        </div>
        <div className="text-white flex flex-col items-center md:items-end">
          <button
            onClick={() => navigate("/products")}
            className="text-md block"
          >
            Products
          </button>
          <button
            onClick={() => navigate("/recommendations")}
            className="text-md block"
          >
            Get Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
