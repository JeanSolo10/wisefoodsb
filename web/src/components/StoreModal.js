import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { set_user_store } from "../features/redux/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import hoursOfOperation from "../utils/openingHours";
import axiosInstance from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  height: "70vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (min-width:780px)": {
    width: 400,
  },
};

const StoreModal = ({ open, handleClose }) => {
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [error, setError] = useState("");

  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleOpeningHoursChange = (event) => {
    setOpeningHours(event.target.value);
  };

  const handleClosingHoursChange = (event) => {
    setClosingHours(event.target.value);
  };

  const handleAddStore = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("storeName");
    const address = data.get("address");
    const phone_number = data.get("phoneNumber");
    const opening_hours = openingHours;
    const closing_hours = closingHours;

    const body = {
      name: name,
      address: address,
      phone_number: phone_number,
      opening_hours: opening_hours,
      closing_hours: closing_hours,
      userId: user.id,
    };

    try {
      const addStoreResponse = await axiosInstance.post(
        "/api/v1/stores/",
        body
      );

      if (addStoreResponse.status === 201) {
        const storeData = {
          type: "add",
          payload: {
            name: name,
            address: address,
            phone_number: phone_number,
            opening_hours: opening_hours,
            closing_hours: closing_hours,
          },
        };
        dispatch(set_user_store(storeData));
        handleClose();
      }
    } catch (error) {
      setError("There was an error. Please try again later.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleAddStore}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Store Details
        </Typography>
        {error && (
          <Typography
            sx={{
              color: "#f44336",
              marginTop: 2,
            }}
          >
            {error}
          </Typography>
        )}
        <Box>
          <TextField
            required
            fullWidth
            name="storeName"
            label="Store name"
            type="text"
            id="storeName"
            style={{ marginBottom: 40, marginTop: 30 }}
          />
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            style={{ marginBottom: 40 }}
          />
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="number"
            id="phoneNumber"
            style={{ marginBottom: 30 }}
            helperText="Please enter only numbers"
          />
          <TextField
            name="openHour"
            label="Open Hour"
            type="text"
            id="openHour"
            select
            onChange={handleOpeningHoursChange}
            value={openingHours}
            style={{
              marginBottom: 20,
              width: "45%",
              marginRight: 28,
            }}
          >
            {hoursOfOperation.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="closeHour"
            label="Close Hour"
            type="text"
            id="closeHour"
            style={{ marginBottom: 20, width: "45%" }}
            onChange={handleClosingHoursChange}
            value={closingHours}
            select
          >
            {hoursOfOperation.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          type="submit"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          style={{ backgroundColor: "#11AA60" }}
        >
          Add Store
        </Button>
      </Box>
    </Modal>
  );
};

export default StoreModal;
