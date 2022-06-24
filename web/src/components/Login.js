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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login_user } from "../features/redux/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [noUserError, setNoUserError] = useState("");

  const user = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, []);

  /* handlers */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    //error validation
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (isValidEmail && isValidPassword) {
      try {
        const emailResponse = await axiosInstance.get("/api/v1/users/public", {
          params: {
            email: email,
          },
        });
        const isEmailInDatabase = emailResponse.data.results;
        if (isEmailInDatabase.email === undefined) {
          return setNoUserError("No user found with this Email!");
        }
        setNoUserError("");
        const body = { email, password };
        const loginResponse = await axiosInstance.post(
          "/api/v1/users/login",
          body
        );
        if (loginResponse.status === 200) {
          localStorage.setItem("jwt", loginResponse.data.results.accessToken);
          /*retrieve information*/
          const userData = await getUserData(email);
          dispatch(login_user(userData));
          navigate("/");
        }
      } catch (error) {
        if (error.response.status === 400) {
          setNoUserError("Invalid credentials");
        } else {
          setNoUserError("An error has occurred. Please try again later");
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

  const validateEmail = async (text) => {
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

  const validatePassword = async (text) => {
    if (text.length < 1) {
      setPasswordError("Please enter password!");
      return false;
    } else if (text.length > 6) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("Password must be at least 7 characters");
      return false;
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
            Log In
          </Typography>
          {noUserError && (
            <Typography
              sx={{
                color: "#f44336",
                marginTop: 2,
              }}
            >
              {noUserError}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {emailError && (
              <Typography
                sx={{
                  color: "#f44336",
                  width: 343,
                  "@media (min-width:780px)": {
                    width: 396,
                  },
                }}
              >
                {emailError}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {passwordError && (
              <Typography
                sx={{
                  color: "#f44336",
                  width: 343,
                  "@media (min-width:780px)": {
                    width: 396,
                  },
                }}
              >
                {passwordError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container direction="column" alignItems="center">
              <Grid item flexDirection="row">
                <Typography>
                  Don't have an account?
                  <Link
                    href="/register"
                    variant="body2"
                    style={{ paddingLeft: 5, fontSize: 16 }}
                  >
                    {"Register"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
