import * as React from "react";
import LoaderSlow from "../LoaderSlow";
import { Divider, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedMenus from "./RoleOptions";
export default function DataTable({ rows, columns }) {
  console.log(rows)
  return rows.length > 0 ? (
    <div className="shadow-lg h-[70vh] overflow-y-scroll relative">
      <div className="grid border-b border-t-gray-500 grid-cols-12 p-4 sticky z-50 top-0 bg-gray-50">
        {/* COLUMNS */}
        <div className="col-span-1">ID</div>
        <div className="col-span-2">User Name</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Subscription</div>
        <div className="col-span-2">Action</div>
      </div>
      {rows.map((row) => {
        return (
          <>
            <div className="grid grid-cols-12 p-4">
              {/* COLUMNS */}
              <div className="col-span-1">{row.id.slice(0, 4)}...</div>
              <div className="col-span-2">{row.username}</div>
              <div className="col-span-3">{row.email}</div>
              <div className="col-span-2">
                <CustomizedMenus role={row.role} id={row.id} />
              </div>
              <div className="col-span-2">{row.isSubscribed}</div>
              <div className="col-span-2">
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
