import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Alert, Box, Button, IconButton, Slide } from "@mui/material";
import { delRequest } from "../helpers/api";
import { baseURL } from "../constants/endpoints";
import React, { useCallback, useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>}, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminResetPassword = ({ url, fn, priority = false } : { url: string; fn: any; priority?: boolean }) => {
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
      const res: any = await delRequest(`${baseURL}${url}`, dispatch);
      if (res.data?.statusCode === 204 || res.status === 204) {
        fn(); // Ensure fn is fetching the updated list
      }
    } catch (error) {
      console.error("Error deleting:", error);
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
          <Alert severity="warning"> Are you sure to reset this admin password? </Alert>
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

      <IconButton size="small" onClick={() => {
        priority ? handleClickOpen() : dele()
        }}
      >
        <RestartAltIcon />
      </IconButton>
    </Box>
  );
};

export default AdminResetPassword;
