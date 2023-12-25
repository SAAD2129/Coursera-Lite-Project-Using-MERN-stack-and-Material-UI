import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../states/Context";
import { Divider } from "@mui/material";
import CourseListItem from "./CourseListItem";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UserLayout from "./Layouts/UserLayout";

const Course = () => {
  // Access the parameters from the URL
  const { id } = useParams();
  const { getCourseLectures, lectures } = useGlobalContext();
  useEffect(() => {
    getCourseLectures(id);
    console.log(lectures);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <UserLayout>
      {lectures.length > 0 ? (
        <div className="p-4 flex gap-8">
          <div className="w-3/4">
            <video width="100%" height="360" controls muted loop autoPlay>
              <source src="/assets/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Divider />
            <div className="my-4">
              <h1 className="text-xl font-bold">
                {lectures[0].title}{" "}
                <span className="text-xs font-normal text-gray-500">
                  ({lectures[0].views}) views
                </span>
              </h1>
              <div className="mt-2">
                <Tooltip title="Like">
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Dis Like">
                  <IconButton>
                    <ThumbDownIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Watch Later">
                  <IconButton>
                    <WatchLaterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add to Playlist">
                  <IconButton>
                    <PlaylistAddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="w-1/4 bg-gray-100">
            {lectures.map((video) => {
              return <CourseListItem video={video} />;
            })}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">No Videos Added</h2>
        </div>
      )}
    </UserLayout>
  );
};

export default Course;
