import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LectureCard = ({ title, description, category, noOfLectures }) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-md py-8 my-4 px-4 flex items-center justify-between rounded-lg">
      <div className="absolute left-4 top-4">
        <Button onClick={()=>navigate(-1)}>
          <ArrowBack />
        </Button>
      </div>
      <div>
        <h3 className="text-xl font-medium mb-2 capitalize">{title}</h3>
        <p className="text-justify text-sm">{description}</p>
      </div>
      <div className="">
        <Button>
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </Button>
        <Button>
          <Tooltip title="Edit">
            <EditIcon />
          </Tooltip>
        </Button>
      </div>
    </div>
  );
};

export default LectureCard;
