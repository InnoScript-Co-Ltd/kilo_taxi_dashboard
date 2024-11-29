import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
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
import {
  genderStatuslists,
  kycStatusLists,
  generalStatusLists,
  customerStatusLists,
} from "../../../constants/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import Loading from "../../../components/Loading";
import { formBuilder } from "../../../helpers/formBuilder";
import { getId } from "../../../helpers/updateHelper";

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
      KycStatus: 0,
      Dob: null,
    },
  });

  // Load data into form fields on component mount
  const loadingData = useCallback(async () => {
    setLoading(true); // Set loading to true

    // Simulate a delay (for testing purposes, set it to a large value to test loading state)
    const delay = 400000; // 2 seconds artificial delay
    const timeout = setTimeout(() => setLoading(false), delay); // Ensure the spinner stays on for the delay duration

    try {
      // Simulate network request with a delayed response (adjust as necessary for testing)
      //await new Promise((resolve) => setTimeout(resolve, delay)); // Simulated delay (simulate slow network)

      // Simulate a successful data fetch
      await customerService.show(dispatch, params.id);
    } finally {
      clearTimeout(timeout); // Clear timeout if the data is fetched before the delay ends
      setLoading(false); // Set loading to false after the operation completes
    }
  }, [dispatch, params.id]);
  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Populate form values when country data is available
  useEffect(() => {
    console.log(customer);
    if (customer) {
      setValue("id", Number(customer.id) || 0);
      setValue("Name", customer.name || "");
      setValue("Phone", customer.phone || "");
      setValue("Nrc", customer.nrc || "");
      setValue("Email", customer.email || "");
      setValue("Password", customer.password || "");
      setValue("MobilePrefix", customer.mobilePrefix || "");
      setValue("Dob", (customer?.dob && new Date(customer.dob)) || new Date());
      setValue("Address", customer.address || "");
      setValue("State", customer.state || "");
      setValue("City", customer.city || "");
      setValue("Township", customer.township || "");
      setValue(
        "Gender",
        getId({ lists: genderStatuslists, value: customer.gender }) || 0
      );
      setValue(
        "Status",
        getId({ lists: customerStatusLists, value: customer.status }) || 0
      );
      setValue(
        "KycStatus",
        getId({ lists: kycStatusLists, value: customer.kycStatus }) || 0
      );
      // setValue("Profile", customer.profile || "");
      // setValue("NrcImageFront", customer.nrcImageFront || "");
      // setValue("NrcImageBack", customer.nrcImageBack || "");
    }
  }, [customer, setValue]);

  // Submit form data
  const onSubmit = async (data: CustomerFormInputs) => {
    setLoading(true);
    const formData = formBuilder(data, customerSchema);
    const response = await customerService.update(
      dispatch,
      params.id,
      formData
    );
    if (response.status === 200) {
      navigate(`${paths.customerList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />

      <Card
        sx={{ marginTop: "20px", padding: "20px" }}
        className=" form-container"
      >
        <Loading loading={loading} />

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
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="email"
                  {...register("Email")}
                />
                <FormHelperText>{errors.Email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Phone}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="phone"
                  {...register("Phone")}
                />
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
                  disabled={loading}
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
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  {...register("Password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        disabled={loading}
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
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="Nrc"
                  {...register("Nrc")}
                />
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
                      disabled={loading}
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
                      src={customer?.nrcImageBack}
                      disabled={loading}
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
                      src={customer?.profile}
                      disabled={loading}
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
                  disabled={loading}
                  {...register("Address")}
                />
                <FormHelperText>{errors.Address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.State}>
                <InputLabel htmlFor="state">State</InputLabel>
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="state"
                  {...register("State")}
                />
                <FormHelperText>{errors.State?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.City}>
                <InputLabel htmlFor="city">City</InputLabel>
                <FilledInput
                  size="small"
                  disabled={loading}
                  id="city"
                  {...register("City")}
                />
                <FormHelperText>{errors.City?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Township}>
                <InputLabel htmlFor="township">Township</InputLabel>
                <FilledInput
                  size="small"
                  id="township"
                  disabled={loading}
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
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {genderStatuslists?.map((gender: any) => (
                        <MenuItem key={gender.id} value={gender.id}>
                          {gender.value}
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
                <InputLabel htmlFor="Status">Status</InputLabel>
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
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {customerStatusLists?.map((status: any) => (
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
                <InputLabel htmlFor="KycStatus">Kyc Status</InputLabel>
                <Controller
                  name="KycStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="KycStatus"
                      aria-describedby="KycStatus"
                      disabled={loading}
                      label="KycStatus"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
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
              onClick={() => navigate(paths.customerList)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default CustomerUpdate;
