import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Register = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [userRole, setUserRole] = useState("SELLER");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //error validation
    validateEmail(data.get("email"));
    validatePassword(data.get("password"));
    validatePasswordConfirm(data.get("password"), data.get("passwordConfirm"));
  };

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  const validateEmail = (text) => {
    if (text.length < 1) {
      return setEmailError("Please enter email!");
    } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      return setEmailError("");
    } else {
      return setEmailError("Please enter a valid email!");
    }
  };

  const validatePassword = (text) => {
    if (text.length < 1) {
      return setPasswordError("Please enter password!");
    } else if (text.length > 6) {
      return setPasswordError("");
    } else {
      return setPasswordError("Password must be at least 7 characters");
    }
  };

  const validatePasswordConfirm = (password, passwordConfirm) => {
    if (password.length < 1) {
      return;
    } else if (passwordConfirm.length < 1) {
      return setPasswordConfirmError("Please confirm password!");
    } else if (password !== passwordConfirm) {
      console.log(password);
      console.log(passwordConfirm);
      return setPasswordConfirmError("Passwords do not match!");
    } else {
      return setPasswordConfirmError("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            WiseFoodSB
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.primary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {emailError && (
                <Typography
                  sx={{
                    color: "#f44336",
                    marginLeft: 3,
                    paddingTop: 1,
                  }}
                >
                  {emailError}
                </Typography>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {passwordError && (
                <Typography
                  sx={{
                    color: "#f44336",
                    marginLeft: 3,
                    paddingTop: 1,
                  }}
                >
                  {passwordError}
                </Typography>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-passwordConfirmation"
                />
              </Grid>
              {passwordConfirmError && (
                <Typography
                  sx={{
                    color: "#f44336",
                    marginLeft: 3,
                    paddingTop: 1,
                  }}
                >
                  {passwordConfirmError}
                </Typography>
              )}
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={userRole}
                    label="Role"
                    onChange={handleChange}
                    defaultValue={"SELLER"}
                  >
                    <MenuItem value={"SELLER"}>SELLER</MenuItem>
                    <MenuItem value={"BUYER"}>BUYER</MenuItem>
                  </Select>
                  <FormHelperText
                    style={{ marginLeft: 3, fontSize: 15, marginBottom: 6 }}
                  >
                    Register As Buyer or Seller
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Register
            </Button>
            <Grid container direction="column" alignItems="center">
              <Typography>
                Already have an account?
                <Link
                  href="/login"
                  variant="body2"
                  style={{ paddingLeft: 5, fontSize: 16 }}
                >
                  {"Login"}
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
