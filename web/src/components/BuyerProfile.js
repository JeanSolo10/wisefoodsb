import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResponsiveAppBar from "./ResponsiveAppBar";
import UpdateBuyerModal from "./UpdateBuyerModal";
import axiosInstance from "../utils/axios";

const BuyerProfile = () => {
  const [open, setOpen] = useState(false);
  const [foodSaved, setFoodSaved] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);
  const { store } = useSelector((state) => state.users);

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  useEffect(() => {
    fetchFoodSaved();
    fetchMoneySaved();
  }, [purchasedProducts]);

  const fetchFoodSaved = () => {
    setFoodSaved(purchasedProducts.length);
  };
  const fetchMoneySaved = () => {
    const totalMoneySaved = purchasedProducts.reduce((total, product) => {
      return total + (product.original_price - product.price);
    }, 0);
    setMoneySaved(totalMoneySaved);
  };
  const fetchPurchasedProducts = async () => {
    const response = await axiosInstance.get(
      `/api/v1/products/buyer/${user.id}`
    );
    setPurchasedProducts(response.data.results);
  };

  return (
    <>
      <ResponsiveAppBar />
      <UpdateBuyerModal open={open} handleClose={handleClose} />
      <Grid container mt={2}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            margin: 1,
            border: 1,
            borderColor: "black",
            "@media (min-width:780px)": {
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
              backgroundColor: "#DDE2E4",
              padding: 1,
            }}
          >
            Food Saved
          </Typography>

          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              textAlign: "center",
              padding: 1,
            }}
          >
            {`${foodSaved} Servings`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            margin: 1,
            border: 1,
            borderColor: "black",
            "@media (min-width:780px)": {
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
              backgroundColor: "#DDE2E4",
              padding: 1,
            }}
          >
            Money Saved
          </Typography>
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              textAlign: "center",
              padding: 1,
            }}
          >
            {`${moneySaved}¥`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            border: 1,
            borderColor: "black",
            margin: 1,
            "@media (min-width:780px)": {
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#DDE2E4",
            }}
          >
            <Typography
              align="center"
              sx={{ fontWeight: 600, fontSize: 18, padding: 1 }}
            >
              {user.first_name
                ? `${user.first_name} ${user.last_name}`
                : `Profile`}
            </Typography>
          </Box>
          <Box sx={{ padding: 1 }}>
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                Name
              </Typography>
              <Typography align="center">
                {user.first_name} {user.last_name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                Phone Number
              </Typography>
              <Typography align="center">{user.phone_number}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                Address
              </Typography>
              <Typography align="center">{user.address}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                Email
              </Typography>
              <Typography align="center">{user.email}</Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                gap: 2,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                }}
                onClick={handleOpen}
              >
                Update Profile
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#F40B27",
                }}
              >
                Delete Account
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            border: 1,
            borderColor: "black",
            margin: 1,
            maxHeight: 300,
            overflow: "auto",
            "@media (min-width:780px)": {
              marginLeft: "auto",
              marginRight: "auto",
              maxHeight: 350,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: "center",

              backgroundColor: "#DDE2E4",
              padding: 1,
            }}
          >
            Purchased Products
          </Typography>

          {purchasedProducts.map((product, index) => (
            <Accordion key={index} sx>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ backgroundColor: "#eaeff1" }}
              >
                <Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>Price</Typography>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textAlign: "center",
                      padding: 1,
                    }}
                  >{`¥${product.price}`}</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      padding: 1,
                      fontWeight: 700,
                    }}
                  >
                    Store Address
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textAlign: "center",
                      padding: 1,
                    }}
                  >
                    {product.Store.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      padding: 1,
                      fontWeight: 700,
                    }}
                  >
                    Store Phone Number
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textAlign: "center",
                      padding: 1,
                    }}
                  >
                    {product.Store.phone_number}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BuyerProfile;
