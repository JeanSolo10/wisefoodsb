import { createSlice } from "@reduxjs/toolkit";

// TODO: update user data keys to Profile object for BUYER
const initialState = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  address: "",
  role: "",
  store: {},
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login_user: (state, action) => {
      const {
        id,
        role,
        email,
        Store,
        first_name,
        last_name,
        phone_number,
        address,
      } = action.payload;
      state.email = email;
      if (id) {
        state.id = id;
      }
      if (role) {
        state.role = role;
      }
      if (role === "SELLER" && Store !== null) {
        state.store = Store;
      }
      if (role === "BUYER") {
        state.first_name = first_name;
        state.last_name = last_name;
        state.phone_number = phone_number;
        state.address = address;
      }
    },
    logout_user: (state, action) => {
      return {
        email: "",
        first_name: "",
        last_name: "",
        store_name: "",
        role: "",
        store: {},
      };
    },
    set_user_store: (state, action) => {
      const { name, address, phone_number, opening_hours, closing_hours, id } =
        action.payload.payload;

      if (action.payload.type === "add") {
        state.store = {};
        state.store["name"] = name;
        state.store["address"] = address;
        state.store["phone_number"] = phone_number;
        state.store["opening_hours"] = opening_hours;
        state.store["closing_hours"] = closing_hours;
        state.store["id"] = id;
      }
      if (action.payload.type === "update") {
        state.store["name"] = name;
        state.store["address"] = address;
        state.store["phone_number"] = phone_number;
        state.store["opening_hours"] = opening_hours;
        state.store["closing_hours"] = closing_hours;
      }
    },
    set_user_buyer_data: (state, action) => {
      const { first_name, last_name, phone_number, email, address } =
        action.payload.payload;

      if (action.payload.type === "update") {
        state.first_name = first_name;
        state.last_name = last_name;
        state.phone_number = phone_number;
        state.email = email;
        state.address = address;
      }
    },
  },
});

export const { login_user, logout_user, set_user_store, set_user_buyer_data } =
  usersSlice.actions;

export default usersSlice.reducer;
