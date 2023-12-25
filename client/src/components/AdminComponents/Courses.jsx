import React from "react";
import DataTable from "./DataTable";
import AdminLayout from "../Layouts/AdminLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import LoaderSlow from "../LoaderSlow";
import CourseTable from "./CourseTable";
import { useGlobalContext } from "../../states/Context";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "category", headerName: "Category", width: 100 },
  {
    field: "noOfVideos",
    headerName: "Lectures",
    type: "number",
    width: 120,
  },
];
const AdminCourses = () => {
  // const [courses, setCourses] = React.useState([]);
  const { courses, getCourses, loading } = useSelector(
    (state) => state.coursesData
  );
  // const getCourses = async () => {
  //   setLoading(true);
  //   const response = await fetch("http://localhost:5000/api/v2/courses", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       token: localStorage.getItem("auth-token"),
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (data.success) {
  //     setCourses(data.courses);
  //   }
  //   setLoading(false);
  // };
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AdminLayout>
      <div className="p-16">
        <div className="mx-auto mb-8">
          {loading ? (
            <LoaderSlow />
          ) : (
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    width: "w-max",
                    margin: "auto",
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Courses" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <CourseTable rows={courses} />
                </TabPanel>
              </TabContext>
            </Box>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
