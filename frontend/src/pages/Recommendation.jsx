import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import Footer from "../components/Footer";
import { Select } from "antd";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recommendation = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const getCategories = () => {
    api
      .get("/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecommendation = () => {
    if (!category || !maxPrice) {
      toast.error("Please fill all the fields");
      return;
    }
    api
      .get(`/products/recommendation?category_id=${category}&price=${maxPrice}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable={true}
        pauseOnHover={false}
        theme="colored"
      />
      <Navbar />
      <div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        <div className="text-center text-brand">Fill up the fields below</div>
        <div className="grid grid-cols-5 gap-x-5">
          <Select
            placeholder="Select Category"
            className="w-full outline-brand col-span-2"
            onChange={(value) => setCategory(value)}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 rounded-md px-2 w-full outline-brand col-span-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            onClick={getRecommendation}
            className="bg-brand w-full text-white rounded-md"
          >
            Get Recommendation
          </button>
        </div>
        {products.length > 0 && (
          <div>
            <div className="text-center text-brand">Results</div>
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-8 border-b border-gray-300 p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-center">
                  <img
                    src={
                      JSON.parse(product.features.replace(/'/g, '"')).image ||
                      "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                    }
                    alt={product.name}
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-[24px] font-semibold">
                      {product.name}
                    </div>
                    <div className="text-[24px] text-brand font-bold">
                      $ {product.price}
                    </div>
                  </div>
                  <div className="text-[18px] text-xlightgray">
                    {product.desc}
                  </div>
                  <div className="grid grid-cols-4">
                    {Object.entries(
                      JSON.parse(product.features.replace(/'/g, '"'))
                    ).filter(([key]) => key !== "image").map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.split("_").join(" ")}:</strong> {value}
                      </li>
                    ))}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Rating
                      initialRating={product.rating}
                      readonly
                      emptySymbol={<IoMdStarOutline className="text-brand" />}
                      fullSymbol={<IoMdStar className="text-brand" />}
                    />
                    <div className="text-sm text-xlightgray">
                      {product.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Recommendation;
