import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Alert, Box, Button, IconButton, Slide } from "@mui/material";
import { delRequest, postRequest } from "../helpers/api";
import { baseURL } from "../constants/endpoints";
import React, { useCallback, useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminResetPassword = ({
  url,
  fn,
  priority = false,
  email,
}: {
  url: string;
  fn: any;
  priority?: boolean;
  email: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfrim] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dele = useCallback(async () => {
    try {
      const res: any = await postRequest(
        `${baseURL}${url}`,
        { email },
        dispatch
      );

      if (res.data?.statusCode === 200 || res.status === 200) {
        fn(); // Refresh data
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }, [url, fn, dispatch]);

  useEffect(() => {
    if (confirm) {
      dele();
    }
  }, [confirm, dele]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        gap: 0.5,
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Alert severity="warning">
            {" "}
            Are you sure to reset this admin password?{" "}
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}> Disagree </Button>
          <Button
            onClick={() => {
              handleClose();
              setConfrim(true);
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton
        size="small"
        onClick={() => {
          priority ? handleClickOpen() : dele();
        }}
      >
        <RestartAltIcon />
      </IconButton>
    </Box>
  );
};

export default AdminResetPassword;
