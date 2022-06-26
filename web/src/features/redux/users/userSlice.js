import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  role: "",
  store: {},
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login_user: (state, action) => {
      const { id, role, email, Store } = action.payload;
      state.email = email;
      if (id) {
        state.id = id;
      }
      if (role) {
        state.role = role;
      }
      if (role === "SELLER" && Store) {
        state.store = Store;
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
      const { name, address, phone_number, opening_hours, closing_hours } =
        action.payload.payload;

      if (action.payload.type === "add") {
        state.store = {};
        state.store["name"] = name;
        state.store["address"] = address;
        state.store["phone_number"] = phone_number;
        state.store["opening_hours"] = opening_hours;
        state.store["closing_hours"] = closing_hours;
      }
      if (action.payload.type === "update") {
        console.log("update");
      }
    },
  },
});

export const { login_user, logout_user, set_user_store } = usersSlice.actions;

export default usersSlice.reducer;
