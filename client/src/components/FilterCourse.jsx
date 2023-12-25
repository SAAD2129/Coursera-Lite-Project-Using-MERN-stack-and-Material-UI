import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalContext } from "../states/Context";
import CourseCard from "./Card";
import LoaderSlow from "./LoaderSlow";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../states/Actors/Courses";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { courses } = useSelector((state) => state.coursesData);
  const { filterCourses, loading, filteredCourses, setFilteredCourses } =
    useGlobalContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const dispatch = useDispatch()
  React.useEffect(() => {
    setFilteredCourses(courses);
    // dispatch(fetchCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ bgcolor: "" }}>
      <AppBar position="static">
        <Tabs
          className="bg-white text-gray-900"
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            onClick={() => filterCourses("All")}
            label="All"
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => filterCourses("Web Development")}
            label="Web Development"
            {...a11yProps(1)}
          />
          <Tab
            onClick={() => filterCourses("Android Development")}
            label="Android Development"
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => filterCourses("Frontend Development")}
            label="Frontend Development"
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => filterCourses("IOS Development")}
            label="IOS Development"
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => filterCourses("Backend Development")}
            label="Backend Development"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>

      {loading ? (
        <LoaderSlow />
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-12">
          {filteredCourses.map((course, index) => {
            return <CourseCard key={course._id} course={course} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-center font-medium text-2xl col-span-12">
            No Courses Found
          </h1>
        </div>
      )}
    </Box>
  );
}
