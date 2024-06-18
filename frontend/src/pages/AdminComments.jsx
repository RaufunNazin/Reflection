import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from "react";
import api from "../api";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminComments = () => {
  const [comments, setComments] = useState([]);

  const approveComment = (id) => {
    api
      .put(`/comments/${id}`)
      .then(() => {
        toast.success("Comment approved successfully");
        getComments();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.message || err.message);
      });
  };

  const deleteComment = (id) => {
    api
      .delete(`/comments/${id}`)
      .then(() => {
        toast.success("Comment deleted successfully");
        getComments();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.message || err.message);
      });
  };

  const getComments = () => {
    api
      .get("/comments/unapproved/all")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-lg text-brand font-bold">
                  {comment.user_name}
                </div>
                <div className="text-lg text-xlightgray">{comment.body}</div>
                <div className="text-lg text-brand font-bold flex">
                  {Object.entries(
                    JSON.parse(comment.rating.replace(/'/g, '"'))
                  ).map(([key, value]) => (
                    <div key={key} className="flex justify-end items-center">
                      <p>{key.split("_").join(" ")}:</p>
                      <Rating
                        initialRating={value}
                        readonly
                        emptySymbol={<IoMdStarOutline className="text-brand" />}
                        fullSymbol={<IoMdStar className="text-brand" />}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button
                  onClick={() => approveComment(comment.id)}
                  className="bg-brand text-white px-5 py-1 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-500 px-5 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AdminComments;
