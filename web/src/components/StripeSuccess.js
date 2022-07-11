import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveAppBar from "./ResponsiveAppBar";

const StripeSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/buyer_profile");
    }, 2000);
  }, [navigate]);

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 20,
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            "@media (min-width:769px)": {
              fontSize: 30,
            },
          }}
        >
          Payment was successful!
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            "@media (min-width:769px)": {
              fontSize: 30,
            },
          }}
        >
          Thank you for your purchase!
        </Typography>
      </Box>
    </>
  );
};

export default StripeSuccess;
