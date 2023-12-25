import React from "react";
import CourseInputSearch from "./Search";
import FullWidthTabs from "./FilterCourse";
import UserLayout from "./Layouts/UserLayout";
const Courses = () => {
  return (
    <UserLayout>
      <CourseInputSearch />
      <div className="my-8">
        <FullWidthTabs />
      </div>
    </UserLayout>
  );
};

export default Courses;
