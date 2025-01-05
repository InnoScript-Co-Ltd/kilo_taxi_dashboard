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
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { smsStatusLists } from "../../../constants/config";
import { getId } from "../../../helpers/updateHelper";
import { SmsFormInputs, smsSchema } from "../sms.payload";
import { smsService } from "../sms.service";

const SmsUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [adminLists, setAdminLists] = useState<Array<any>>([]);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);
  const [driverLists, setDriverLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { sms } = useSelector((state: AppRootState) => state.sms); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SmsFormInputs>({
    resolver: zodResolver(smsSchema),
    defaultValues: {
      id: 0,
      AdminId: 0,
      CustomerId: 0,
      DriverId: 0,
      MobileNumber: "",
      Name: "",
      Title: "",
      Message: "",
      Status: 0,
    },
  });

  // Function to handle form submission and state update
  const submitSmsUpdate = async (data: SmsFormInputs) => {
    setLoading(true);
    const response: any = await smsService.update(dispatch, params.id, data);
    if (response.status === 200) {
      navigate(`${paths.smsList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const adminRes: any = await getRequest(`${endpoints.admin}`, null);
      const customerRes: any = await getRequest(`${endpoints.customer}`, null);
      const driverRes: any = await getRequest(`${endpoints.driver}`, null);

      await httpServiceHandler(dispatch, adminRes);
      if (adminRes && "data" in adminRes && adminRes.status === 200) {
        setAdminLists(adminRes.data.admins);
      }

      await httpServiceHandler(dispatch, customerRes);
      if (customerRes && "data" in customerRes && customerRes.status === 200) {
        setCustomerLists(customerRes.data.customers);
      }

      await httpServiceHandler(dispatch, driverRes);
      if (driverRes && "data" in driverRes && driverRes.status === 200) {
        setDriverLists(driverRes.data.drivers);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (sms) {
      setValue("id", Number(sms.id) || 0);
      setValue("AdminId", sms.adminId || 0);
      setValue("CustomerId", sms.customerId || 0);
      setValue("DriverId", sms.customerId || 0);
      setValue("Name", sms.name || "");
      setValue("Title", sms.title || "");
      setValue("Message", sms.message || "");
      setValue("MobileNumber", sms.mobileNumber || "");
      setValue(
        "Status",
        getId({ lists: smsStatusLists, value: sms.status }) || 0
      );
    }
  }, [sms, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await smsService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Sms Update</h2>

        <form onSubmit={handleSubmit(submitSmsUpdate)}>
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
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default SmsUpdate;
