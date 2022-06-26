import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.users);

  const navigate = useNavigate();

  useEffect(() => {
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

  if (user.role === "SELLER") {
    return (
      <>
        <h1>Welcome {user.role}</h1>
      </>
    );
  }

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

  return null;
};
