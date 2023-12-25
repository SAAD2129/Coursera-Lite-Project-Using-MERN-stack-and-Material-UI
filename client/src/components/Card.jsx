import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useGlobalContext } from "../states/Context";
import { Link } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CourseCard({ course }) {
  const [expanded, setExpanded] = React.useState(false);
  const { disableAlert, setAlertMsg, setAlert, setAlertType } =
    useGlobalContext();
  const addToPlaylist = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/addtoplaylist",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "course-id": course._id,
          token: localStorage.getItem("auth-token"),
        },
      }
    );
    const data = await response.json();
    setAlertMsg(data.message);
    setAlert(true);
    if (data.success) setAlertType("success");
    else setAlertType("error");
    disableAlert();
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    course && (
      <div className="col-span-4 my-4">
        <Card sx={{ maxWidth: 345 }}>
          {/* // todo */}
          {/* <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          /> */}
          <CardMedia
            component="img"
            height="194"
            image="/assets/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body"
              color="text.primary"
              className="text-lg font-medium"
            >
              {course?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course?.description?.slice(0, 80)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              <Link to={`/course/${course._id}`}>
                <PlayArrowIcon />{" "}
                <span className="capitalize text-xs">Watch Now</span>
              </Link>
            </Button>
            <Button onClick={addToPlaylist} variant="text">
              {" "}
              <AddIcon /> <span className="capitalize">Add To Playlist</span>
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  );
}
