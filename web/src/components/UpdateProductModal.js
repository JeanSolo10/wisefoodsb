import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import foodTypes from "../utils/foodTypes";
import axiosInstance from "../utils/axios";
import axios from "axios";

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
};

const UpdateProductModal = ({
  openUpdateProduct,
  handleCloseUpdateProduct,
  selectedProduct,
  listedItems,
  setListedItems,
  selectedProductIndex,
}) => {
  const [error, setError] = useState("");
  const [foodType, setFoodType] = useState("");
  const [imageName, setImageName] = useState("");
  const [date, setDate] = useState("");
  const user = useSelector((state) => state.users);
  const uploadInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    convertDate(selectedProduct.expiration_date, "standardDate");
  }, [selectedProduct]);

  const handleFileInput = (event) => {
    //TODO: Implement image upload logic
    // href also has access to data
    const fileData = event.target.files[0];
    setImageName(uploadInputRef.current.files[0].name);
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const convertDate = (date, conversionType) => {
    if (conversionType === "ISOS") {
      const convertedDate = new Date(date).toISOString();
      return convertedDate;
    }
    if (conversionType === "standardDate") {
      const originalDate = new Date(date);
      let month = originalDate.getMonth() + 1;
      let day = originalDate.getDate() + 1;
      const year = originalDate.getFullYear();

      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      const convertedDate = `${year}-${month}-${day}`;
      setDate(convertedDate);
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const food_type = foodType ? foodType : selectedProduct.type;
    const price = data.get("price");
    const original_price = data.get("original_price");
    const expiration_date = data.get("expiration_date");
    const image =
      uploadInputRef.current && uploadInputRef.current.files[0]
        ? uploadInputRef.current.files[0]
        : selectedProduct.imageUrl;

    const formattedExpirationDate = convertDate(expiration_date, "ISOS");

    try {
      if (image !== selectedProduct.imageUrl) {
        const awsUrlResponse = await axiosInstance.post("/api/v1/aws/s3Url");
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

        const response = await axiosInstance.put(
          `/api/v1/products/${selectedProduct.id}`,
          productData
        );
        const updatedItem = response.data.results;
        const currentItems = listedItems;
        currentItems[selectedProductIndex] = updatedItem;
        setListedItems(currentItems);
        handleCloseUpdateProduct();
      } else {
        const productData = {
          name,
          type: food_type,
          price: Number(price),
          original_price: Number(original_price),
          expiration_date: formattedExpirationDate,
          imageUrl: image,
          storeId: user.store.id,
        };

        const response = await axiosInstance.put(
          `/api/v1/products/${selectedProduct.id}`,
          productData
        );
        const updatedItem = response.data.results;
        const currentItems = listedItems;
        currentItems[selectedProductIndex] = updatedItem;
        setListedItems(currentItems);
        handleCloseUpdateProduct();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  /* Dialog Reqs */
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/products/${selectedProduct.id}`
      );
      const currentItems = listedItems;
      currentItems.splice(selectedProductIndex, 1);
      setListedItems(currentItems);
    } catch (error) {
      setError(error.message);
    }

    setOpen(false);
    handleCloseUpdateProduct();
  };

  return (
    <Modal
      open={openUpdateProduct}
      onClose={() => {
        setImageName("");
        handleCloseUpdateProduct();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleUpdateProduct}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Product Details
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
            defaultValue={selectedProduct.name}
            style={{ marginBottom: 20, marginTop: 30 }}
          />
          <TextField
            required
            fullWidth
            name="type"
            label="Food type"
            type="text"
            id="type"
            style={{ marginBottom: 20 }}
            onChange={handleFoodTypeChange}
            defaultValue={selectedProduct.type}
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
            label="Price"
            type="number"
            id="price"
            defaultValue={selectedProduct.price}
            style={{ marginBottom: 20 }}
          />
          <TextField
            fullWidth
            required
            name="original_price"
            label="Original price"
            type="number"
            id="original_price"
            defaultValue={selectedProduct.original_price}
            style={{
              marginBottom: 20,
            }}
          />
          <TextField
            fullWidth
            required
            name="expiration_date"
            type="date"
            id="expiration_date"
            style={{ marginBottom: 20 }}
            defaultValue={date}
            helperText="Expiration Date"
          />
          <Box
            sx={{
              mb: 1,
              textAlign: "center",
              ...(!selectedProduct.imageUrl && {
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
                backgroundColor: "#B2BEC3",
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
                New Image: {imageName}
              </Typography>
            ) : selectedProduct.imageUrl ? (
              <Typography sx={{ mt: 2, mb: 2 }}>
                Current Image description: {selectedProduct.name}
              </Typography>
            ) : uploadInputRef.current && uploadInputRef.current.files[0] ? (
              <Typography sx={{ mt: 2, mb: 2 }}>
                {uploadInputRef.current.files[0].name}
              </Typography>
            ) : null}
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          sx={{ mb: 2, backgroundColor: "primary.main" }}
          variant="contained"
        >
          Update Product
        </Button>
        <Button
          onClick={handleClickOpen}
          fullWidth
          style={{ backgroundColor: "red" }}
          variant="contained"
        >
          Delete Product
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this product?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteClose} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
