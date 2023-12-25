import { Button } from "@mui/material";
import React from "react";
import UserLayout from "./Layouts/UserLayout";

const About = () => {
  return (
    <UserLayout>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <h3 className="text-7xl font-bold mb-4">Learn without limits</h3>
          <p className="font-medium py-4">
            Start, switch, or advance your career with more than 5,800 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <Button
            variant="contained"
            className="py-4"
            classes={`py-4`}
            size="large"
          >
            Join Our Courses
          </Button>
        </div>
        <div className="w-1/2">
          <img
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40"
            alt=""
          />
        </div>
      </div>
    </UserLayout>
  );
};

export default About;
