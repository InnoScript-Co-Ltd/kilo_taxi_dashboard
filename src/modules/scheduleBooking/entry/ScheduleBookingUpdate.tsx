import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ScheduleBookingFormInputs, schedulePayload, scheduleBookingSchema } from "../scheduleBooking.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { scheduleBookingService } from "../scheduleBooking.service"; // Service for handling state API requests
import {
  httpErrorHandler,
  httpServiceHandler,
} from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { statusLists } from "../../../constants/config";

const ScheduleBookingUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [countryLists, setCountryLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { schedule } = useSelector((state: AppRootState) => state.schedule); // Selecting state data from the store

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
      CustomerId: "",
      DeliverId: "",
      ScheduleTime: new Date(),
      PickUpAddress: "",
      Destination: "",
      Note: "",
      KiloType: "",
      Status: ""
    }
  });

  // Function to handle form submission and state update
  const submitScheduleBookingUpdate = async (data : ScheduleBookingFormInputs) => {
    setLoading(true);
    const response: any = await scheduleBookingService.update(
      dispatch,
      params.id,
      data
    );
    if (response.status === 204) {
      navigate(`${paths.stateList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await scheduleBookingService.show(dispatch, params.id); // Fetch state data to populate the form
      const response: any = await getRequest(`${endpoints.country}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCountryLists(response.data.countries);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (schedule) {
      setValue("CustomerId", schedule.customerId || "");
      setValue("DeliverId", schedule.deliverId || "");
      setValue("ScheduleTime", schedule.schedule_time ? new Date(schedule.schedule_time) : new Date())
      setValue("PickUpAddress", schedule.pickup_address || "")
      setValue("Destination", schedule.destination || "")
      setValue("Note", schedule.note || "")
      setValue("KiloType", schedule.kilo_type || "")
      setValue("Status", schedule.status || "")
    }
  }, [schedule]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>State Update</h2>

        <form onSubmit={handleSubmit(submitScheduleBookingUpdate)}>
        <Grid2 container spacing={2}>
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
                      id="customer_name"
                      aria-describedby="customer_name_text"
                      disabled={loading}
                      size="small"
                      label="Customer"
                      {...field}
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {[{ id : 1, value : "New Customer" }].map((customer: any) => (
                        <MenuItem key={customer.id} value={String(customer.id)}>
                          {customer.value}
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
                error={!!errors.CustomerId}
              >
                <InputLabel htmlFor="deliver_name">Deliver</InputLabel>
                <Controller
                  name="DeliverId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="deliver_name"
                      aria-describedby="deliver_name_text"
                      disabled={loading}
                      size="small"
                      label="Deliver"
                      {...field}
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {[{ id : 1, value : "New Deliver" }].map((DeliverId: any) => (
                        <MenuItem key={DeliverId.id} value={String(DeliverId.id)}>
                          {DeliverId.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.DeliverId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.PickUpAddress}>
                <InputLabel htmlFor="PickUpAddress">Pickup Address</InputLabel>
                <Input id="PickUpAddress" {...register("PickUpAddress")} />
                <FormHelperText>{errors.PickUpAddress?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.ScheduleTime}>
                <Controller
                  name="ScheduleTime"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Schedule Time"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.ScheduleTime,
                          helperText: errors.ScheduleTime?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>{errors.ScheduleTime?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Destination}>
                <InputLabel htmlFor="Destination">Destination</InputLabel>
                <Input id="Destination" {...register("Destination")} />
                <FormHelperText>{errors.Destination?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Note}>
                <InputLabel htmlFor="Note">Note</InputLabel>
                <Input id="Note" {...register("Note")} />
                <FormHelperText>{errors.Note?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.KiloType}>
                <InputLabel htmlFor="status">Kilo Type</InputLabel>
                <Controller
                  name="KiloType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="KiloType"
                      aria-describedby="kilo_type"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {statusLists?.map((kilo: any) => (
                        <MenuItem key={kilo.id} value={String(kilo.id)}>
                          {kilo.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.KiloType?.message}</FormHelperText>
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
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {statusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={String(status.id)}>
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
          <Button variant="outlined" onClick={() => navigate(paths.scheduleBookingList)}>
            Cancle
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

export default ScheduleBookingUpdate;
