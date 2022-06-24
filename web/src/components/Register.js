import React, { useEffect, useState } from "react";
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
import { login_user } from "../features/redux/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Register = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [userRole, setUserRole] = useState("SELLER");
  const [error, setError] = useState("");

  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, []);

  /* handlers */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //error validation

    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("passwordConfirm");

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidPasswordConfirm = validatePasswordConfirm(
      password,
      passwordConfirm
    );

    if (isValidEmail && isValidPassword && isValidPasswordConfirm) {
      try {
        const emailResponse = await axiosInstance.get("/api/v1/users/public", {
          params: {
            email: email,
          },
        });
        const isEmailInDatabase = emailResponse.data.results;
        if (isEmailInDatabase.email !== undefined) {
          return setError("Email already exists!");
        }
        setError("");
        const role = userRole;
        const body = { email, password, role };

        const signupResponse = await axiosInstance.post(
          "/api/v1/users/register",
          body
        );

        if (signupResponse.status === 200) {
          /* login logic */
          const loginResponse = await axiosInstance.post(
            "/api/v1/users/login",
            body
          );
          localStorage.setItem("jwt", loginResponse.data.results.accessToken);
          const userData = await getUserData(email);
          dispatch(login_user(userData));
          navigate("/");
        }
      } catch (error) {
        if (error.response.status === 400) {
          setError("Invalid request");
        } else {
          setError("An error has occurred. Please try again later");
        }
      }
    }
  };

  const getUserData = async (email) => {
    const response = await axiosInstance.get("/api/v1/users/", {
      params: { email: email },
    });
    return response.data.results;
  };

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  const validateEmail = (text) => {
    if (text.length < 1) {
      setEmailError("Please enter email!");
      return false;
    } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Please enter a valid email!");
      return false;
    }
  };

  const validatePassword = (text) => {
    if (text.length < 1) {
      setPasswordError("Please enter password!");
      return false;
    } else if (text.length > 6) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("Password must be at least 7 characters");
      return true;
    }
  };

  const validatePasswordConfirm = (password, passwordConfirm) => {
    if (password.length < 1) {
      return false;
    } else if (passwordConfirm.length < 1) {
      setPasswordConfirmError("Please confirm password!");
      return false;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError("Passwords do not match!");
      return false;
    } else {
      setPasswordConfirmError("");
      return true;
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
