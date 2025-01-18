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
import { smsStatusLists } from "../../../constants/config";
import { SmsFormInputs, smsSchema } from "../sms.payload";
import { smsService } from "../sms.service";

const SmsCreate = () => {
  const [loading, setLoading] = useState(false);
  const [adminLists, setAdminLists] = useState<Array<any>>([]);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);
  const [driverLists, setDriverLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SmsFormInputs>({
    resolver: zodResolver(smsSchema),
  });

  const submitSmsCreate = async (data: SmsFormInputs) => {
    setLoading(true);
    const response = await smsService.store(data, dispatch);
    if (response.statusCode === 201) {
      navigate(`${paths.smsList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const adminRes: any = await getRequest(
        `${endpoints.admin}`,
        null,
        dispatch
      );
      const customerRes: any = await getRequest(
        `${endpoints.customer}`,
        null,
        dispatch
      );
      const driverRes: any = await getRequest(
        `${endpoints.driver}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, adminRes);
      if (adminRes && "data" in adminRes && adminRes.data.statusCode === 200) {
        setAdminLists(adminRes.data.payload.admins);
      }

      await httpServiceHandler(dispatch, customerRes);
      if (
        customerRes &&
        "data" in customerRes &&
        customerRes.data.statusCode === 200
      ) {
        setCustomerLists(customerRes.data.payload.customers);
      }

      await httpServiceHandler(dispatch, driverRes);
      if (
        driverRes &&
        "data" in driverRes &&
        driverRes.data.statusCode === 200
      ) {
        setDriverLists(driverRes.data.payload.drivers);
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
        <h2>Sms Create</h2>
        <form onSubmit={handleSubmit(submitSmsCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.AdminId}>
                <InputLabel htmlFor="admin_name">Admin</InputLabel>
                <Controller
                  name="AdminId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="admin_name"
                      aria-describedby="admin_name_text"
                      disabled={loading}
                      label="Admin"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {adminLists.map((admin: any) => (
                        <MenuItem key={admin.id} value={admin.id}>
                          {admin.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.AdminId?.message}</FormHelperText>
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
                error={!!errors.MobileNumber}
              >
                <InputLabel htmlFor="mobile_number">Mobile Number</InputLabel>
                <FilledInput
                  size="small"
                  id="mobile_number"
                  {...register("MobileNumber")}
                />
                <FormHelperText>{errors.MobileNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <FilledInput size="small" id="name" {...register("Name")} />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Title}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <FilledInput size="small" id="title" {...register("Title")} />
                <FormHelperText>{errors.Title?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Message}>
                <InputLabel htmlFor="message">Message</InputLabel>
                <FilledInput
                  size="small"
                  id="message"
                  {...register("Message")}
                />
                <FormHelperText>{errors.Message?.message}</FormHelperText>
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
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {smsStatusLists?.map((status: any) => (
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
            <Button variant="outlined" onClick={() => navigate(paths.smsList)}>
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

export default SmsCreate;
