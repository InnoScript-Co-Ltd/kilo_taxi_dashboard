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
import { useCallback, useEffect, useState } from "react";
import {
  WithDrawTransactionFormInputs,
  withDrawtransactionSchema,
} from "../withDrawTransaction.payload"; // Assuming walletSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { withDrawTransactionService } from "../withDrawTransaction.service"; // Service for handling wallet API requests
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { WithDrawStatus } from "../../../constants/config";
import { getId } from "../../../helpers/updateHelper";
import { formBuilder } from "../../../helpers/formBuilder";
import { getRequest } from "../../../helpers/api";

import { endpoints } from "../../../constants/endpoints";

const WithDrawTransactionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [driversList, setDriversList] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { withDrawTransaction } = useSelector(
    (state: AppRootState) => state.withDrawTransaction
  ); // Selecting wallet data from the store
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WithDrawTransactionFormInputs>({
    resolver: zodResolver(withDrawtransactionSchema),
    defaultValues: {
      id: 0,
      amount: "",
      driverId: 0,
      transactionDate: null,
      transactionScreenShoot: "",
      status: 0,
    },
  });

  // Function to handle form submission and wallet update
  const submitWithDrawTransactionUpdate = async (
    data: WithDrawTransactionFormInputs
  ) => {
    setLoading(true);
    const formData = formBuilder(data, withDrawtransactionSchema);
    const response = await withDrawTransactionService.update(
      dispatch,
      params.id,
      formData
    );

    // const response: any = await withDrawTransactionService.update(
    //   dispatch,
    //   params.id,
    //   data,
    //   notifications
    // );
    if (response.statusCode === 200) {
      navigate(`${paths.withDrawTransactionList}`); // Navigate to the wallet list page on success
    }
    setLoading(false);
  };

  // Function to load wallet data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await withDrawTransactionService.show(dispatch, params.id); // Fetch vehicle data to populate the form
      const driverResponse: any = await getRequest(
        endpoints.driver,
        null,
        dispatch
      );
      console.log("driver", driverResponse);
      await httpServiceHandler(dispatch, driverResponse);

      if (
        driverResponse &&
        "data" in driverResponse &&
        driverResponse.data.statusCode === 200
      ) {
        setDriversList(driverResponse.data.payload.drivers);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (withDrawTransaction) {
      setValue("id", Number(withDrawTransaction.id) || 0);
      setValue("amount", withDrawTransaction.amount || "");
      setValue("driverId", withDrawTransaction.driverInfoDto.id || 0);

      setValue(
        "transactionDate",
        (withDrawTransaction?.transactionDate &&
          new Date(withDrawTransaction.transactionDate)) ||
          null
      );

      // setValue(
      //   "transactionDate",
      //   withDrawTransaction.transactionDate || new Date()
      // );
    }
  }, [withDrawTransaction, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>WithDrawTransaction Update</h2>

        <form onSubmit={handleSubmit(submitWithDrawTransactionUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.id}>
                <InputLabel htmlFor="wallet_name">Id</InputLabel>
                <FilledInput
                  disabled
                  size="small"
                  id="id"
                  {...register("id")}
                />
                <FormHelperText>{errors.id?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.amount}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <FilledInput size="small" id="amount" {...register("amount")} />
                <FormHelperText>{errors.amount?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.driverId}>
                <InputLabel htmlFor="driver_name">Driver</InputLabel>
                <Controller
                  name="driverId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="driver_name"
                      aria-describedby="driver_name_text"
                      disabled
                      label="Driver"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {driversList.map((driver: any) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.driverId?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.transactionDate}>
                <Controller
                  name="transactionDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Transaction Date"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.transactionDate,
                          helperText: errors.transactionDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>
                  {errors.transactionDate?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_transactionScreenShoot}
              >
                <Controller
                  name="file_transactionScreenShoot"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "TransactionFile is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_transactionScreenShoot
                          ? typeof errors.file_transactionScreenShoot
                              .message === "string"
                            ? errors.file_transactionScreenShoot.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="TransactionScreenShoot" // Label for the upload button
                      src={withDrawTransaction?.transactionScreenShoot}
                      disabled={loading}
                    />
                  )}
                />
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
                      {WithDrawStatus?.map((status: any) => (
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

          {/* Footer */}
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
              onClick={() => navigate(paths.withDrawTransactionList)}
            >
              Cancel
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default WithDrawTransactionUpdate;
