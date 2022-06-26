import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StoreModal from "./StoreModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.users);

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
    </>
  );
};

export default Profile;
