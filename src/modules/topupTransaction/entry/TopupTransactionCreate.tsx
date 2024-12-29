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
import { formBuilder } from "../../../helpers/formBuilder";

const TopupTransactionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [paymentChannelLists, setPaymentChannelLists] = useState<Array<any>>([]);
  const [userLists, setUserLists] = useState<Array<any>>([]);

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
    try {
      setLoading(true);
      const formData:any = formBuilder(data, topupTransactionSchema);
      const response = await topupTransactionService.store(
        formData,
        dispatch,
        notifications
      );
      if (response.status === 201) {
        navigate(`${paths.topupTransactionList}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const paymentChannelResponse: any = await getRequest(`${endpoints.paymentChannel}`, null);
      await httpServiceHandler(dispatch, paymentChannelResponse);
      if (paymentChannelResponse && "data" in paymentChannelResponse && paymentChannelResponse.status === 200) {
        setPaymentChannelLists(paymentChannelResponse.data.paymentChannels);
      }

      const userResponse: any = await getRequest(`${endpoints.driver}`, null);
      await httpServiceHandler(dispatch, userResponse);
      if (userResponse && "data" in userResponse && userResponse.status === 200) {
        setUserLists(userResponse.data.drivers);
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
              <FormControl variant="filled" fullWidth error={!!errors.PaymentChannelId}>
                <InputLabel htmlFor="topupTransaction_paymentChannel">Payment Channel</InputLabel>
                <Controller
                  name="PaymentChannelId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="topupTransaction_paymentChannel"
                      aria-describedby="topupTransaction_paymentChannel_text"
                      disabled={loading}
                      label="PaymentChannel"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {paymentChannelLists?.map((paymentChannel: any) => (
                        <MenuItem key={paymentChannel.id} value={paymentChannel.id}>
                          {paymentChannel.channelName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.PaymentChannelId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.UserId}>
                <InputLabel htmlFor="topupTransaction_paymentChannel">User</InputLabel>
                <Controller
                  name="UserId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="topupTransaction_paymentChannel"
                      aria-describedby="topupTransaction_paymentChannel_text"
                      disabled={loading}
                      label="UserId"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {userLists?.map((paymentChannel: any) => (
                        <MenuItem key={paymentChannel.id} value={paymentChannel.id}>
                          {paymentChannel.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.UserId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Amount}
              >
                <InputLabel htmlFor="topupTransaction_amount">Amount</InputLabel>
                <FilledInput
                  size="small"
                  id="topupTransaction_amount"
                  type="number" // Ensure input type is "number"
                  {...register("Amount", { valueAsNumber: true })} // Parse value as a number
                />
                <FormHelperText>{errors.Amount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_TransactionScreenShoot}
              >
                <Controller
                  name="file_TransactionScreenShoot"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC Front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_TransactionScreenShoot
                          ? typeof errors.file_TransactionScreenShoot.message ===
                            "string"
                            ? errors.file_TransactionScreenShoot.message
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
              <FormControl variant="filled" fullWidth error={!!errors.PhoneNumber}>
                <InputLabel htmlFor="topUpTransaction_phone_number">Phone</InputLabel>
                <FilledInput
                  size="small"
                  id="topUpTransaction_phoneNumber"
                  {...register("PhoneNumber")}
                />
                <FormHelperText>{errors.PhoneNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.DigitalPaymentFromPhoneNumber}>
                <InputLabel htmlFor="topUpTransaction_DigitalPaymentFromPhoneNumberr">Digital Payment From Phone Number</InputLabel>
                <FilledInput
                  size="small"
                  id="topUpTransaction_DigitalPaymentFromPhoneNumber"
                  {...register("DigitalPaymentFromPhoneNumber")}
                />
                <FormHelperText>{errors.DigitalPaymentFromPhoneNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.DigitalPaymentToPhoneNumber}>
                <InputLabel htmlFor="topUpTransaction_DigitalPaymentToPhoneNumber">Digital Payment To Phone Number</InputLabel>
                <FilledInput
                  size="small"
                  id="topUpTransaction_DigitalPaymentToPhoneNumber"
                  {...register("DigitalPaymentToPhoneNumber")}
                />
                <FormHelperText>{errors.DigitalPaymentToPhoneNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Status}>
                <InputLabel htmlFor="Status">Status</InputLabel>
                <Controller
                  name="Status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="Status"
                      aria-describedby="Status_text"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {topUpTransactionStatus?.map((Status: any) => (
                        <MenuItem key={Status.id} value={Status.id}>
                          {Status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Status?.message}</FormHelperText>
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
