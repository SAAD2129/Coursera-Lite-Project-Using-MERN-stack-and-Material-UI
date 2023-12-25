import React, { useEffect } from "react";
import MouseRoundedIcon from "@mui/icons-material/MouseRounded";
import CourseCard from "./Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../states/Context";
import { fetchCourses } from "../states/Actors/Courses";
import { useDispatch, useSelector } from "react-redux";
import LoaderSlow from "./LoaderSlow";
import UserLayout from "./Layouts/UserLayout";
const Home = () => {
  // const { courses } = useGlobalContext();
  const dispatch = useDispatch();
  const { loading, courses, noOfCourse } = useSelector(
    (state) => state.coursesData
  );
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  return (
    <UserLayout>
      <div className="cover-bg flex items-center justify-center h-[40vh] flex-col">
        <h2 className="text-black text-4xl font-bold">Learn Coding With Us</h2>
        <Link
          to={"/courses"}
          className="border-2 hover:bg-black/10 text-gray-500 hover:text-gray-800 border-gray-300 px-4 py-2 rounded-md mt-4 "
        >
          Explore Courses <MouseRoundedIcon />
        </Link>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-8">Our Courses</h3>
        <div className="grid grid-cols-12 gap-8">
          {loading ? (
            <LoaderSlow />
          ) : // eslint-disable-next-line array-callback-return
          noOfCourse === 0 ? (
            <div className="col-span-12 my-4">
              <h2 className="text-xl font-medium text-center">No Courses</h2>
            </div>
          ) : (
            courses?.map((course, index) => {
              if (index < 3) return <CourseCard course={course} />;
            })
          )}
        </div>

      {noOfCourse !== 0 && (
          <div className="text-center mt-6">
            <Button variant="text">
              <Link to={"/courses"}>Browse All Courses</Link>
            </Button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Home;
