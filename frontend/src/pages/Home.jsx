import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="flex flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        <div className="text-[96px] text-center">
          Uncover the <span className="text-brand">Best Gadgets</span>
        </div>
        <div className="text-[24px] text-xlightgray text-center">
          Streamline your tech journey with authentic insights into the latest
          gadgets, ensuring best decisions and maximizing your enjoyment of
          cutting-edge technology
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="px-10 py-2 bg-brand rounded-md hover:scale-105 transition-all duration-200 text-white font-semibold"
          >
            Get a Recommendation
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-y-8 md:w-2/3 md:mx-auto my-16">
        <div className="text-center text-brand text-2xl">
          Discover Trending Gadgets
        </div>
        {products.slice(0, 5).map((product) => (
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
                className="h-40 w-40 object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-2">
              <div className="flex items-center justify-between w-full">
                <div className="text-[24px] font-semibold">{product.name}</div>
                <div className="text-[24px] text-brand font-bold">
                  $ {product.price}
                </div>
              </div>
              <div className="text-[18px] text-xlightgray">{product.desc}</div>
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
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="px-10 py-2 bg-brand rounded-md hover:scale-105 transition-all duration-200 text-white font-semibold"
          >
            View All Products
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
