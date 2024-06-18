import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import api from "./api";
import Sidebar from "./components/Sidebar";

const App = () => {
  useEffect(() => {
    const getProfile = () => {
      api
        .get("/me", {
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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;