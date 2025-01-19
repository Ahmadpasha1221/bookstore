import React from "react";
import { useParams } from "react-router-dom";
import { useFetchSingleBookQuery } from "../redux/features/books/bookapi";
import { getImgUrl } from "../utils/getImgUrl";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const SinglePage = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };
  const { id } = useParams();
  console.log(id);
  const { data: book, error, isLoading } = useFetchSingleBookQuery(id);
  console.log(book);
  console.log("Query Error:", error);
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div>
        <h2>there is an error on fetcing error</h2>
      </div>
    );
  return (
    <div className="max-w-lg shadow-md p-5 ">
      <h1 className="text-2xl mb-6 font-bold">
        {book ? book.title : "hbxdggv"}
      </h1>
      <div className="">
        <div>
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="mb-8"
          />
        </div>
        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1 "
        >
          {/* <FiShoppingCart className="" /> */}
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SinglePage;
