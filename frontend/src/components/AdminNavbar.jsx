import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-2 md:p-0 md:px-32 md:py-3 shadow-sm">
      <button onClick={() => navigate("/")}>
        <img src="/logo.svg" alt="logo" className="h-5 md:h-8" />
      </button>
      <div className="text-brand hidden md:flex gap-x-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="hover:underline hover:underline-offset-2 transition-all duration-200"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/admin/comments")}
          className="hover:underline hover:underline-offset-2 transition-all duration-200"
        >
          Comments
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
