import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { set_user_buyer_data } from "../features/redux/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import formatDate from "../utils/formatDate";
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

const ProductInfoModal = ({ open, handleClose, selectedProduct }) => {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    fetchStoreName(selectedProduct.storeId);
  }, [selectedProduct]);

  const fetchStoreName = async (storeId) => {
    const response = await axiosInstance.get(`/api/v1/stores/${storeId}`);
    const storeName = response.data.results.name;
    setStoreName(storeName);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Product Details
        </Typography>
        <Box
          component="img"
          sx={{
            height: 250,
            width: "100%",
          }}
          alt={`${selectedProduct.name}`}
          src={`${selectedProduct.imageUrl}`}
        />
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Original price</Typography>
          <Typography>{`¥${selectedProduct.original_price}`}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Current Price</Typography>
          <Typography>{`¥${selectedProduct.price}`}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Type</Typography>
          <Typography>{selectedProduct.type}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Shop</Typography>
          <Typography>{storeName}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Best Before</Typography>
          <Typography>{formatDate(selectedProduct.expiration_date)}</Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, backgroundColor: "primary.main" }}
          onClick={() => alert("add to cart")}
        >
          Add to Cart
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductInfoModal;
