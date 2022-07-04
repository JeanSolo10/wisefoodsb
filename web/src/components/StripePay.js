import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove_product } from "../features/redux/cart/cartSlice";
import axiosInstance from "../utils/axios";

const StripePay = ({ total }) => {
  const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.cart);

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
          amount: total,
        });
        if (response.status === 200) {
          try {
            for (const product of products) {
              const body = {
                is_available_in_market: false,
                transaction_status: "PENDING",
                buyerId: user.id,
              };
              await axiosInstance.put(`/api/v1/products/${product.id}`, body);
              dispatch(remove_product(product));
            }
            navigate("/stripe_success");
          } catch (error) {
            throw new Error(error);
          }
        }
      } catch (error) {
        setError(error);
      }
    };
    stripeToken && makeRequest();
  }, [total, stripeToken, navigate]);

  return (
    <StripeCheckout
      name="WiseFoodSB"
      billingAddress={true}
      description={`Your total is ¥${total}`}
      amount={total}
      currency="JPY"
      token={onToken}
      stripeKey={STRIPE_KEY}
      locale="auto"
    >
      <Button
        variant="contained"
        sx={{
          fontWeight: 500,
          height: "auto",
          color: "black",
          fontFamily: "Helvetica",
          mt: 3,
        }}
        style={{
          backgroundColor: "#11AA60",
          color: "white",
          fontWeight: "600",
        }}
      >
        Complete your order
      </Button>
    </StripeCheckout>
  );
};

export default StripePay;
