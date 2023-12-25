import React from "react";
import Sidebar from "../AdminComponents/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex justify-between">
      <div className="w-4/5">{children}</div>
      <Sidebar />
    </div>
  );
};

export default AdminLayout;
