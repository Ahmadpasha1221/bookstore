import React from "react";

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { getImgUrl } from "../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:h-72 gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={getImgUrl(book.coverImage)}
              alt="Book Image"
              className="bg-cover w-full rounded-md p-2 cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>
        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="font-semibold text-xl hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-grays-600 mb-5">
            {book?.description.length > 80
              ? book.description.slice(0, 80) + "..."
              : book.description}
          </p>
          <p className="font-medium mb-5">
            ${book.newPrice}
            <span className="line-through font-normal ml-2">
              {book?.oldPrice}
            </span>
          </p>
          <button
            className="bg-primary rounded-md px-6 py-1 space-x-1 flex items-center gap-1 font-semibold"
            onClick={() => handleAddToCart(book)}
          >
            <ShoppingCart className="size-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
