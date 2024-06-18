import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import Footer from "../components/Footer";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Products = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getProfile = () => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const getProducts = () => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    api
      .delete(`/products/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getProfile();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar active={"products"} />
      <div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        <div className="flex w-full justify-end gap-2">
          <Select
            placeholder="Select Category"
            className="w-1/5 outline-brand"
            onChange={(value) => {
              const filtered = products.filter(
                (product) => product.category_id === value
              );
              setFilteredProducts(filtered);
            }}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <Select
            placeholder="Sort by"
            className="w-1/5 outline-brand"
            onChange={(value) => {
              const sortedProducts = [...products];

              switch (value) {
                case "priceasc":
                  sortedProducts.sort((a, b) => a.price - b.price);
                  break;
                case "pricedsc":
                  sortedProducts.sort((a, b) => b.price - a.price);
                  break;
                case "ratingasc":
                  sortedProducts.sort((a, b) => a.rating - b.rating);
                  break;
                case "ratingdsc":
                  sortedProducts.sort((a, b) => b.rating - a.rating);
                  break;
                default:
                  break;
              }

              setProducts(sortedProducts);
            }}
            options={[
              { label: "Price Low to High", value: "priceasc" },
              { label: "Price High to Low", value: "pricedsc" },
              { label: "Rating Low to High", value: "ratingasc" },
              { label: "Rating High to Low", value: "ratingdsc" },
            ]}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-brand">
            Oops! No products found. Try a different filter.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {filteredProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-y-3 shadow-md p-2 bg-white rounded-md transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex w-full justify-center">
                  <img
                    src={
                      JSON.parse(product.features.replace(/'/g, '"')).image ||
                      "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                    }
                    alt="product"
                    className="h-60 w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">{product.name}</div>
                    {user.is_admin === 1 && (
                      <button onClick={() => deleteProduct(product.id)}>
                        <RxCross1 />
                      </button>
                    )}
                  </div>
                  <div className="text-md font-semibold text-brand">
                    ৳{product.price}
                  </div>
                  <Rating
                    initialRating={product.rating}
                    emptySymbol={<IoMdStarOutline className="text-brand" />}
                    fullSymbol={<IoMdStar className="text-brand" />}
                    readonly
                  />
                </div>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-brand text-center text-white py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
