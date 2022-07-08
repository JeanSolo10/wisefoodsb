import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResponsiveAppBar from "./ResponsiveAppBar";
import UpdateBuyerModal from "./UpdateBuyerModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../features/redux/users/userSlice";
import axiosInstance from "../utils/axios";

const BuyerProfile = () => {
  const [open, setOpen] = useState(false);
  const [foodSaved, setFoodSaved] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Dialog Reqs */
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClose = async () => {
    try {
      await axiosInstance.delete(`/api/v1/users/${user.id}`);
      dispatch(logout_user());
      navigate("/register", { replace: true });
    } catch (error) {
      setError(error.message);
    }
    setOpen(false);
    handleDialogClose();
  };

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
      {!user.first_name ? (
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
            Please add a First Name (can be username) for your profile, by
            clicking on the Update Profile button below.
            <br />
            <br />
            This will help the store know who will pickup the product. Other
            fields are not required, but can be added.
          </Typography>
        </Box>
      ) : null}
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
                onClick={handleDialogOpen}
              >
                Delete Account
              </Button>
              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContentText sx={{ textAlign: "center" }}>
                  All your information will be deleted from the site.
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleDialogClose}>Cancel</Button>
                  <Button onClick={handleDeleteClose} autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
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
            <Accordion key={index}>
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
                    {product.Store.address}
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
