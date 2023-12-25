import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../states/Actors/Auth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch, isAuthenticated]);
  return isAuthenticated ? <div>{children}</div> : navigate(-1);
};

export default ProtectedRoute;
