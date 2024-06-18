import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [rating, setRating] = useState({});
  const [comments, setComments] = useState([]);

  const postComment = () => {
    // Create a copy of the current rating state
    const updatedRating = { ...rating };

    // Retrieve the list of rating parameters for the product's category
    const ratingParams =
      categories
        .find((cat) => cat.id === product.category_id)
        ?.rating_params.split(", ") || [];

    // Loop through all rating parameters for the category
    ratingParams.forEach((param) => {
      // If the parameter has not been rated, default it to 5
      if (!(param in updatedRating)) {
        updatedRating[param] = 5;
      }
    });

    // Send the POST request with the updated rating object
    api
      .post(`/comments`, {
        product_id: productId,
        rating: updatedRating,
        body: commentBody,
      })
      .then((res) => {
        getComments();
        setCommentBody("");
        setRating({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = () => {
    api
      .get(`/comments/${productId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
    const getProduct = () => {
      api
        .get(`/products/${productId}`)
        .then((res) => {
          setLoading(false);
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProduct();
    getCategories();
    getComments();
    getProfile();
  }, [productId]);
  return (
    <div>
      <Navbar />
      {!loading && (
        <div className="flex flex-col gap-y-4 md:gap-y-8 md:w-2/3 md:mx-auto my-5 md:my-16 mx-2">
          <div className="text-[36px] text-center text-brand font-bold">
            {product.name}
          </div>
          <div className="flex justify-center gap-x-10">
            <img
              src={
                JSON.parse(product.features.replace(/'/g, '"')).image ||
                "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
              }
              alt={product.name}
              className="w-auto h-[520px]"
            />
            <div>
              {Object.entries(JSON.parse(product.features.replace(/'/g, '"')))
                .filter(([key]) => key !== "image")
                .map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm text-xlightgray">
                      {key.split("_").join(" ")}
                    </div>
                  </div>
                ))}
              <div className="mt-5 -ml-1">
                <Rating
                  initialRating={product.rating}
                  readonly
                  emptySymbol={
                    <IoMdStarOutline className="text-brand text-3xl" />
                  }
                  fullSymbol={<IoMdStar className="text-brand text-3xl" />}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start gap-x-10">
            <div className="text-lg text-left text-xlightgray font-light">
              {product.desc}
            </div>
            <div className="text-[24px]  text-center text-brand font-bold">
              ${product.price}
            </div>
          </div>
          <div className="text-center text-brand">Rate this product</div>
          <div className="flex justify-between">
            {categories
              .find((cat) => cat.id === product.category_id)
              ?.rating_params.split(", ")
              .map((param, i) => (
                <div key={i}>
                  <div className="text-center">{param}</div>
                  <Rating
                    initialRating={rating[param] || 5}
                    emptySymbol={
                      <IoMdStarOutline className="text-brand text-3xl" />
                    }
                    fullSymbol={<IoMdStar className="text-brand text-3xl" />}
                    onChange={(value) => {
                      setRating({ ...rating, [param]: value });
                    }}
                  />
                </div>
              ))}
          </div>
          <textarea
            placeholder="Write a comment to post the rating..."
            className="border border-gray-300 rounded-md p-2 w-full outline-brand"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          {commentBody && (
            <div className="flex justify-end">
              <button
                onClick={postComment}
                className="-mt-5 bg-brand text-white px-5 py-1 rounded-md"
              >
                Post
              </button>
            </div>
          )}
          <div className="text-center text-brand">Comments</div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="text-lg text-brand font-bold">
                    {comment.user_id === user.id ? user.name : "Charlie Davis"}
                  </div>
                  <div className="text-lg text-xlightgray">{comment.body}</div>
                </div>
                <div className="text-lg text-brand font-bold">
                  {Object.entries(
                    JSON.parse(comment.rating.replace(/'/g, '"'))
                  ).map(([key, value]) => (
                    <div key={key} className="flex justify-end">
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
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SingleProduct;
