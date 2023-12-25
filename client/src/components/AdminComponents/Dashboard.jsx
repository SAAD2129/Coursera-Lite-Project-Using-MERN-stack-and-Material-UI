import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../Layouts/AdminLayout";
import { getUserInfo } from "../../states/Actors/Auth";
import ProtectedRoute from "../Security/ProtectedRoute";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Dashboard = () => {
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <ProtectedRoute>
      {user?.role === "admin" && (
        <AdminLayout>
          <div className="p-16">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <div className="flex px-16 py-8 flex-wrap justify-between w-full mt-8">
              <div className="w-1/4 p-8 bg-white rounded-md shadow-lg">
                <h3 className="text-gray-500 text-sm mb-1">Views</h3>
                <div className="gap-6 flex">
                  <h4 className="text-xl font-medium">25</h4>
                  <div>
                    <span className="text-xs text-gray-400">35% </span>
                    <ArrowUpwardIcon fontSize="18" className="text-green-600" />
                    <ArrowDownwardIcon fontSize="18" className="text-red-500" />
                  </div>
                </div>
                <span className="text-xs text-gray-400">Since last Month</span>
              </div>
              <div className="w-1/4 p-8 bg-white rounded-md shadow-lg">
                <h3 className="text-gray-500 text-sm mb-1">Courses</h3>
                <div className="flex gap-6">
                  <h4 className="text-xl font-medium mb-1">100</h4>
                  <div>
                    <span className="text-xs text-gray-400">35% </span>
                    <ArrowUpwardIcon fontSize="18" className="text-green-600" />
                    <ArrowDownwardIcon fontSize="18" className="text-red-500" />
                  </div>
                </div>

                <span className="text-xs text-gray-400">Since last Month</span>
              </div>
              <div className="w-1/4 p-8 bg-white rounded-md shadow-lg">
                <h3 className="text-gray-500 text-sm mb-1">Subscription</h3>
                <div className="gap-6 flex">
                  <h4 className="text-xl font-medium mb-1">100</h4>
                  <div>
                    <span className="text-xs text-gray-400">35% </span>
                    <ArrowUpwardIcon fontSize="18" className="text-green-600" />
                    <ArrowDownwardIcon fontSize="18" className="text-red-500" />
                  </div>
                </div>
                <span className="text-xs text-gray-400">Since last Month</span>
              </div>
            </div>
          </div>
        </AdminLayout>
      )}
    </ProtectedRoute>
  );
};

export default Dashboard;
