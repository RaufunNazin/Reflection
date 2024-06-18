import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState("");
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

  const logout = () => {
    api.get("/auth/logout").then(() => {
      navigate("/login", { state: "logout" });
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex justify-between items-center p-2 md:p-0 md:px-32 md:py-3 shadow-sm">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search/${searchText}`);
            }
          }}
        />
      </div>
      <div className="text-brand hidden md:flex gap-x-4">
        {user?.is_admin === 1 && (
          <button
            onClick={() => navigate("/admin/products")}
            className="hover:underline hover:underline-offset-2 transition-all duration-200"
          >
            Admin Panel
          </button>
        )}
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
        {user?.name ? (
          <button
            onClick={logout}
            className="hover:underline hover:underline-offset-2 transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hover:underline hover:underline-offset-2 transition-all duration-200"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
