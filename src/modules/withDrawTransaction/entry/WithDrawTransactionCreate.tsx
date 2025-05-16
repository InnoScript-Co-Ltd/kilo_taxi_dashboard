import * as React from "react";
import {
  Box,
  Button,
  Card,
  Grid2,
  Grid,
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Divider,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";
import { endpoints } from "../../../constants/endpoints";
import { getRequest } from "../../../helpers/api";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import {
  WithDrawTransactionCreateFormInputs,
  withDrawtransactionCreateSchema,
} from "../withDrawTransaction.payload";
import { withDrawTransactionService } from "../withDrawTransaction.service";
import { topupTransactionService } from "../../topupTransaction/topupTransaction.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WithDrawTransactionCreate = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const withDrawlTransactionFormRef = React.useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<WithDrawTransactionCreateFormInputs>({
    resolver: zodResolver(withDrawtransactionCreateSchema),
  });

  // Function to fetch driver details
  const fetchDriverDetails = async () => {
    const phoneNumber = getValues("phoneNumber");
    const driverId = getValues("driverId");

    if (!phoneNumber && !driverId) {
      notifications?.show(
        "Please provide either a phone number or driver ID.",
        {
          severity: "error",
          autoHideDuration: 3000,
        }
      );
      return;
    }

    setChecking(true);
    const response = await topupTransactionService.fetchDriverDetails(
      dispatch,
      phoneNumber,
      driverId,
      notifications
    );

    if (response) {
      setValue("driverId", response.driverId);
      setValue("phoneNumber", response.phoneNumber);
      setValue("driverName", response.driverName);
      setValue("walletBalance", response.walletBalance);
    }
    setChecking(false);
  };

  const submitWithDrawlTransactionCreate = async (
    data: WithDrawTransactionCreateFormInputs
  ) => {
    try {
      console.log("Submitting form data:", data); // Debug log
      setLoading(true);
      const response = await withDrawTransactionService.store(
        data,
        dispatch,
        notifications
      );
      if (response.statusCode === 201) {
        navigate(`${paths.withDrawTransactionList}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      notifications?.show("Submission failed.", { severity: "error" });
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Typography variant="h5" fontWeight="bold">
        Manual WithDrawl Form
      </Typography>
      <Card sx={{ padding: "20px" }}>
        <Typography variant="h6">WithDrawl Form</Typography>

        <form
          onSubmit={handleSubmit(submitWithDrawlTransactionCreate)}
          ref={withDrawlTransactionFormRef}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel>Driver Phone</InputLabel>
                <FilledInput {...register("phoneNumber")} />
              </FormControl>
            </Grid>
            <Grid item xs={1} textAlign="center">
              <strong>Or</strong>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel>Driver ID</InputLabel>
                <FilledInput {...register("driverId")} />
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={fetchDriverDetails}
                disabled={checking}
              >
                {checking ? <CircularProgress size={20} /> : "Check"}
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Driver Name</InputLabel>
                <FilledInput readOnly {...register("driverName")} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Current Wallet Balance</InputLabel>
                <FilledInput readOnly {...register("walletBalance")} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.amount}>
                <InputLabel>WithDrawl Amount</InputLabel>
                <FilledInput
                  {...register("amount", { valueAsNumber: true })}
                  type="number"
                />
                <FormHelperText>{errors.amount?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                type="button"
                onClick={handleOpen}
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#FFC107", color: "black" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              WithDrawl Transaction Comfirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
              Are you sure to save the WithDrawlTransaction?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  withDrawlTransactionFormRef.current?.requestSubmit();
                }}
                variant="contained"
                sx={{ backgroundColor: "#FFC107", color: "black" }}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Card>
    </Box>
  );
};
export default WithDrawTransactionCreate;
