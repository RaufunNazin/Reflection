import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const Search = () => {
  const { searchText } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      api
        .get(`/products`)
        .then((res) => {
          const filteredProducts = res.data.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProducts();
  }, [searchText]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        <div className="text-center text-brand">
          Search results for &apos;<strong>{searchText}</strong>&apos;
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
                className="w-40 h-40 object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-2">
              <div className="flex items-center justify-between w-full">
                <div className="text-[24px] font-semibold">{product.name}</div>
                <div className="text-[24px] text-brand font-bold">
                  ৳ {product.price}
                </div>
              </div>
              <div className="text-[18px] text-xlightgray">{product.desc}</div>
              <div className="grid grid-cols-4">
                {Object.entries(
                  JSON.parse(product.features.replace(/'/g, '"'))
                ).map(([key, value]) => (
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
      <Footer />
    </div>
  );
};

export default Search;
