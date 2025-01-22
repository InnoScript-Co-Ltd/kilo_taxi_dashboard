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
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { orderSchema, OrderFormInputs } from "../../order/order.payload";
import { orderService } from "../../order/order.service";
import { orderStatusLists } from "../../../constants/config";

const OrderCreate = () => {
  const [loading, setLoading] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);
  const [walletTransitionLists, setWalletTransitionLists] = useState<
    Array<any>
  >([]);
  const [driverLists, setDriverLists] = useState<Array<any>>([]);
  const [scheduleBookingLists, setScheduleBookingLists] = useState<Array<any>>(
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderSchema),
  });

  const submitOrderCreate = async (data: OrderFormInputs) => {
    setLoading(true);
    const response = await orderService.store(data, dispatch);
    if (response.status === 201) {
      navigate(`${paths.orderList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const customerRes: any = await getRequest(`${endpoints.customer}`, null, dispatch);
      const walletTransitionRes: any = await getRequest(
        `${endpoints.wallet}`,
        null,
        dispatch
      );
      const driverRes: any = await getRequest(`${endpoints.driver}`, null, dispatch);
      const scheduleBookingRes: any = await getRequest(
        `${endpoints.scheduleBooking}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, walletTransitionRes);
      if (
        walletTransitionRes &&
        "data" in walletTransitionRes &&
        walletTransitionRes.status === 200
      ) {
        setWalletTransitionLists(walletTransitionRes.data.wallets);
      }

      await httpServiceHandler(dispatch, customerRes);
      if (customerRes && "data" in customerRes && customerRes.status === 200) {
        setCustomerLists(customerRes.data.customers);
      }

      await httpServiceHandler(dispatch, driverRes);
      if (driverRes && "data" in driverRes && driverRes.status === 200) {
        setDriverLists(driverRes.data.drivers);
      }

      await httpServiceHandler(dispatch, scheduleBookingRes);
      if (
        scheduleBookingRes &&
        "data" in scheduleBookingRes &&
        scheduleBookingRes.status === 200
      ) {
        setScheduleBookingLists(scheduleBookingRes.data.scheduleBookings);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
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
        <h2>Order Create</h2>
        <form onSubmit={handleSubmit(submitOrderCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.DriverId}>
                <InputLabel htmlFor="driver_name">Driver</InputLabel>
                <Controller
                  name="DriverId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="driver_name"
                      aria-describedby="driver_name_text"
                      disabled={loading}
                      label="Driver"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {driverLists.map((driver: any) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.DriverId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.CustomerId}
              >
                <InputLabel htmlFor="customer_name">Customer</InputLabel>
                <Controller
                  name="CustomerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="customer_name"
                      aria-describedby="customer_name_text"
                      disabled={loading}
                      label="Customer"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {customerLists.map((customer: any) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.CustomerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.WalletTransactionId}
              >
                <InputLabel htmlFor="wallet_transition">
                  Wallet Transition
                </InputLabel>
                <Controller
                  name="WalletTransactionId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="wallet_transition"
                      aria-describedby="wallet_transition_text"
                      disabled={loading}
                      label="WalletTransition"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {walletTransitionLists.map((walletTransition: any) => (
                        <MenuItem
                          key={walletTransition.id}
                          value={walletTransition.id}
                        >
                          {walletTransition.walletName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>
                  {errors.WalletTransactionId?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.ScheduleBookingId}
              >
                <InputLabel htmlFor="schedule_booking">
                  Schedule Booking
                </InputLabel>
                <Controller
                  name="ScheduleBookingId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="schedule_booking"
                      aria-describedby="schedule_booking_text"
                      disabled={loading}
                      label="ScheduleBooking"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {scheduleBookingLists.map((scheduleBooking: any) => (
                        <MenuItem
                          key={scheduleBooking.id}
                          value={scheduleBooking.id}
                        >
                          {scheduleBooking.pickUpLocation}
                          {" - "}
                          {scheduleBooking.dropOffLocation}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>
                  {errors.ScheduleBookingId?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.TotalAmount}
              >
                <InputLabel htmlFor="total_amount">Total Amount</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="total_amount"
                  {...register("TotalAmount", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.TotalAmount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.CreatedDate}>
                <Controller
                  name="CreatedDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Created Date"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.CreatedDate,
                          helperText: errors.CreatedDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>{errors.CreatedDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Status}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Controller
                  name="Status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="status"
                      aria-describedby="status_text"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || ""} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {orderStatusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Status?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>

          {/* footer */}
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
              onClick={() => navigate(paths.orderList)}
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

export default OrderCreate;
