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
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productData } from "../mockData/data";
import InfoIcon from "@mui/icons-material/Info";
import ProductInfoModal from "./ProductInfoModal";
import axiosInstance from "../utils/axios";
import formatDate from "../utils/formatDate";
import { add_product, remove_product } from "../features/redux/cart/cartSlice";
import foodTypesFilters from "../utils/foodTypesFilters";
import expirationDateFilters from "../utils/expirationDateFilters";

const BuyerDashboard = () => {
  const user = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [listedProducts, setListedProducts] = useState([]);

  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const [expirationDateSort, setExpirationDateSort] = useState("all");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFoodTypeChange = (event) => {
    const foodType = event.target.value;
    setFoodTypeFilter(event.target.value);
    handleSortAndFilter(foodType, expirationDateSort);
  };

  const handleDateChange = (event) => {
    const sortProducstBy = event.target.value;
    setExpirationDateSort(sortProducstBy);
    handleSortAndFilter(foodTypeFilter, sortProducstBy);
  };

  const handleSortAndFilter = (foodType, sortProducstBy) => {
    if (foodType === "all" && sortProducstBy === "all") {
      return setListedProducts(allProducts);
    }

    // filter products
    const filteredProducts = filterProducts(allProducts, foodType);
    // sort products
    const sortedProducts = sortProducts(filteredProducts, sortProducstBy);

    return setListedProducts(sortedProducts);
  };

  const filterProducts = (products, criteria) => {
    if (criteria === "all") {
      return products;
    } else {
      const filteredProducts = products.filter((product) => {
        return product.type === criteria;
      });
      return filteredProducts;
    }
  };

  const sortProducts = (products, criteria) => {
    if (criteria === "all") {
      return products;
    } else if (criteria === "asc") {
      const sortedProducts = products.sort((productOne, productTwo) => {
        return (
          new Date(productOne.expiration_date) -
          new Date(productTwo.expiration_date)
        );
      });
      return sortedProducts;
    } else {
      const sortedProducts = products.sort((productOne, productTwo) => {
        return (
          new Date(productTwo.expiration_date) -
          new Date(productOne.expiration_date)
        );
      });
      return sortedProducts;
    }
  };

  useEffect(() => {
    fetchListedProducts();
  }, []);

  const fetchListedProducts = async () => {
    const response = await axiosInstance.get(
      `/api/v1/products/available/${true}`
    );
    const products = response.data.results;

    // filter out expired food
    const dateToday = new Date();
    const notExpiredFoods = products.filter((product) => {
      const productExpirationDate = new Date(product.expiration_date);
      return dateToday < productExpirationDate;
    });
    setAllProducts(notExpiredFoods);
    setListedProducts(notExpiredFoods);
  };

  const handleProductInfo = (product) => {
    setSelectedProduct(product);
    handleOpen();
  };

  const handleAddToCart = (product) => {
    dispatch(add_product(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(remove_product(product));
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
          display: "flex",
          flexDirection: "column",
          "@media (min-width:780px)": {
            flexDirection: "row",
            gap: 10,
            marginLeft: 12,
            marginRight: 12,
          },
        }}
      >
        <TextField
          fullWidth
          name="type"
          label="Food type"
          type="text"
          id="type"
          sx={{
            marginBottom: 3,
            "@media (min-width:780px)": {
              mb: 4,
            },
          }}
          onChange={handleFoodTypeChange}
          defaultValue={foodTypesFilters[0].value}
          select
        >
          {foodTypesFilters.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          name="date"
          label="Date type"
          type="text"
          id="date"
          sx={{
            marginBottom: 3,
            "@media (min-width:780px)": {
              mb: 4,
            },
          }}
          onChange={handleDateChange}
          defaultValue={expirationDateFilters[0].value}
          select
        >
          {expirationDateFilters.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {listedProducts.length < 1 && (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 22, mt: 2 }}>
            No products available!
          </Typography>
        </Box>
      )}
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
          <Card key={index} sx={{ mb: 2 }}>
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
                objectFit: "contain",
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
                {products === null ||
                products.some((element) => element.id === product.id) !==
                  true ? (
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
                      fontWeight: 600,
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: 500,
                      height: "auto",
                      width: 200,
                      color: "black",
                      fontFamily: "Helvetica",
                    }}
                    style={{
                      backgroundColor: "#FF0002",
                      color: "white",
                      fontWeight: 600,
                    }}
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove from cart
                  </Button>
                )}
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
