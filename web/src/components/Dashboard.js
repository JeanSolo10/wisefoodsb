import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
// import { login, register } from "../features/redux/users/userSlice";
// import { useDispatch } from "react-redux";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.users);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    //send user to login
    if (!user.email) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      {user.role === "SELLER" && !user.store && (
        <Typography style={{ fontSize: 20, marginTop: 20, marginLeft: 10 }}>
          Cannot add items to sell.
          <br />
          Please navigate to{" "}
          <Link onClick={() => navigate("/profile")}>Profile</Link> to add a
          store.
        </Typography>
      )}
    </>
  );
};

export default Dashboard;
