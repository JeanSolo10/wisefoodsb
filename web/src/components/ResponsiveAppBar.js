import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout_user } from "../features/redux/users/userSlice";
import axiosInstance from "../utils/axios";

const pages = ["Cart"];
const settings = ["Profile", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (e) => {
    if (e.currentTarget.innerText === "Profile") {
      if (user.role === "SELLER") {
        navigate("/seller_profile");
      } else {
        navigate("/buyer_profile");
      }
    }
    if (e.currentTarget.innerText === "Logout") {
      localStorage.removeItem("jwt");
      await axiosInstance.delete(`/api/v1/users/logout/${user.id}`);
      dispatch(logout_user());
      navigate("/login", { replace: true });
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#11AA60" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WISEFOODSB
          </Typography>

          {user.role === "BUYER" && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Box onClick={() => navigate("/cart")}>
                <ShoppingCartIcon />
              </Box>
              <Box
                sx={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginLeft: 0.5,
                  borderColor: "error.main",
                  width: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  {products ? products.length : 0}
                </Typography>
              </Box>
            </Box>
          )}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WISEFOODSB
          </Typography>
          {user.role === "BUYER" ? (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              style={{
                flexDirection: "row-reverse",
                paddingRight: 30,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginLeft: 1,
                  borderColor: "error.main",
                  width: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  {products ? products.length : 0}
                </Typography>
              </Box>
              <Button
                style={{
                  backgroundColor: "white",
                  fontSize: "16px",
                  color: "green",
                }}
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              style={{
                flexDirection: "row-reverse",
                paddingRight: 30,
              }}
            ></Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountBoxIcon
                  sx={{
                    display: { xs: "flex", md: "flex" },
                    mr: 1,
                    color: "white",
                    fontSize: 40,
                    "@media (min-width:780px)": {
                      fontSize: 45,
                      mr: 2,
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  value={"RANDOM"}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
