import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_product: (state, action) => {
      if (state.products === null) {
        const arrayProducts = [action.payload];
        state.products = arrayProducts;
      } else {
        // find product if it exists
        state.products.push(action.payload);
      }
    },
    remove_product: (state, action) => {
      state.products = state.products.filter((element) => {
        return element.id !== action.payload.id;
      });
    },
  },
});

export const { add_product, remove_product } = cartSlice.actions;

export default cartSlice.reducer;
