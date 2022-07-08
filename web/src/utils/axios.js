import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout_user } from "../features/redux/users/userSlice";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ISDEV
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  async (error) => {
    if (error.response.status === 401) {
      alert("Your session has expired! Please logout and log back in.");
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
