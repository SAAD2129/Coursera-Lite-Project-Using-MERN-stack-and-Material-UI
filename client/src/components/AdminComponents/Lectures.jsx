import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../states/Context";
import AdminLayout from "../Layouts/AdminLayout";
import LectureCard from "./LectureCard";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
const Lectures = () => {
  const { id } = useParams();
  const { getCourseLectures, lectures } = useGlobalContext();
  const [lecture, setLecture] = useState({
    title: "",
    description: "",
    video_url: "http://localhost",
    thumbnail: {
      public_id: "fdafs",
      secure_url: "fdsafasdf",
    },
  });
  const addLecture = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v3/lecture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("auth-token"),
        'course-id':id
      },
      body: JSON.stringify(lecture),
    });
    const data = await response.json();
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };
  const handleChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCourseLectures(id);
    console.log(lectures);
  }, []);
  return (
    lectures && (
      <div className="p-16 flex gap-12">
        <div className="w-4/6 ">
          <h2 className="text-2xl font-medium">Lectures</h2>
          <div className="my-12">
            {lectures.map((lecture) => {
              return (
                <LectureCard
                  noOfLectures={lecture.length}
                  title={lecture.title}
                  description={lecture.description}
                />
              );
            })}
          </div>
        </div>
        <div className="w-2/6">
          <div className="">
            <h2 className="text-lg font-medium">Add Course</h2>
            <form onSubmit={addLecture} className="w-full mt-8">
              <div className="my-4">
                <TextField
                  label="Title *"
                  variant="outlined"
                  className="w-full"
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={lecture.title}
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
                  value={lecture.description}
                  onChange={handleChange}
                />
              </div>{" "}
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
      </div>
    )
  );
};

export default Lectures;
