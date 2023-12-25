import React, { useEffect } from "react";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../states/Actors/Auth";
import ActionAlerts from "../components/Alert";
import { useGlobalContext } from "../states/Context";

const Header = () => {
  const dispatch = useDispatch();
  const { toggleTheme, theme } = useGlobalContext();
  const { user } = useSelector((state) => state.authentication);
  useEffect(() => {
    dispatch(getUserInfo());
    console.log(theme);
  }, [dispatch, theme]);
  return (
    <div
      className={`sticky top-0 h-16 z-50 ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }  mb-8 flex justify-between items-center`}
    >
      <Link to={"/"}>
        <h2 className="text-3xl font-bold">Coursera</h2>
      </Link>
      <div>
        
        <Tooltip
          onClick={toggleTheme}
          title={`${theme === "light" ? "Dark Mode" : "Light Mode"}  `}
        >
          <IconButton>
            <ModeNightIcon />
          </IconButton>
        </Tooltip>
      </div>
      <ActionAlerts />
    </div>
  );
};

export default Header;
