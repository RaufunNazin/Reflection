import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import AdminNavbar from "../components/AdminNavbar";
import { Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProducts = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState({});
  const [categories, setCategories] = useState([]);

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

  const createProduct = () => {
    if (!name || !category || !price || !description) {
      toast.error("Please fill all the fields");
      return;
    }
    api
      .post("/products", {
        name: name,
        category_id: parseInt(category),
        price: parseFloat(price),
        desc: description,
        features: features,
      })
      .then((res) => {
        toast.success("Product created successfully");
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setFeatures({});
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.message || err.message);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <AdminNavbar />
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
      <div className="flex flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        <div className="text-brand text-xl">Create Products</div>
        <div className="grid grid-cols-2 gap-2 md:gap-5">
          <input
            type="text"
            placeholder="Product Name"
            className="border border-gray-300 rounded-md px-2 w-full outline-brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            placeholder="Select Category"
            className="w-full"
            onChange={(value) => setCategory(value)}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <input
            type="text"
            placeholder="Price"
            className="border border-gray-300 rounded-md px-2 py-1 w-full outline-brand"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* Features */}
          {category &&
            categories
              .find((cat) => cat.id === category)
              ?.config_params.split(", ")
              .map((feature, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={feature}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full outline-brand"
                  value={features[feature]}
                  onChange={(e) =>
                    setFeatures({ ...features, [feature]: e.target.value })
                  }
                />
              ))}
          <textarea
            type="text"
            placeholder="Description"
            className="border border-gray-300 col-span-2 rounded-md px-2 py-1 w-full outline-brand"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex col-span-2 justify-center">
            <button
              onClick={createProduct}
              className="px-10 py-2 bg-brand rounded-md hover:scale-105 transition-all duration-200 text-white font-semibold"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
