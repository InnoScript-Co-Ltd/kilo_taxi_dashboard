import * as React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Typography,
  CircularProgress,
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
import { TopupTransactionFormInputs, topupTransactionSchema } from "../topupTransaction.payload";
import { topupTransactionService } from "../topupTransaction.service";

const TopupTransactionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [paymentChannelNames, setPaymentChannelNames] = useState<Array<{ id: number; channelName: string }>>([]);
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
      setValue("status", 1);
      setIsFetching(true);
      const data = await topupTransactionService.fetchPaymentChannelNames(dispatch);
      setPaymentChannelNames(data);
      setIsFetching(false);
    };
    fetchData();
  }, [dispatch]);

   // Function to fetch driver details
   const fetchDriverDetails = async () => {
    const phoneNumber = getValues("phoneNumber");
    const driverId = getValues("driverId");

    if (!phoneNumber && !driverId) {
      notifications?.show("Please provide either a phone number or driver ID.", {
        severity: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    setChecking(true);
    const response = await topupTransactionService.fetchDriverDetails(dispatch, phoneNumber, driverId, notifications);

    if (response) {
      setDriverName(response.driverName);
      // Set other values if necessary, e.g., walletBalance
      // setWalletBalance(response.walletBalance);
      setWalletBalance(response.walletBalance);
      //setValue("walletBalance", response.walletBalance); 
    }
    setChecking(false);
  };


  const submitTopupTransactionCreate = async (data: TopupTransactionFormInputs) => {
    try {
      console.log("Submitting form data:", data); // Debug log
      setLoading(true);
      const response = await topupTransactionService.store(data, dispatch, notifications);
      if (response.status === 201) {
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
      <Typography variant="h5" fontWeight="bold">Manual Top-up Form</Typography>
      <Card sx={{ padding: "20px" }}>
        <Typography variant="h6">Top-up Form</Typography>
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
            <Button variant="contained" color="warning" onClick={fetchDriverDetails} disabled={checking}>
              {checking ? <CircularProgress size={20} /> : "Check"}
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: "20px" }} />

        <form onSubmit={handleSubmit(submitTopupTransactionCreate)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Driver Name</InputLabel>
                <FilledInput value={driverName} readOnly />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Current Wallet Balance</InputLabel>
                <FilledInput value={walletBalance} readOnly />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Top-up Amount</InputLabel>
                <FilledInput {...register("amount")} />
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
                      ) : paymentChannelNames.length > 0 ? (
                        paymentChannelNames.map((channel) => (
                          <MenuItem key={channel.id} value={channel.id}>
                            {channel.channelName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No payment channels available</MenuItem>
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Upload File Transaction Screenshot
              </Typography>
              <FileUploadWithPreview
                name="transaction_screenshoot"
                onFileChange={(file?: File) => {
                  console.log("File uploaded:", file);
                }}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#FFC107", color: "black" }}>
              {loading ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};
export default TopupTransactionCreate; 