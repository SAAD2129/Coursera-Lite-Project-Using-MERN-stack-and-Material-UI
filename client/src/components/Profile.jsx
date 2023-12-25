import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseCard from "./Card";
import LoaderSlow from "./LoaderSlow";
import { useGlobalContext } from "../states/Context";
import LoadingButton from "@mui/lab/LoadingButton";
import PlaylistCard from "./Playlist";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../states/Actors/Auth";
import { useNavigate } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";

const Profile = () => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.authentication
  );

  const { setAlertType, setAlertMsg, setAlert, disableAlert } =
    useGlobalContext();
  const [btnLoading, setBtnLoading] = useState(false);
  const subscribePackage = async () => {
    setBtnLoading(true);
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/subscribe",
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("auth-token"),
        },
      }
    );
    const data = await response.json();
    setAlert(true);
    setAlertMsg(data.message);
    if (data.success) {
      setAlertType("success");
      window.location.reload();
    } else {
      setAlertType("error");
    }
    // setLoading(false);
    setBtnLoading(false);
    disableAlert();
  };
  const dispatch = useDispatch()
  const nav = useNavigate()
  useEffect(() => {
    dispatch(getUserInfo())
    if (!localStorage.getItem('auth-token') || !isAuthenticated) {
      nav('/login')
    }
  }, [dispatch, isAuthenticated, nav]);
  return loading ? (
    <LoaderSlow />
  ) : (
    <UserLayout>
      <div className="my-8 mx-16 flex items-center">
        <div>
          <Avatar
            alt="Remy Sharp"
            src="/assets/1.jpg"
            sx={{ width: 150, height: 150 }}
          />
        </div>
        <div className="pl-4">
          <div className="my-2">
            <Typography>
              <span className="font-bold">User Name </span>
              <span className="text-gray-600">{user.username}</span>
            </Typography>
          </div>
          <div className="my-2">
            <Typography>
              <span className="font-bold">Email </span>
              Email <span className="text-gray-500">{user.email}</span>
            </Typography>
          </div>
          <div className="my-2">
            <Typography>
              <span className="font-bold">Contact </span>
              <span className="text-gray-500">12412512398</span>
            </Typography>
          </div>
          <div className="my-2">
            <div className="flex gap-4">
              {user.isSubscribed ? (
                <>
                  {" "}
                  <Button classes="mx-4" variant="contained">
                    Subscribed
                  </Button>
                  <LoadingButton
                    size="small"
                    onClick={subscribePackage}
                    // endIcon={<SendIcon />}
                    loading={btnLoading}
                    loadingPosition="end"
                    classes="mx-4"
                    variant="outlined"
                  >
                    Cancel Subscription
                  </LoadingButton>
                </>
              ) : (
                <>
                  {" "}
                  <LoadingButton
                    size="small"
                    onClick={subscribePackage}
                    // endIcon={<SendIcon />}
                    loading={btnLoading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    {btnLoading ? (
                      <span>Subscribing</span>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </LoadingButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-16">
        <h3 className="text-xl font-medium">My Playlists</h3>
        <div className="grid grid-cols-12">
          {user?.courses?.map((course) => {
            return <PlaylistCard course={course} />;
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
