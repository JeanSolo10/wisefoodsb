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
      <DashBoardData />
    </>
  );
};

export default Dashboard;

const DashBoardData = () => {
  const user = useSelector((state) => state.users);

  const navigate = useNavigate();

  /* user is seller but doesn't have a store */
  if (user.role === "SELLER" && !user.store) {
    return (
      <Typography style={{ fontSize: 20, marginTop: 20, marginLeft: 10 }}>
        Cannot add items to sell.
        <br />
        Please navigate to{" "}
        <Link onClick={() => navigate("/seller_profile")}>Profile</Link> to add
        a store.
      </Typography>
    );
  }

  /* user is seller */
  if (user.role === "SELLER") {
    return (
      <>
        <h1>Welcome {user.role}</h1>
      </>
    );
  }

  /* user is buyer */
  if (user.role === "BUYER" && !user.first_name) {
    return (
      <>
        <Typography style={{ fontSize: 20, marginTop: 20, marginLeft: 10 }}>
          We require a first name to be provided to check items.
          <br />
          Please navigate to{" "}
          <Link onClick={() => navigate("/buyer_profile")}>Profile</Link> to add
          your information.
        </Typography>
      </>
    );
  }
};
