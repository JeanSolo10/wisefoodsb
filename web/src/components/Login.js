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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //error validation
    validateEmail(data.get("email"));
    validatePassword(data.get("password"));
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
