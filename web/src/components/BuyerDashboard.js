import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { productData } from "../mockData/data";
import InfoIcon from "@mui/icons-material/Info";
import ProductInfoModal from "./ProductInfoModal";

const BuyerDashboard = () => {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleProductInfo = (product) => {
    setSelectedProduct(product);
    handleOpen();
  };

  return (
    <Box
      sx={{
        padding: 1,
        "@media (min-width:780px)": {
          ml: "auto",
          mr: "auto",
        },
      }}
    >
      <ProductInfoModal
        open={open}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
      <Typography
        sx={{ textAlign: "center", pt: 2, fontSize: "1.5rem", mb: 2 }}
      >
        Welcome{user.first_name ? ` ${user.username}!` : `!`}
      </Typography>
      <Box
        sx={{
          "@media (min-width:780px)": {
            display: "flex",
            flexWrap: "wrap",
            rowGap: 5,
            columnGap: 14,
            mx: 30,
          },
        }}
      >
        {productData.map((product, index) => (
          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#EEEEEE",
                height: 40,
                "@media (min-width:780px)": {
                  width: 400,
                },
              }}
            >
              <CardHeader
                title={product.name}
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardHeader
                title={`Price: ¥${product.price}`}
                titleTypographyProps={{ variant: "subtitle1" }}
              />
            </Box>
            <CardMedia
              component="img"
              height="150"
              sx={{
                "@media (min-width:780px)": {
                  height: 200,
                },
              }}
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Best before {`${product.expiration_date}`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: 500,
                    height: "auto",
                    width: 150,
                    color: "black",
                    fontFamily: "Helvetica",
                  }}
                  style={{
                    backgroundColor: "#EEEEEE",
                  }}
                  onClick={() => alert("add to cart")}
                >
                  Add to cart
                </Button>
                <IconButton onClick={() => handleProductInfo(product)}>
                  <InfoIcon sx={{ fontSize: "30px" }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BuyerDashboard;
