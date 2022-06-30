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
import AddProductModal from "./AddProductModal";
import axiosInstance from "../utils/axios";

const SellerDashboard = () => {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [listedItems, setListedItems] = useState([]);

  /* Add Product Modal*/
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);

  useEffect(() => {
    fetchListedItems();
  }, []);

  const fetchListedItems = async () => {
    const response = await axiosInstance.get(
      `/api/v1/products/store/${user.store.id}`
    );
    const products = response.data.results;
    setListedItems(products);
  };

  const handleAddProduct = () => {
    handleOpenAddProduct();
  };

  const handleProductInfo = (product) => {
    setSelectedProduct(product);
    handleCloseAddProduct();
  };

  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      <AddProductModal
        openAddProduct={openAddProduct}
        handleCloseAddProduct={handleCloseAddProduct}
        selectedProduct={selectedProduct}
        setListedItems={setListedItems}
        listedItems={listedItems}
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
        Currently Listed
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
        marginBottom={2}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#11AA60" }}
          sx={{
            "@media (min-width:780px)": {
              mb: 3,
            },
          }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>
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
        {listedItems.map((product, index) => (
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
                    backgroundColor: "#DDE2E4",
                  }}
                  onClick={() => alert("Edit Product")}
                >
                  Edit Product
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

export default SellerDashboard;
