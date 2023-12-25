import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import JavascriptRoundedIcon from "@mui/icons-material/JavascriptRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../states/Context";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, logoutUser } from "../states/Actors/Auth";
import LoadingButton from "@mui/lab/LoadingButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  { text: "Home", icon: <HomeOutlinedIcon />, route: "/" },
  { text: "About", icon: <InfoOutlinedIcon />, route: "/about" },
  { text: "Contact", icon: <ContactSupportOutlinedIcon />, route: "/contact" },
  {
    text: "Browse all courses",
    icon: <OpenInBrowserOutlinedIcon />,
    route: "/courses",
  },
];
const categories = [
  { text: "Web Development", icon: <LanguageRoundedIcon /> },
  { text: "Android Development", icon: <JavascriptRoundedIcon /> },
  { text: "Frontend Development", icon: <WebAssetRoundedIcon /> },
  { text: "Backend Development", icon: <PsychologyRoundedIcon /> },
  { text: "IOS Development", icon: <PhoneIphoneRoundedIcon /> },
  { text: "Desktop App Development", icon: <ComputerRoundedIcon /> },
];
export default function SwipeableTemporaryDrawer() {
  const { filterCourses } = useGlobalContext();
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.authentication
  );
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    console.log(loading)
    localStorage.removeItem("auth-token");
    dispatch(logoutUser());
    dispatch(getUserInfo());
    console.log(loading)
    if (!isAuthenticated) nav("/login");
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
      }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menu.map((item, index) => (
          <Link to={item.route}>
            <ListItem key={item.text + index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Accordion className="!p-0 ">
        <AccordionSummary
          className="!p-0"
          //   expandIcon={}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListItem key={"categories"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={`Categories`} />
              <ExpandMoreIcon />
            </ListItemButton>
          </ListItem>
        </AccordionSummary>
        <AccordionDetails className="">
          <List className="!p-0 ">
            {categories.map((item, index) => (
              <ListItem
                onClick={() => filterCourses(item.text)}
                key={index + item.text}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
  return (
    <div className="!">
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={`!right-4 !fixed !top-4`}
            onClick={toggleDrawer(anchor, true)}
          >
            {" "}
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
            <div className="absolute bottom-8 left-4 text-center w-11/12 mx-auto">
              {isAuthenticated ? (
                <>
                  <div className="mb-2">
                    {user.role === "admin" && (
                      <Link to={"/admin/dashboard"}>
                        <Button >
                          {" "}
                          <DashboardIcon />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </div>
                  <LoadingButton
                    size="medium"
                    onClick={logOut}
                    // endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                  >
                    {loading ? (
                      <span>Signing Off</span>
                    ) : (
                      <span>
                        <LogoutIcon /> Logout
                      </span>
                    )}
                  </LoadingButton>
                  <span className="px-4"></span>
                  <Button classes={`flex items-center`}>
                    <Link to={"/me"}>
                      <PersonIcon /> Profile
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button variant="outlined">
                    <Link to={"/login"}>Login</Link>
                  </Button>
                  <span className="px-4">OR</span>
                  <Button variant="outlined">
                    <Link to={"/register"}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
