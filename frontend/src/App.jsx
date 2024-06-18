import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import api from "./api";
import Sidebar from "./components/Sidebar";
import AdminProducts from "./pages/AdminProducts";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Recommendation from "./pages/Recommendation";
import Search from "./pages/Search";
import AdminComments from "./pages/AdminComments";

const App = () => {
  useEffect(() => {
    const getProfile = () => {
      api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProfile();
  }, []);
  return (
    <div className="App font-body" id="outer-container">
      <div id="page-wrap">
        <BrowserRouter>
          <Sidebar id="sidebar" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/recommendations" element={<Recommendation />} />
            <Route path="/search/:searchText" element={<Search />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/comments" element={<AdminComments />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
