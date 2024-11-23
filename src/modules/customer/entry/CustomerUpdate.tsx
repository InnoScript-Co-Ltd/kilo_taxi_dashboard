import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CustomerFormInputs, customerSchema } from "../customer.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { customerService } from "../customer.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../constants/paths";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { generalLists, kycStatusLists, statusLists } from "../../../constants/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const CustomerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { customer } = useSelector((state: AppRootState) => state.customer);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Phone: "",
      Password: "",
      Gender: 0,
      Status: 0,
      // flagIcon: undefined,
      // zipCode: ""
    },
  });

  // Load data into form fields on component mount
  const loadingData = useCallback(async () => {
    setLoading(true);
    await customerService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Populate form values when country data is available
  useEffect(() => {
    if (customer) {
      setValue("Name", customer.name || "");
      setValue("Phone", customer.phone || "");
      setValue("Email", customer.email || "");
      setValue("Password", customer.password || "");
      setValue("MobilePrefix", customer.mobilePrefix || "");
      setValue("Dob", customer.dob || new Date());
      setValue("Address", customer.address || "");
      setValue("State", customer.state || "");
      setValue("City", customer.city || "");
      setValue("Township", customer.township || "");
      setValue("Gender", customer.gender || 0);
      setValue("Status", customer.status || 0);
      setValue("KycStatus", customer.kycStatus || 0);
      setValue("Profile", customer.profile || "");
      setValue("NrcImageFront", customer.nrcImageFront || "");
      setValue("NrcImageBack", customer.nrcImageBack || "");

    }
  }, [customer, setValue]);

  // Submit form data
  const onSubmit = async (data: CustomerFormInputs) => {
    setLoading(true);
    const response = await customerService.update(dispatch, params.id, data);
    if (response.data) {
      navigate(`${paths.adminList}`);
    }
    setLoading(false);
  };

  console.log(customer?.nrcImageBack);
  

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Customer Update</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="admin_name">Name</InputLabel>
                <FilledInput
                  size="small"
                  id="admin_name"
                  {...register("Name")}
                />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <FilledInput size="small" id="email" {...register("Email")} />
                <FormHelperText>{errors.Email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Phone}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FilledInput size="small" id="phone" {...register("Phone")} />
                <FormHelperText>{errors.Phone?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.MobilePrefix}
              >
                <InputLabel htmlFor="MobilePrefix">Mobile Prefix</InputLabel>
                <FilledInput
                  size="small"
                  id="MobilePrefix"
                  {...register("MobilePrefix")}
                />
                <FormHelperText>{errors.MobilePrefix?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  size="small"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("Password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.Password?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.Dob}>
                <Controller
                  name="Dob"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="Dob"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            error: !!errors.Dob,
                            helperText: errors.Dob?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>{errors.Dob?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Nrc}>
                <InputLabel htmlFor="Nrc">Nrc</InputLabel>
                <FilledInput size="small" id="Nrc" {...register("Nrc")} />
                <FormHelperText>{errors.Nrc?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_NrcImageFront}
              >
                <Controller
                  name="file_NrcImageFront"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_NrcImageFront
                          ? typeof errors.file_NrcImageFront.message ===
                            "string"
                            ? errors.file_NrcImageFront.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Front" // Label for the upload button
                      src={customer?.nrcImageFront}
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_NrcImageBack}
              >
                <Controller
                  name="file_NrcImageBack"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_NrcImageBack
                          ? typeof errors.file_NrcImageBack.message === "string"
                            ? errors.file_NrcImageBack.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Back" // Label for the upload button
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_Profile}
              >
                <Controller
                  name="file_Profile"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Profile is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_Profile
                          ? typeof errors.file_Profile.message === "string"
                            ? errors.file_Profile.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Profile" // Label for the upload button
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Address}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <FilledInput
                  size="small"
                  id="address"
                  {...register("Address")}
                />
                <FormHelperText>{errors.Address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.State}>
                <InputLabel htmlFor="state">State</InputLabel>
                <FilledInput size="small" id="state" {...register("State")} />
                <FormHelperText>{errors.State?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.City}>
                <InputLabel htmlFor="city">City</InputLabel>
                <FilledInput size="small" id="city" {...register("City")} />
                <FormHelperText>{errors.City?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Township}>
                <InputLabel htmlFor="township">Township</InputLabel>
                <FilledInput
                  size="small"
                  id="township"
                  {...register("Township")}
                />
                <FormHelperText>{errors.Township?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Gender}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Controller
                  name="Gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="gender"
                      aria-describedby="gender_text"
                      size="small"
                      disabled={loading}
                      label="Gender"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {generalLists?.map((general: any) => (
                        <MenuItem key={general.id} value={general.id}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors?.Gender?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Status}>
                <InputLabel htmlFor="KycStatus">Status</InputLabel>
                <Controller
                  name="Status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="Status"
                      aria-describedby="status_text"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {statusLists?.map((status: any) => (
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

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.KycStatus}
              >
                <InputLabel htmlFor="KycStatus">KYC Status</InputLabel>
                <Controller
                  name="KycStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="KycStatus"
                      aria-describedby="kyc_status_text"
                      disabled={loading}
                      label="KycStatus"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {kycStatusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.KycStatus?.message}</FormHelperText>
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
              onClick={() => navigate(paths.customerList)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default CustomerUpdate;
