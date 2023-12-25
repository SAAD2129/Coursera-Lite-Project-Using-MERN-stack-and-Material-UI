import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useGlobalContext } from "../states/Context";
import Grow from "@mui/material/Grow";

export default function ActionAlerts() {
  const { alert, setAlert, alertMsg, alertType } = useGlobalContext();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    alert && (
      <Grow 
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Stack
          className="fixed bottom-8 translate-x-1/4"
          sx={{ width: "50%" }}
          spacing={2}
        >
          <Alert
            severity={alertType}
            onClose={() => {
              setAlert(false);
            }}
          >
            {alertMsg}
          </Alert>
        </Stack>
      </Grow>
    )
  );
}
