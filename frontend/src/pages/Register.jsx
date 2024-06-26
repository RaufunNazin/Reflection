import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      register();
    }
  };

  const register = () => {
    if (password !== cPassword) {
      toast.error("Passwords do not match");
      return;
    }
    api
      .post("/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/", { state: "register" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.message || err.message);
      });
  };

  return (
    <div className="flex flex-1 w-full">
      <div className="hidden md:block">
        <img src="/illustration.png" alt="hero" className="max-h-screen" />
      </div>
      <div className="flex flex-1 min-h-screen flex-col items-center justify-center gap-y-8">
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
        <div className="flex flex-col items-center gap-y-2">
          <button onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="logo" className="h-8" />
          </button>
          <p className="text-3xl font-black text-xgray lg:text-4xl">
            Create your account
          </p>
          <p className="lg:text-md text-sm text-xgray">
            Let&apos;s Create remarkable stories with creativity
          </p>
        </div>
        <div className="flex w-[360px] flex-col gap-y-8 lg:w-[400px]">
          <div className="flex flex-col gap-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brand"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brand"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brand"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="flex flex-col gap-y-2">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brand"
                onChange={(e) => setCPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={register}
              className="w-full rounded-md bg-brand p-3 text-lg font-medium text-white transition-all duration-200"
            >
              Register
            </button>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xlightgray font-light">
                Already have an account?
              </div>
              <button
                onClick={() => navigate("/login")}
                className="text-brand hover:underline"
              >
                Login Here!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
