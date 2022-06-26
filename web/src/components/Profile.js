import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Box, Grid, Typography } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StoreModal from "./StoreModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);
  const { store } = useSelector((state) => state.users);

  return (
    <>
      <ResponsiveAppBar />
      {!user.store && (
        <>
          <StoreModal open={open} handleClose={handleClose} />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#11AA60" }}
              onClick={handleOpen}
            >
              Add Store
            </Button>
          </Box>
        </>
      )}

      {user.store && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <Typography>Food Saved</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography>Money Saved</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  borderTop: 1,
                  borderRight: 1,
                  borderLeft: 1,
                  borderColor: "black",
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#EEEEEE",
                  }}
                  align="center"
                >
                  {store.name}
                </Typography>
              </Box>
              <Box sx={{ border: 1, borderColor: "black" }}>
                <Box sx={{ mb: 2, mt: 1 }}>
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
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "primary.main",
                    }}
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
            <Grid item xs={12} md={8}>
              <Typography>Sold Items</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Profile;
