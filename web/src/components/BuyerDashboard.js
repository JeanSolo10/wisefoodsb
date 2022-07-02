import React, { useEffect, useState } from "react";
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
import axiosInstance from "../utils/axios";
import formatDate from "../utils/formatDate";

const BuyerDashboard = () => {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [listedProducts, setListedProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchListedProducts();
  }, []);

  const fetchListedProducts = async () => {
    const response = await axiosInstance.get(`/api/v1/products/`);
    const products = response.data.results;
    setListedProducts(products);
  };

  const handleProductInfo = (product) => {
    setSelectedProduct(product);
    handleOpen();
  };

  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      <ProductInfoModal
        open={open}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
      <Typography
        sx={{
          textAlign: "center",
          pt: 2,
          fontSize: "1.5rem",
          mb: 2,
          "@media (min-width:780px)": {
            mb: 3,
          },
        }}
      >
        Welcome{user.first_name ? ` ${user.first_name}!` : `!`}
      </Typography>
      <Box
        sx={{
          "@media (min-width:780px)": {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 400px)", //the width of the card
            justifyContent: "center",
            gridGap: "40px",
          },
        }}
      >
        {listedProducts.map((product, index) => (
          <Card key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#DDE2E4",
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
                Best before {formatDate(product.expiration_date)}
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
                    backgroundColor: "#DDE2E4",
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
