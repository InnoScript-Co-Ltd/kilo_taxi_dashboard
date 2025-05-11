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
  TopupTransactionFormInputs,
  topupTransactionSchema,
} from "../topupTransaction.payload";
import { topupTransactionService } from "../topupTransaction.service";
import { formBuilder } from "../../../helpers/formBuilder";

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

const TopupTransactionCreate = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const topupTransactionFormRef = React.useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [paymentChannelNames, setPaymentChannelNames] = useState<
    Array<{ id: number; channelName: string }>
  >([]);
  const [isFetching, setIsFetching] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
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
  } = useForm<TopupTransactionFormInputs>({
    resolver: zodResolver(topupTransactionSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const data =
        await topupTransactionService.fetchPaymentChannelNames(dispatch);
      setPaymentChannelNames(data);
      setIsFetching(false);
    };
    fetchData();
  }, [dispatch]);

  // Function to fetch driver details
  const fetchDriverDetails = async () => {
    const phoneNumber = getValues("phoneNumber");
    const driverId = getValues("userId");

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
      setValue("userId", response.driverId);
      setValue("phoneNumber", response.phoneNumber);
      setValue("driverName", response.driverName);
      setValue("walletBalance", response.walletBalance);
    }
    setChecking(false);
  };

  const submitTopupTransactionCreate = async (
    data: TopupTransactionFormInputs
  ) => {
    try {
      console.log("Submitting form data:", data); // Debug log
      setLoading(true);
      const customPayload = {
        paymentChannelId: data.paymentChannelId,
        Amount: Number(data.Amount),
        file_transaction_screenshoot: data.file_transaction_screenshoot,
        phoneNumber: data.phoneNumber,
        status: data.status,
        userId: data.userId,
        driverName: data.driverName,
        walletBalance: data.walletBalance,
      };
      const formData = formBuilder(customPayload, topupTransactionSchema);
      const response = await topupTransactionService.store(
        formData,
        dispatch,
        notifications
      );
      if (response.statusCode === 201) {
        navigate(`${paths.topupTransactionList}`);
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
        Manual Top-up Form
      </Typography>
      <Card sx={{ padding: "20px" }}>
        <Typography variant="h6">Top-up Form</Typography>

        <form
          onSubmit={handleSubmit(submitTopupTransactionCreate)}
          ref={topupTransactionFormRef}
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
                <FilledInput {...register("userId")} />
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
              <FormControl fullWidth>
                <InputLabel>Top-up Amount</InputLabel>
                <FilledInput {...register("Amount")} type="number" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Top-up With</InputLabel>
                <Controller
                  name="paymentChannelId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} disabled={isFetching}>
                      {isFetching ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : paymentChannelNames?.length > 0 ? (
                        paymentChannelNames?.map((channel) => (
                          <MenuItem key={channel.id} value={channel.id}>
                            {channel.channelName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          No payment channels available
                        </MenuItem>
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                sx={{ marginTop: "20px", marginLeft: "20px" }}
                variant="filled"
                fullWidth
                error={!!errors.file_transaction_screenshoot}
              >
                <Controller
                  name="file_transaction_screenshoot"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{
                    required: "file_transaction_screenshoot  is required",
                  }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_transaction_screenshoot
                          ? typeof errors.file_transaction_screenshoot
                              .message === "string"
                            ? errors.file_transaction_screenshoot.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="TopUp Transaction Screen shoot " // Label for the upload button
                      //src={topupTransaction?.transaction_screenshoot}
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
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
              Topup Transaction Comfirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
              Are you sure to save the topupTransaction?
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
                  topupTransactionFormRef.current?.requestSubmit();
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
export default TopupTransactionCreate;
