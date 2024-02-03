import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

type Props = {
  openFlg: boolean;
  message: string;
};
const AlertSnackbar = (props: Props) => {
  const { openFlg, message } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openFlg) setOpen(true);
  }, [openFlg]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSnackbar;
