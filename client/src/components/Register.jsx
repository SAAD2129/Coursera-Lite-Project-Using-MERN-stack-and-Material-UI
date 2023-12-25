import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, TextField, Typography } from "@mui/material";
import { useGlobalContext } from "../states/Context";
import { Link } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { disableAlert, alert, setAlert, setAlertMsg, setAlertType } =
    useGlobalContext();
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setAlert(true);
    setAlertMsg(data.message);
    if (data.success) {
      setAlertType("success");
      setUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      localStorage.setItem("auth-token", data.token);

      window.location.href = "/";
    } else {
      setAlertType("error");
    }
    disableAlert();
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <UserLayout>
      <Box>
        <form
          onSubmit={handleRegisterForm}
          className="shadow-lg w-3/5 p-16 mx-auto "
        >
          <h3 className="text-2xl font-bold mb-8">Register Account</h3>
          <div className="my-4">
            <TextField
              label="User Name"
              variant="outlined"
              className="w-full"
              type="text"
              name="username"
              autoComplete="off"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              className="w-full"
              name="email"
              value={user.email}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <TextField
              label="Password"
              variant="outlined"
              className="w-full"
              type="password"
              value={user.password}
              autoComplete="new-password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <TextField
              label="Confirm Password"
              type="password"
              className="w-full"
              value={user.confirmPassword}
              autoComplete="new-password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Profile
            <VisuallyHiddenInput type="file" />
          </Button>
          <div className="text-center mt-4">
            <Typography>
              Have an account
              <Link to={"/login"} className="text-blue-400 hover:text-blue-300">
                {" "}
                Login{" "}
              </Link>
              here
            </Typography>
          </div>
          <div className="my-8 text-center">
            <Button
              type="submit"
              className="w-1/2 mx-auto block"
              variant="contained"
            >
              Register
            </Button>
          </div>
        </form>
      </Box>
    </UserLayout>
  );
};

export default Register;
