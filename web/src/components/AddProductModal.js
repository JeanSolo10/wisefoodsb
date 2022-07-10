import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Fragment,
} from "@mui/material";
import { set_user_store } from "../features/redux/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import foodTypes from "../utils/foodTypes";
import axios from "axios";
import axiosInstance from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (min-width:780px)": {
    width: 400,
  },
};

const AddProductModal = ({
  openAddProduct,
  handleCloseAddProduct,
  setListedItems,
  listedItems,
}) => {
  const [foodType, setFoodType] = useState("");
  const [error, setError] = useState("");
  const [imageName, setImageName] = useState("");
  const uploadInputRef = useRef(null);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleFileInput = (event) => {
    //TODO: Implement image upload logic
    // href also has access to data
    const fileData = event.target.files[0];
    setImageName(uploadInputRef.current.files[0].name);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const food_type = foodType;
    const price = data.get("price");
    const original_price = data.get("original_price");
    const expiration_date = data.get("expiration_date");
    const image =
      uploadInputRef.current && uploadInputRef.current.files
        ? uploadInputRef.current.files[0]
        : "";

    const formattedExpirationDate = new Date(expiration_date).toISOString();

    try {
      const awsUrlResponse = await axiosInstance.post("/api/v1/aws/s3Url/");
      const { url } = awsUrlResponse.data;
      await axios.put(url, image);
      const imageUrl = url.split("?")[0];

      const productData = {
        name,
        type: food_type,
        price: Number(price),
        original_price: Number(original_price),
        expiration_date: formattedExpirationDate,
        imageUrl: imageUrl,
        storeId: user.store.id,
      };

      const response = await axiosInstance.post(
        "/api/v1/products/",
        productData
      );
      const newItem = response.data.results.product;
      setListedItems([newItem, ...listedItems]);
      handleCloseAddProduct();
      setImageName("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
      open={openAddProduct}
      onClose={() => {
        setImageName("");
        handleCloseAddProduct();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleAddProduct}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Product Details
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
            name="name"
            label="Name"
            type="text"
            id="name"
            sx={{
              marginBottom: 3,
              marginTop: 3,
              "@media (min-width:780px)": {
                mb: 4,
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="type"
            label="Food type"
            type="text"
            id="type"
            sx={{
              marginBottom: 3,
              "@media (min-width:780px)": {
                mb: 4,
              },
            }}
            onChange={handleFoodTypeChange}
            defaultValue=""
            select
          >
            {foodTypes.map((type, index) => (
              <MenuItem key={index} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            required
            name="price"
            label="Price ( ¥ - yen )"
            type="number"
            id="price"
            sx={{
              marginBottom: 3,
              "@media (min-width:780px)": {
                mb: 4,
              },
            }}
          />
          <TextField
            fullWidth
            required
            name="original_price"
            label="Original price ( ¥ - yen )"
            type="number"
            id="original_price"
            sx={{
              marginBottom: 3,
              "@media (min-width:780px)": {
                mb: 4,
              },
            }}
          />
          <TextField
            fullWidth
            required
            name="expiration_date"
            type="date"
            id="expiration_date"
            defaultValue={""}
            sx={{
              marginBottom: 3,
              "@media (min-width:780px)": {
                mb: 4,
              },
            }}
            helperText="Expiration Date"
          />
          <Box
            sx={{
              mb: 1,
              textAlign: "center",
              ...(!imageName && {
                mb: 3,
              }),
            }}
          >
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <Button
              style={{
                backgroundColor: "#9aaab0",
                fontWeight: 600,
              }}
              onClick={() =>
                uploadInputRef.current && uploadInputRef.current.click()
              }
              variant="contained"
            >
              Upload Image
            </Button>
            {imageName ? (
              <Typography sx={{ mt: 2, mb: 2 }}>
                Selected Image: {imageName}
              </Typography>
            ) : null}
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          sx={{ mb: 20 }}
          variant="contained"
          style={{ backgroundColor: "#11AA60", fontWeight: 600 }}
        >
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
