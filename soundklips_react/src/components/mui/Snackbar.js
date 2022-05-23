import * as React from "react";
import { useEffect } from "react";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styled from "styled-components";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  // const [open, setOpen] = React.useState(false);
  // const [snacktype, setSnackType] = React.useState("success");
  // const [snackMessage, setSnackMessage] = React.useState("default");
  // const [snackDuration, setSnackDuration] = React.useState(5000);

  const snackBarState = useSelector((state) => state.snackBar);

  // const handleClick = () => {
  // store.getState().snackBar.openStatus;
  // setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    store.dispatch(actions.setSnackBar(false, "", "", 5000));
  };

  useEffect(() => {});

  return (
    <Snackbar
      open={snackBarState.openStatus}
      autoHideDuration={snackBarState.duration}
      onClose={handleClose}
      snacktype={snackBarState.type}
      message={snackBarState.message}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarState.type}
        sx={{ width: "100%" }}
      >
        {snackBarState.message}
      </Alert>
    </Snackbar>
  );
}

/* <Alert severity="error">This is an error message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert> */
