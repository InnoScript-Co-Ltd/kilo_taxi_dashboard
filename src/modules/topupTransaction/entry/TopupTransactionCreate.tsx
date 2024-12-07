import * as React from "react";
import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { TopupTransactionFormInputs, topupTransactionSchema } from "../topupTransaction.payload"; // Import topupTransaction schema
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { topupTransactionService } from "../topupTransaction.service"; // Import topupTransaction service
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";
import { endpoints } from "../../../constants/endpoints";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { getRequest } from "../../../helpers/api";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { topUpTransactionStatus } from "../../../constants/config";

const TopupTransactionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [paymentChannelLists, setPaymentChannelLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopupTransactionFormInputs>({
    resolver: zodResolver(topupTransactionSchema),
  });

  const submitTopupTransactionCreate = async (data: TopupTransactionFormInputs) => {
    setLoading(true);
    const response = await topupTransactionService.store(data, dispatch, notifications);
    if (response.status === 201) {
      navigate(`${paths.topupTransactionList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(`${endpoints.paymentChannel}`, null);
     
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setPaymentChannelLists(response.data.customers);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>TopupTransaction Create</h2>
        <form onSubmit={handleSubmit(submitTopupTransactionCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.paymentChannelId}
              >
                <InputLabel htmlFor="payment_channel_name">Payment Channel</InputLabel>
                <Controller
                  name="paymentChannelId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="payment_channel_name"
                      aria-describedby="payment_channel_name_text"
                      disabled={loading}
                      label="Payment Channel"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {paymentChannelLists.map((paymentChannel: any) => (
                        <MenuItem key={paymentChannel.id} value={paymentChannel.id}>
                          {paymentChannel.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.amount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.amount}
              >
                <InputLabel htmlFor="topupTransaction_amount">Amount</InputLabel>
                <FilledInput
                  size="small"
                  id="topupTransaction_amount"
                  {...register("amount")}
                />
                <FormHelperText>{errors.amount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_transaction_screenshoot}
              >
                <Controller
                  name="file_transaction_screenshoot"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC Front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_transaction_screenshoot
                          ? typeof errors.file_transaction_screenshoot.message ===
                            "string"
                            ? errors.file_transaction_screenshoot.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Front" // Label for the upload button
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.phoneNumber}>
                <InputLabel htmlFor="driver_phone_number">Phone</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_phoneNumber"
                  {...register("phoneNumber")}
                />
                <FormHelperText>{errors.phoneNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.status}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="status"
                      aria-describedby="status_text"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {topUpTransactionStatus?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid2>

          </Grid2>

          {/* Footer with Cancel and Submit buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(paths.topupTransactionList)}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default TopupTransactionCreate;
