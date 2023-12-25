import { TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import React from "react";
import UserLayout from "./Layouts/UserLayout";

const Contact = () => {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <UserLayout className="w-3/4 mx-auto">
      <div className="mb-4">
        <h3 className="text-2xl font-medium">Contact Us</h3>
        <p className="mt-1 text-gray-500">Keep in Touch</p>
      </div>
      <form action="" className="grid grid-cols-12 gap-4">
        <div className="my-2 col-span-12">
          <TextField
            label="Email"
            variant="outlined"
            className="w-full"
            type="email"
            name="email"
            autoComplete="off"
          />
        </div>
        <div className="my-2 col-span-6">
          <TextField
            label="Name"
            variant="outlined"
            className="w-full"
            type="text"
            name="name"
            autoComplete="off"
          />
        </div>
        <div className="my-2 col-span-6">
          <TextField
            label="Contact"
            variant="outlined"
            className="w-full"
            type="text"
            name="contact"
            autoComplete="off"
          />
        </div>
        <div className="my-2 col-span-12 !h-24">
          <TextField
            label="Query"
            autoComplete="off"
            multiline
            className="w-full"
            rows={4}
          />
        </div>
        <div className="col-span 4 mt-8" >
          <LoadingButton
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            className="px-4"
          >
            <span>Send</span>
          </LoadingButton>
        </div>
      </form>
    </UserLayout>
  );
};

export default Contact;
