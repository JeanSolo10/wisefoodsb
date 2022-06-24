import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    register_user: (state, action) => {
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login_user, register_user } = usersSlice.actions;

export default usersSlice.reducer;
