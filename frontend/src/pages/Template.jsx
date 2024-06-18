import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Template = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2"></div>
      <Footer />
    </div>
  );
};

export default Template;
