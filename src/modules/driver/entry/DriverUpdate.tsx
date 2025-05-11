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
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  driverStatusLists,
  genderStatuslists,
  kycStatusLists,
  propertyStatusLists,
  commissionTypeLists,
} from "../../../constants/config";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { getId } from "../../../helpers/updateHelper";
import { formBuilder } from "../../../helpers/formBuilder";

const DriverUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // email: "",
      role: "Driver",
      phone: "",
      password: "",
      status: 0,
      gender: 0,
      kycStatus: 0,
      referralMobileNumber: "",
      commissionType: 0,
      propertyStatus: 0,
      dob: null,
      availableStatus: 0,
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
      // setValue("mobilePrefix", driver.mobilePrefix || "");
      setValue("phone", driver.phone || "");
      // setValue("email", driver.email || "");
      setValue("dob", (driver?.dob && new Date(driver.dob)) || new Date());

      setValue("nrc", driver.nrc || "");
      setValue("driverLicense", driver.driverLicense || "");
      setValue("password", driver.password || "");
      setValue("address", driver.address || "");
      setValue("state", driver.state || "");
      setValue(
        "commissionType",
        getId({ lists: commissionTypeLists, value: driver.commissionType }) || 0
      );
      setValue("city", driver.city || "");
      setValue("townShip", driver.townShip || "");
      setValue("referralMobileNumber", driver.referralMobileNumber || "");
      setValue(
        "propertyStatus",
        getId({ lists: propertyStatusLists, value: driver.propertyStatus }) || 0
      );
      setValue(
        "availableStatus",
        getId({ lists: driverStatusLists, value: driver.availableStatus }) || 0
      );
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
    if (response.statusCode === 200) {
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
                <InputLabel htmlFor="driver_name" style={{ fontSize: "12px" }}>
                  Name
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_name"
                  {...register("name")}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* <Grid2 size={{ xs: 6, md: 3 }}>
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
            </Grid2> */}

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.phone}>
                <InputLabel htmlFor="driver_phone" style={{ fontSize: "12px" }}>
                  Phone
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_phone"
                  {...register("phone")}
                />
                <FormHelperText>{errors.phone?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.referralMobileNumber}
              >
                <InputLabel
                  htmlFor="driver_referralMobileNumber"
                  style={{ fontSize: "12px" }}
                >
                  ReferralMobileNumber
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_referralMobileNumber"
                  {...register("referralMobileNumber")}
                />
                <FormHelperText>
                  {errors.referralMobileNumber?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>
            {/* <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.email}>
                <InputLabel htmlFor="driver_email">Email</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_email"
                  {...register("email")}
                />
                <FormHelperText>{errors.email?.message}</FormHelperText>
              </FormControl>
            </Grid2> */}

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
                <InputLabel htmlFor="driver_nrc" style={{ fontSize: "12px" }}>
                  Nrc
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
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
                <InputLabel
                  htmlFor="driver_driverLicense"
                  style={{ fontSize: "12px" }}
                >
                  Driver License
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_driverLicense"
                  {...register("driverLicense")}
                />
                <FormHelperText>{errors.driverLicense?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.password}>
                <InputLabel htmlFor="password" style={{ fontSize: "12px" }}>
                  Password
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
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
                <InputLabel
                  htmlFor="driver_address"
                  style={{ fontSize: "12px" }}
                >
                  Address
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_address"
                  {...register("address")}
                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.state}>
                <InputLabel htmlFor="driver_state" style={{ fontSize: "12px" }}>
                  State
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_state"
                  {...register("state")}
                />
                <FormHelperText>{errors.state?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.city}>
                <InputLabel htmlFor="driver_city" style={{ fontSize: "12px" }}>
                  City
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="driver_city"
                  {...register("city")}
                />
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.townShip}>
                <InputLabel
                  htmlFor="driver_townShip"
                  style={{ fontSize: "12px" }}
                >
                  TownShip
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
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
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.commissionType}
              >
                <InputLabel htmlFor="commissionType">
                  Commission Type
                </InputLabel>
                <Controller
                  name="commissionType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="commissionType"
                      aria-describedby="status_text"
                      disabled={loading}
                      label="CommissionType"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {commissionTypeLists?.map((commissionType: any) => (
                        <MenuItem
                          key={commissionType.id}
                          value={commissionType.id}
                        >
                          {commissionType.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>
                  {errors.commissionType?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.availableStatus}
              >
                <InputLabel htmlFor="availableStatus">
                  AvailableStatus
                </InputLabel>
                <Controller
                  name="availableStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="availableStatus"
                      aria-describedby="availableStatus_text"
                      disabled={loading}
                      label="AvailableStatus"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {driverStatusLists?.map((availableStatus: any) => (
                        <MenuItem
                          key={availableStatus.id}
                          value={availableStatus.id}
                        >
                          {availableStatus.value}
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
                error={!!errors.propertyStatus}
              >
                <InputLabel htmlFor="propertyStatus">PropertyStatus</InputLabel>
                <Controller
                  name="propertyStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="propertyStatus"
                      aria-describedby="propertyStatus_text"
                      disabled={loading}
                      label="PropertyStatus"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {propertyStatusLists?.map((propertyStatus: any) => (
                        <MenuItem
                          key={propertyStatus.id}
                          value={propertyStatus.id}
                        >
                          {propertyStatus.value}
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
