import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoaderSlow() {
  return (
    <div className="h-[70vh] flex items-center mx-auto justify-center">
      <CircularProgress disableShrink />
    </div>
  );
}
