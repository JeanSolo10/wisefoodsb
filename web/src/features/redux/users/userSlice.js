import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    first_name: "",
    last_name: "",
    store_name: "",
    accessToken: "",
    refreshToken: "",
    role: "",
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
    },
    register: (state, action) => {
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, register } = usersSlice.actions;

export default usersSlice.reducer;
