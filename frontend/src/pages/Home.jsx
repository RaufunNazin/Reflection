import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="flex flex-col gap-y-8 md:w-2/3 md:mx-auto my-16">
        <div className="text-[96px] text-center">
          Uncover the <span className="text-brand">Best Gadgets</span>
        </div>
        <div className="text-[24px] text-xlightgray text-center">
          Streamline your tech journey with authentic insights into the latest
          gadgets, ensuring best decisions and maximizing your enjoyment of
          cutting-edge technology
        </div>
        <div className="flex justify-center">
          <button className="px-10 py-2 bg-brand rounded-md hover:scale-105 transition-all duration-200 text-white font-semibold">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
