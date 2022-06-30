import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Typography } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import BuyerModal from "./BuyerModal";

const BuyerProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);
  const { store } = useSelector((state) => state.users);

  return (
    <>
      <ResponsiveAppBar />
      <BuyerModal open={open} handleClose={handleClose} />
      <Grid container>
        <Grid item xs={6} md={8}>
          <Typography>Food Saved</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography>Money Saved</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ border: 1, borderColor: "black" }}>
          <Box
            sx={{
              backgroundColor: "#DDE2E4",
            }}
          >
            <Typography
              align="center"
              style={{ fontWeight: 600, fontSize: 18 }}
            >
              {user.first_name
                ? `Hello! ${user.first_name} ${user.last_name}`
                : `Profile`}
            </Typography>
          </Box>
          <Box>
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
        <Grid item xs={12} md={8}>
          <Typography>Items Purchased</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default BuyerProfile;
