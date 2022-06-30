import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SellerProfile from "./components/SellerProfile";
import BuyerProfile from "./components/BuyerProfile";
import StripePay from "./components/StripePay";
import StripeSuccess from "./components/StripeSuccess";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller_profile" element={<SellerProfile />} />
          <Route path="/buyer_profile" element={<BuyerProfile />} />
          <Route path="/stripe_pay" element={<StripePay />} />
          <Route path="/stripe_success" element={<StripeSuccess />} />
        </Routes>
      </LocalizationProvider>
    </>
  );
};

export default App;
