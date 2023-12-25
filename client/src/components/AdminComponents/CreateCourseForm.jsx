import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CreateCourseForm = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  const addCourse = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v2/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(course),
    });
    const data = await response.json();
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };
  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <ArrowLeftIcon fontSize="18" />
      </div>
      <div className="w-2/5 mx-auto py-32">
        <h2 className="text-lg font-medium">Add Course</h2>
        <form onSubmit={addCourse} className="w-full mt-8">
          <div className="my-4">
            <TextField
              label="Title *"
              variant="outlined"
              className="w-full"
              type="text"
              name="title"
              autoComplete="off"
              value={course.title}
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <TextField
              label="Description *"
              variant="outlined"
              className="w-full"
              type="text"
              name="description"
              autoComplete="off"
              value={course.description}
              onChange={handleChange}
            />
          </div>{" "}
          <FormControl fullWidth>
            <InputLabel id="category">Category *</InputLabel>
            <Select
              labelId="category"
              id="category"
              label="category"
              name="category"
              value={course.category}
              onChange={handleChange}
            >
              <MenuItem value={"web development"}>Web Development</MenuItem>
              <MenuItem value={"android development"}>
                Android Development
              </MenuItem>
              <MenuItem value={"frontend development"}>
                Frontend Development
              </MenuItem>
              <MenuItem value={"backend development"}>
                Backend Development
              </MenuItem>
              <MenuItem value={"IOS development"}>IOS Development</MenuItem>
              <MenuItem value={"desktop app development"}>
                Desktop App Development
              </MenuItem>
            </Select>
          </FormControl>
          <div className="mt-8">
            <Button
              variant="contained"
              size="medium"
              classes={`font-bold`}
              fullWidth
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm;
