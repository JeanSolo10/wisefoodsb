import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { set_user_buyer_data } from "../features/redux/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
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
  "@media (min-width:769px)": {
    width: 400,
  },
};

const UpdateBuyerModal = ({ open, handleClose }) => {
  const [error, setError] = useState("");

  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleAddStore = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const phone_number = data.get("phoneNumber");
    const email = data.get("email");
    const address = data.get("address");

    setError("");

    if (isNaN(Number(phone_number))) {
      setError("Phone number must contain numbers only!");
      return;
    }

    const body = {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email,
      address: address,
    };

    try {
      const updateUserResponse = await axiosInstance.put(
        `/api/v1/users/${user.id}`,
        body
      );

      if (updateUserResponse.status === 201) {
        const userData = {
          type: "update",
          payload: {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address: address,
          },
        };
        dispatch(set_user_buyer_data(userData));
        handleClose();
      }
    } catch (error) {
      setError("There was an error. Please try again later.");
    } finally {
      setError("");
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
          Update Profile Details
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
            name="first_name"
            label="First Name"
            type="text"
            id="first_name"
            defaultValue={user.first_name}
            style={{ marginBottom: 30, marginTop: 30 }}
          />
          <TextField
            fullWidth
            name="last_name"
            label="Last Name"
            type="text"
            id="last_name"
            defaultValue={user.last_name}
            style={{ marginBottom: 30 }}
          />
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="text"
            id="phoneNumber"
            defaultValue={user.phone_number}
            style={{ marginBottom: 10 }}
            helperText="Please enter only numbers"
            error={
              error === "Phone number must contain numbers only!" ? true : false
            }
          />
          <TextField
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            defaultValue={user.address}
            style={{ marginBottom: 30 }}
          />
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
            defaultValue={user.email}
            style={{ marginBottom: 30 }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "primary.main",
            fontWeight: 600,
          }}
        >
          Update Profile
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateBuyerModal;
