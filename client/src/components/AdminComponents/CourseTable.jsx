import * as React from "react";
import LoaderSlow from "../LoaderSlow";
import { Button, Divider, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedMenus from "./RoleOptions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../states/Actors/Courses";
import { useGlobalContext } from "../../states/Context";
import { Link } from "react-router-dom";
export default function CourseTable({ rows, columns }) {
  const { deleteCourse } = useGlobalContext();

  const dispatch = useDispatch();
  const onDelete = (id) => {
    deleteCourse(id);
    dispatch(fetchCourses());
  };
  return rows.length > 0 ? (
    <div className=" h-[70vh] overflow-y-scroll  relative">
      <div className="grid border-b border-t-gray-500 grid-cols-12 p-4 sticky z-50 top-0 bg-gray-50">
        {/* COLUMNS */}
        <div className="col-span-1"><h3 className="font-medium">ID</h3></div>
        <div className="col-span-2 text-gray-700 uppercase font-medium">Title</div>
        <div className="col-span-4 text-gray-700 uppercase font-medium">Description</div>
        <div className="col-span-2 text-gray-700 uppercase text-center font-medium">Lectures</div>
        <div className="col-span-1 text-gray-700 uppercase text-right font-medium">Category</div>
        <div className="col-span-2 text-gray-700 uppercase text-right font-medium">Action</div>
      </div>
      {rows.map((row) => {
        return (
          <>
            <div className="grid grid-cols-12 p-4">
              {/* COLUMNS */}
              <div className="col-span-1 text-gray-500 text-sm">{row._id.slice(0, 4)}...</div>
              <div className="col-span-2 text-gray-500 text-sm">{row.title}</div>
              <div className="col-span-4 text-gray-500 text-sm">
                {row.description.slice(0, 55)}...
              </div>
              <div className="col-span-2 text-gray-500  text-center text-sm">{row.noOfVideos}</div>
              <div className="col-span-1 text-gray-500  text-center text-sm">{row.category.toUpperCase()}</div>
              <div className="col-span-2 text-gray-500  text-right text-sm">
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
                <Link to={`/admin/course/lectures/${row._id}`}>
                <Tooltip title="View Lectures">
                  <IconButton>
                  <RemoveRedEye/>
                  </IconButton>
                </Tooltip>
                </Link>
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
