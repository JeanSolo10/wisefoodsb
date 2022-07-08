import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Typography } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StoreModal from "./StoreModal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from "../utils/axios";

const SellerProfile = () => {
  const [open, setOpen] = useState(false);
  const [foodSaved, setFoodSaved] = useState(0);
  const [moneyEarned, setMoneyEarned] = useState(0);
  const [soldProducts, setSoldProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);
  const { store } = useSelector((state) => state.users);

  useEffect(() => {
    if (Object.keys(user.store).length !== 0) {
      fetchSoldProducts();
    }
  }, [user.store]);

  useEffect(() => {
    if (Object.keys(user.store).length !== 0) {
      fetchFoodSaved();
      fetchMoneyEarned();
    }
  }, [soldProducts]);

  const fetchFoodSaved = () => {
    setFoodSaved(soldProducts.length);
  };
  const fetchMoneyEarned = () => {
    const totalMoneySaved = soldProducts.reduce((total, product) => {
      return total + product.price;
    }, 0);
    setMoneyEarned(totalMoneySaved);
  };
  const fetchSoldProducts = async () => {
    const response = await axiosInstance.get(
      `/api/v1/products/store/${store.id}/transaction/COMPLETE`
    );
    setSoldProducts(response.data.results);
  };

  return (
    <>
      <ResponsiveAppBar />
      {Object.keys(user.store).length === 0 && (
        <>
          <StoreModal open={open} handleClose={handleClose} />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Typography
              sx={{
                marginBottom: 2,
                padding: 1,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              Welcome to WiseFoodSB!
            </Typography>
            <Typography sx={{ marginBottom: 2, padding: 1, fontSize: 18 }}>
              Please add your store information by clicking the "Add Store"
              button below
            </Typography>
            <Typography sx={{ marginBottom: 2, padding: 1, fontSize: 18 }}>
              Once a store is added. You can go into the dashboard by clicking
              on the top left corner logo, and begin adding products to sell!
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "#11AA60" }}
              onClick={handleOpen}
              sx={{ width: 200, mt: 2 }}
            >
              Add Store
            </Button>
          </Box>
        </>
      )}

      <StoreModal open={open} handleClose={handleClose} isEdit={true} />
      {Object.keys(user.store).length !== 0 && (
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
              Money Earned
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                textAlign: "center",
                padding: 1,
              }}
            >
              {`${moneyEarned}¥`}
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
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                {store.name}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ mb: 2, mt: 2 }}>
                <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                  Adress
                </Typography>
                <Typography align="center">{store.address}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                  Business Hours
                </Typography>
                <Typography align="center">
                  {store.opening_hours} - {store.closing_hours}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography align="center" sx={{ mb: 1, fontWeight: 600 }}>
                  Phone Number
                </Typography>
                <Typography align="center">{store.phone_number}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  gap: 2,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                  onClick={handleOpen}
                >
                  Edit Store
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#F40B27",
                  }}
                >
                  Delete Store
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
              Products Sold
            </Typography>

            {soldProducts.map((product, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: "#eaeff1" }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {product.name}
                  </Typography>
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
                      Customer
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.6)",
                        textAlign: "center",
                        padding: 1,
                      }}
                    >
                      {`${product.User.first_name} ${product.User.last_name}`}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SellerProfile;
