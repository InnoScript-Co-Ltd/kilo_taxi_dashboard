import { Alert, Box, Button, Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { delRequest } from "../helpers/api";
import { baseURL } from "../constants/endpoints";
import React, { useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpAndDel = ({ url, fn, priority = false }: { url: string, fn: any, priority? : boolean }) => {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfrim] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const dele = async () => {
    const res: any = await delRequest(`${baseURL}${url}`);
    if(res.status === 204){
      fn()
    }
  };
  
  useEffect(() => {
    if(confirm) {
      dele()
    }
  }, [confirm])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        gap: .5,
      }}
    >
       <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Are you sure to delete this transaction?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Alert severity="warning">Are you sure to delete this transaction?</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => {
            handleClose()
            setConfrim(true)
          }}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Button size="small" onClick={() => navigate(url)}>
        <EditIcon />
      </Button>
      <Button size="small" color="error" onClick={() => {
        if(priority) {
          handleClickOpen()
        }else {
          dele()
        }
      }}>
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default UpAndDel;