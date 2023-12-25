import * as React from "react";
import LoaderSlow from "../LoaderSlow";
import { Button, Divider, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedMenus from "./RoleOptions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../states/Actors/Courses";
import { useGlobalContext } from "../../states/Context";
export default function CourseTable({ rows, columns }) {
  const { deleteCourse } = useGlobalContext();

  const dispatch = useDispatch();
  const onDelete = (id) => {
    deleteCourse(id);
    dispatch(fetchCourses());
  };
  return rows.length > 0 ? (
    <div className="shadow-lg h-[70vh] overflow-y-scroll relative">
      <div className="grid border-b border-t-gray-500 grid-cols-12 p-4 sticky z-50 top-0 bg-gray-50">
        {/* COLUMNS */}
        <div className="col-span-1"><h3 className="font-bold">ID</h3></div>
        <div className="col-span-2">Title</div>
        <div className="col-span-4">Description</div>
        <div className="col-span-2 text-center">Lectures</div>
        <div className="col-span-3">Action</div>
      </div>
      {rows.map((row) => {
        return (
          <>
            <div className="grid grid-cols-12 p-4">
              {/* COLUMNS */}
              <div className="col-span-1 text-gray-500">{row._id.slice(0, 4)}...</div>
              <div className="col-span-2 text-gray-500">{row.title}</div>
              <div className="col-span-4 text-gray-500">
                {row.description.slice(0, 55)}...
              </div>
              <div className="col-span-2 text-center">{row.noOfVideos}</div>
              <div className="col-span-3">
                <Tooltip title="Delete" onClick={() => onDelete(row._id)}>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Lecture">
                  <IconButton>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
                <Button variant="outlined" size="small">
                  View Lectures
                </Button>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
    </div>
  ) : (
    <div>
      <LoaderSlow />
    </div>
  );
}
