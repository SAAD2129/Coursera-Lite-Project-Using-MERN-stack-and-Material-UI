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
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../states/Context";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../states/Actors/Auth";
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

export default function PlaylistCard({ course }) {
  const [expanded, setExpanded] = React.useState(false);
  const { setAlert, setAlertType, setAlertMsg, disableAlert } =
    useGlobalContext();
  const dispatch = useDispatch();
  const removeFromPlaylist = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/rmfromplaylist",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("auth-token"),
          "course-id": course.course_id,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      setAlert(true);
      setAlertType("success");
      setAlertMsg(data.message);
      dispatch(getUserInfo());
    }
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
          <CardContent className="">
            <Typography
              variant="body"
              color="text.primary"
              className="text-lg font-medium"
            >
              {course?.course_title}
            </Typography>
            <div className="mt-2 text-right">
              <Button variant="outlined" className="text-sm mt-4" size="small">
                <span className="text-xs font-medium">
                  {course?.course_category}
                </span>
              </Button>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              {" "}
              <PlayArrowIcon />{" "}
              <span className="capitalize text-xs">Watch Now</span>
            </Button>
            <Button onClick={removeFromPlaylist} variant="text">
              {" "}
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  );
}
