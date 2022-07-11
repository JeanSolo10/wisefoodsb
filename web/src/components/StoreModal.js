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
  "@media (min-width:769px)": {
    width: 400,
  },
};

const StoreModal = ({ open, handleClose }) => {
  const user = useSelector((state) => state.users);
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(user.store?.name !== undefined);

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

    setError("");

    if (isNaN(Number(phone_number))) {
      setError("Phone number must contain numbers only!");
      return;
    }

    const body = {
      name: name,
      address: address,
      phone_number: phone_number,
      opening_hours: opening_hours,
      closing_hours: closing_hours,
      userId: user.id,
    };

    try {
      if (isEdit) {
        const editBody = body;
        delete editBody.userId;
        const editStoreResponse = await axiosInstance.put(
          `/api/v1/stores/${user.store.id}`,
          editBody
        );

        if (editStoreResponse.status === 201) {
          const userData = {
            type: "update",
            payload: editBody,
          };
          dispatch(set_user_store(userData));
          handleClose();
        }
      } else {
        const addStoreResponse = await axiosInstance.post(
          "/api/v1/stores/",
          body
        );

        const { id } = addStoreResponse.data.results.store;

        if (addStoreResponse.status === 201) {
          const storeData = {
            type: "add",
            payload: {
              name: name,
              address: address,
              phone_number: phone_number,
              opening_hours: opening_hours,
              closing_hours: closing_hours,
              id: id,
            },
          };
          dispatch(set_user_store(storeData));
          setIsEdit(true);
          handleClose();
        }
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: 2 }}
        >
          {isEdit ? "Edit Store Details" : "Add Store Details"}
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
            defaultValue={user.store.name}
            sx={{ marginBottom: 4, marginTop: 3 }}
          />
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            defaultValue={user.store.address}
            sx={{ marginBottom: 4 }}
          />
          <TextField
            fullWidth
            required
            name="phoneNumber"
            label="Phone Number"
            type="text"
            id="phoneNumber"
            sx={{ marginBottom: 4 }}
            helperText="Please enter only numbers"
            defaultValue={user.store.phone_number}
            error={
              error === "Phone number must contain numbers only!" ? true : false
            }
          />
          <TextField
            name="openHour"
            label="Open Hour"
            type="text"
            id="openHour"
            select
            onChange={handleOpeningHoursChange}
            defaultValue={isEdit ? user.store.opening_hours : openingHours}
            sx={{
              marginBottom: 4,
              width: "45%",
              marginRight: 3.5,
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
            sx={{ marginBottom: 4, width: "45%" }}
            onChange={handleClosingHoursChange}
            defaultValue={
              isEdit && user.store.closing_hours
                ? user.store.closing_hours
                : closingHours
            }
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
          style={{ backgroundColor: isEdit ? "#1976d2" : "#11AA60" }}
        >
          {isEdit ? "Edit Store" : "Add Store"}
        </Button>
      </Box>
    </Modal>
  );
};

export default StoreModal;
