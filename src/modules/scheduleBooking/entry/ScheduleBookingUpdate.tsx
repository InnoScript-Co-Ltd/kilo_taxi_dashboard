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
  ScheduleBookingFormInputs,
  scheduleBookingSchema,
} from "../scheduleBooking.payload"; // Assuming vehicleSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { scheduleBookingService } from "../scheduleBooking.service"; // Service for handling vehicle API requests
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderTypeLists, orderStatusLists } from "../../../constants/config";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import Loading from "../../../components/Loading";
import { getId } from "../../../helpers/updateHelper";
import { formBuilder } from "../../../helpers/formBuilder";
import { DatePicker } from "@mui/x-date-pickers";

const ScheduleBookingUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [driversList, setDriversList] = useState<Array<any>>([]);
  const [customersList, setCutomersList] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { scheduleBooking } = useSelector(
    (state: AppRootState) => state.scheduleBookings
  ); // Selecting vehicle data from the store
  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ScheduleBookingFormInputs>({
    resolver: zodResolver(scheduleBookingSchema),
    defaultValues: {
      customerId: 0,
      driverId: 0,
      pickUpLat: "",
      pickUpLong: "",
      pickUpLocation: "",
      destinationLocation: "",
      destinationLat: "",
      destinationLong: "",
      scheduleTime: null,
      orderType: 0,
      status: 0,
    },
  });

  // Function to handle form submission and vehicle update
  const submitScheduleBookingUpdate = async (
    data: ScheduleBookingFormInputs
  ) => {
    setLoading(true);
    const response = await scheduleBookingService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.scheduleBookingList}`);
    }
    setLoading(false);
  };

  // Function to load vehicle data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await scheduleBookingService.show(dispatch, params.id); // Fetch vehicle data to populate the form
      const driverResponse: any = await getRequest(
        endpoints.driver,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, driverResponse);

      if (
        driverResponse &&
        "data" in driverResponse &&
        driverResponse.status === 200
      ) {
        setDriversList(driverResponse.data.payload.drivers);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }

    const customerResponse: any = await getRequest(
      endpoints.customer,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, customerResponse);
    if (
      customerResponse &&
      "data" in customerResponse &&
      customerResponse.status === 200
    ) {
      setCutomersList(customerResponse.data.payload.customers);
    }

    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (scheduleBooking) {
      console.log("schedule ::", scheduleBooking);
      setValue("id", Number(scheduleBooking.id) || 0);
      setValue("driverId", scheduleBooking.driverId || 0);
      setValue("customerId", scheduleBooking.customerId || 0);
      setValue("pickUpLocation", scheduleBooking.pickUpLocation || "");
      setValue("pickUpLat", scheduleBooking.pickUpLat || "");
      setValue("pickUpLong", scheduleBooking.pickUpLong || "");
      setValue(
        "scheduleTime",
        (scheduleBooking?.scheduleTime &&
          new Date(scheduleBooking.scheduleTime)) ||
          new Date()
      );
      setValue("walletId", scheduleBooking.walletId || 0);
      setValue(
        "destinationLocation",
        scheduleBooking.destinationLocation || ""
      );
      setValue("destinationLat", scheduleBooking.destinationLat || "");
      setValue("destinationLong", scheduleBooking.destinationLong || "");
      setValue(
        "status",
        getId({ lists: orderStatusLists, value: scheduleBooking.status }) || 0
      );
      setValue(
        "orderType",
        getId({ lists: orderTypeLists, value: scheduleBooking.orderType }) || 0
      );
    }
  }, [scheduleBooking, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card
        sx={{ marginTop: "20px", padding: "20px" }}
        className=" form-container"
      >
        <Loading loading={loading} />

        <h2>Schedule Booking Update</h2>

        <form onSubmit={handleSubmit(submitScheduleBookingUpdate)}>
          <Grid2 container spacing={2}>
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
                      disabled={loading}
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
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.customerId}
              >
                <InputLabel htmlFor="customer_name">Customer</InputLabel>
                <Controller
                  name="customerId"
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
                      {customersList.map((customer: any) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.customerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            {/* Vehicle Number */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.pickUpLocation}
              >
                <InputLabel htmlFor="pickup_location">
                  PickUp Location
                </InputLabel>
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="vehicle_no"
                  {...register("pickUpLocation")}
                />
                <FormHelperText>
                  {errors.pickUpLocation?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Vehicle Type */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.destinationLocation}
              >
                <InputLabel htmlFor="destinationLocation">
                  Destination Location
                </InputLabel>
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="destinationLocation"
                  {...register("destinationLocation")}
                />
                <FormHelperText>
                  {errors.destinationLocation?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Model */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.scheduleTime}>
                <Controller
                  name="scheduleTime"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="ScheduleTime"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            error: !!errors.scheduleTime,
                            helperText: errors.scheduleTime?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>{errors.scheduleTime?.message}</FormHelperText>
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
                      label="Status"
                      {...field}
                      value={field.value || 0}
                      onChange={field.onChange}
                      disabled={loading}
                    >
                      {orderStatusLists?.map((Status: any) => (
                        <MenuItem key={Status.id} value={Status.id}>
                          {Status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.orderType}
              >
                <InputLabel htmlFor="orderType">Order Type</InputLabel>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="orderType"
                      label="orderType"
                      {...field}
                      value={field.value || 0}
                      onChange={field.onChange}
                      disabled={loading}
                    >
                      {orderTypeLists?.map((orderType: any) => (
                        <MenuItem key={orderType.id} value={orderType.id}>
                          {orderType.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.orderType?.message}</FormHelperText>
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
              onClick={() => navigate(paths.scheduleBookingList)}
            >
              Cancel
            </Button>
            <Button variant="contained" disabled={loading} type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ScheduleBookingUpdate;
