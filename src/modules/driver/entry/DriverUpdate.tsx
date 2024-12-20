import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DriverFormInputs, driverSchema } from "../driver.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { driverService } from "../driver.service"; // Service for handling state API requests
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  driverStatusLists,
  genderStatuslists,
  generalStatusLists,
  kycStatusLists,
} from "../../../constants/config";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { getId } from "../../../helpers/updateHelper";
import { formBuilder } from "../../../helpers/formBuilder";

const DriverUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { driver } = useSelector((state: AppRootState) => state.driver); // Selecting state data from the store

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DriverFormInputs>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      status: 0,
      gender: 0,
      kycStatus: 0,
      dob: null,
    },
  });

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);

    const delay = 400000;
    const timeout = setTimeout(() => setLoading(false), delay);

    try {
      await driverService.show(dispatch, params.id);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (driver) {
      setValue("id", driver.id || 0);
      setValue("name", driver.name || "");
      setValue("mobilePrefix", driver.mobilePrefix || "");
      setValue("phone", driver.phone || "");
      setValue("email", driver.email || "");
      setValue("dob", (driver?.dob && new Date(driver.dob)) || new Date());
      setValue("nrc", driver.nrc || "");
      setValue("driverLicense", driver.driverLicense || "");
      setValue("password", driver.password || "");
      setValue("address", driver.address || "");
      setValue("state", driver.state || "");
      setValue("city", driver.city || "");
      setValue("townShip", driver.townShip || "");
      setValue(
        "status",
        getId({ lists: genderStatuslists, value: driver.status }) || 0
      );
      setValue(
        "gender",
        getId({ lists: driverStatusLists, value: driver.gender }) || 0
      );
      setValue(
        "kycStatus",
        getId({ lists: kycStatusLists, value: driver.kycStatus }) || 0
      );
    }
  }, [driver, setValue]);

  const onSubmit = async (data: DriverFormInputs) => {
    setLoading(true);
    const formData = formBuilder(data, driverSchema);
    const response = await driverService.update(dispatch, params.id, formData);
    if (response.status === 200) {
      navigate(`${paths.driverList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Driver Update</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.name}>
                <InputLabel htmlFor="driver_name">Name</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_name"
                  {...register("name")}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.mobilePrefix}
              >
                <InputLabel htmlFor="driver_mobilePrefix">
                  Mobile Prefix
                </InputLabel>
                <FilledInput
                  size="small"
                  id="driver_mobilePrefix"
                  {...register("mobilePrefix")}
                />
                <FormHelperText>{errors.mobilePrefix?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.phone}>
                <InputLabel htmlFor="driver_phone">Phone</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_phone"
                  {...register("phone")}
                />
                <FormHelperText>{errors.phone?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.email}>
                <InputLabel htmlFor="driver_email">Email</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_email"
                  {...register("email")}
                />
                <FormHelperText>{errors.email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.dob}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="dob"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            error: !!errors.dob,
                            helperText: errors.dob?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>{errors.dob?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.nrc}>
                <InputLabel htmlFor="driver_nrc">Nrc</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_nrc"
                  {...register("nrc")}
                />
                <FormHelperText>{errors.nrc?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.driverLicense}
              >
                <InputLabel htmlFor="driver_driverLicense">
                  Driver License
                </InputLabel>
                <FilledInput
                  size="small"
                  id="driver_driverLicense"
                  {...register("driverLicense")}
                />
                <FormHelperText>{errors.driverLicense?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  size="small"
                  id="password"
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
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
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.address}>
                <InputLabel htmlFor="driver_address">Address</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_address"
                  {...register("address")}
                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.state}>
                <InputLabel htmlFor="driver_state">State</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_state"
                  {...register("state")}
                />
                <FormHelperText>{errors.state?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.city}>
                <InputLabel htmlFor="driver_city">City</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_city"
                  {...register("city")}
                />
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.townShip}>
                <InputLabel htmlFor="driver_townShip">TownShip</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_townShip"
                  {...register("townShip")}
                />
                <FormHelperText>{errors.townShip?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3, xl: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_profile}
              >
                <Controller
                  name="file_profile"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Profile is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_profile
                          ? typeof errors.file_profile.message === "string"
                            ? errors.file_profile.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Profile" // Label for the upload button
                      src={driver?.profile}
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
                error={!!errors.file_nrcImageFront}
              >
                <Controller
                  name="file_nrcImageFront"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC Front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_nrcImageFront
                          ? typeof errors.file_nrcImageFront.message ===
                            "string"
                            ? errors.file_nrcImageFront.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Front" // Label for the upload button
                      src={driver?.nrcImageFront}
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
                error={!!errors.file_nrcImageBack}
              >
                <Controller
                  name="file_nrcImageBack"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC Back is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_nrcImageBack
                          ? typeof errors.file_nrcImageBack.message === "string"
                            ? errors.file_nrcImageBack.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Back" // Label for the upload button
                      src={driver?.nrcImageBack}
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
                error={!!errors.file_driverImageLicenseFront}
              >
                <Controller
                  name="file_driverImageLicenseFront"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Driver front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_driverImageLicenseFront
                          ? typeof errors.file_driverImageLicenseFront
                              .message === "string"
                            ? errors.file_driverImageLicenseFront.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Driver Front" // Label for the upload button
                      src={driver?.driverImageLicenseFront}
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
                error={!!errors.file_driverImageLicenseBack}
              >
                <Controller
                  name="file_driverImageLicenseBack"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Driver Back is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_driverImageLicenseBack
                          ? typeof errors.file_driverImageLicenseBack
                              .message === "string"
                            ? errors.file_driverImageLicenseBack.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Driver Back" // Label for the upload button
                      src={driver?.driverImageLicenseBack}
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
                      {driverStatusLists?.map((status: any) => (
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

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.gender}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="gender"
                      aria-describedby="gender_text"
                      disabled={loading}
                      label="Gender"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {genderStatuslists?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.kycStatus}
              >
                <InputLabel htmlFor="kycStatus">kyc Status</InputLabel>
                <Controller
                  name="kycStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="kycStatus"
                      aria-describedby="status_text"
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

                <FormHelperText>{errors.kycStatus?.message}</FormHelperText>
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
              onClick={() => navigate(paths.driverList)}
            >
              Cancle
            </Button>
            <Button type="submit" disabled={loading} variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default DriverUpdate;
