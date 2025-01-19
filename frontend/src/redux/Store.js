import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import cartReducer from "./features/cart/cartSlice";
import booksApi from "./features/books/bookapi";
import ordersApi from "./features/orders/ordersApi";
export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      booksApi.middleware,
      ordersApi.middleware
    );
  },
});
export default Store;
