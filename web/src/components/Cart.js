import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
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
import { remove_product } from "../features/redux/cart/cartSlice";
import formatDate from "../utils/formatDate";
import axiosInstance from "../utils/axios";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(remove_product(product));
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price;
    }
    return totalPrice;
  };

  return (
    <>
      <ResponsiveAppBar />
      <Grid
        container
        spacing={2}
        sx={{
          "@media (min-width:780px)": {
            mt: 1,
            flexDirection: "row-reverse",
            ml: 2,
            mr: 2,
          },
        }}
      >
        <Grid item xs={12} md={5}>
          <Box>
            <Card
              sx={{
                "@media (min-width:780px)": {
                  mr: 8,
                },
              }}
            >
              <CardHeader
                title="Cart Summary"
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                {products.map((product, index) => (
                  <Box
                    key={`summary${index}`}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{product.name}</Typography>
                    <Typography>{`¥${product.price}`}</Typography>
                  </Box>
                ))}
                <Box
                  sx={{
                    mt: 2,
                    borderTop: 1,
                    borderColor: "#DDE2E4",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: "600", mt: 2 }}>
                    Total:{" "}
                  </Typography>
                  <Typography sx={{ textAlign: "end", mt: 2 }}>
                    ¥{calculateTotal()}
                  </Typography>
                </Box>
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
                  onClick={() => alert("TEST")}
                >
                  Complete your order
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          {products.map((product, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                "@media (min-width:780px)": {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              }}
            >
              <Card sx={{ flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  height="150"
                  sx={{
                    width: "100%",
                    "@media (min-width:780px)": {
                      width: "100%",
                    },
                  }}
                  image={product.imageUrl}
                  alt={product.name}
                />
              </Card>
              <Card
                sx={{
                  "@media (min-width:780px)": {
                    width: "100%",
                  },
                }}
              >
                <CardHeader
                  sx={{ height: 10 }}
                  title={product.name}
                  titleTypographyProps={{
                    variant: "h6",
                  }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Best before {formatDate(product.expiration_date)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {`¥${product.original_price}`}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: "700" }}
                  >
                    {`¥${product.price}`}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: 500,
                      height: "auto",
                      width: 200,
                      color: "black",
                      fontFamily: "Helvetica",
                      mt: 3,
                    }}
                    style={{
                      backgroundColor: "#FF0002",
                      color: "white",
                      fontWeight: "600",
                    }}
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove from cart
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
