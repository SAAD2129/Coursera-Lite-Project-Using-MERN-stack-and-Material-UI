import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useGlobalContext } from "../states/Context";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../states/Actors/Auth";
import UserLayout from "./Layouts/UserLayout";
import { toast } from "react-toastify";
import LoaderSlow from "./LoaderSlow";
const Login = () => {
  const [user, setUser] = useState({
    loginId: "",
    password: "",
  });
  const { disableAlert, alert, setAlert, setAlertMsg, setAlertType } =
    useGlobalContext();
  const { isAuthenticated, loading } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLoginForm = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    if (isAuthenticated) {
      setUser({
        loginId: "",
        password: "",
      });
      nav("/");
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    nav(-1);
  }
  return (
    <UserLayout>
      <Box>
        {loading ? (
          <LoaderSlow />
        ) : (
          <form
            onSubmit={handleLoginForm}
            className="shadow-lg w-3/5 p-16 mx-auto "
          >
            <h3 className="text-2xl font-bold mb-8">Login Account</h3>
            <div className="my-4">
              <TextField
                label="Email or User Name"
                variant="outlined"
                className="w-full"
                type="text"
                name="loginId"
                autoComplete="off"
                value={user.loginId}
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
            <div className="text-center">
              <Typography>
                Have an account
                <Link
                  className="text-blue-400 hover:text-blue-300"
                  to={"/register"}
                >
                  {" "}
                  Sign Up{" "}
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
                Login
              </Button>
            </div>
          </form>
        )}
      </Box>
    </UserLayout>
  );
};

export default Login;
