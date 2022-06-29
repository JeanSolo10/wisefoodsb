import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";
import BuyerDashboard from "./BuyerDashboard";

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

  // Seller with no Store
  if (user.role === "SELLER" && Object.keys(user.store).length === 0) {
    return (
      <Typography style={{ fontSize: 20, marginTop: 20, marginLeft: 10 }}>
        Cannot add items to sell until a store is added!
        <br />
        <br />
        Please navigate to{" "}
        <Link onClick={() => navigate("/seller_profile")}>Profile</Link> to add
        a store.
      </Typography>
    );
  }

  // Seller Dashboard
  if (user.role === "SELLER") {
    return (
      <>
        <h1>Welcome {user.role}</h1>
      </>
    );
  }

  // Buyer Dashboard
  if (user.role === "BUYER" && !user.first_name) {
    return <BuyerDashboard />;
  }

  return null;
};
