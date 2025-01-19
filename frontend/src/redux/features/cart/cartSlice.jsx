import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const initialstate = {
  cartItems: [],
};
const cartslice = createSlice({
  name: "cart",
  initialState: initialstate,
  reducers: {
    addToCart: (state, action) => {
      let existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product is been added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "<strong>Product is already been added</strong>",
          icon: "info",
          showCloseButton: true,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartslice.actions;
export default cartslice.reducer;
