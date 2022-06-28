import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const StripePay = () => {
  const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
  const navigate = useNavigate();

  const [stripeToken, setStripeToken] = useState("");
  const [error, setError] = useState("");

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axiosInstance.post("/api/v1/stripe/payment", {
          tokenId: stripeToken.id,
          amount: 300,
        });
        // console.log(response.data.results);
        navigate("/stripe_success");
      } catch (error) {
        setError(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <>
      <StripeCheckout
        name="WiseFoodSB"
        billingAddress={true}
        description="Your total is ¥300"
        amount={300}
        currency="JPY"
        token={onToken}
        stripeKey={STRIPE_KEY}
        locale="auto"
      >
        <button>Make Payment!</button>
      </StripeCheckout>
    </>
  );
};

export default StripePay;
