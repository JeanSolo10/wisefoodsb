import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  store_name: "",
  role: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login_user: (state, action) => {
      const email = action.payload.email;
      state.email = email;
    },
    logout_user: (state, action) => {
      return {
        email: "",
        first_name: "",
        last_name: "",
        store_name: "",
        role: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login_user, logout_user } = usersSlice.actions;

export default usersSlice.reducer;
