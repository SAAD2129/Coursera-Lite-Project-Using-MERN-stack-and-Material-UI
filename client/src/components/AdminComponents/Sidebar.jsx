import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button } from "@mui/material";
import Dashboard from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logoutUser } from "../../states/Actors/Auth";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
export default function Sidebar() {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logOut = async () => {
    localStorage.removeItem("auth-token");
    dispatch(logoutUser());
    dispatch(getUserInfo());
    if (!isAuthenticated) nav("/login");
  };
  return (
    <div className="w-1/5 fixed h-[100vh] right-0">
      <Paper
        className="flex flex-col justify-between py-8"
        sx={{ maxWidth: "100%", height: "100%" }}
      >
        <MenuList>
          <Link to={`/admin/dashboard`}>
            <MenuItem className="!p-4">
              <ListItemIcon>
                <Dashboard fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
          </Link>
          <Link to={`/admin/users`}>
            <MenuItem className="!p-4">
              <ListItemIcon>
                <GroupsIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </MenuItem>
          </Link>
          <Link to={`/admin/courses`}>
            <MenuItem className="!p-4">
              <ListItemIcon>
                <SchoolIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Courses</ListItemText>
            </MenuItem>
          </Link>
          <Link to={`/admin/course`}>
            <MenuItem className="!p-4">
              <ListItemIcon>
                <AddCircleIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Add Course</ListItemText>
            </MenuItem>
          </Link>
          <Divider />
        </MenuList>
        <div className=" mb-4 mx-auto">
          <Button onClick={logOut} variant="contained" color="secondary">
            Logout
          </Button>
        </div>
      </Paper>{" "}
    </div>
  );
}
