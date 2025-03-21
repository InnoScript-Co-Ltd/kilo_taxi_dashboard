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

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { driverService } from "../driver.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { DriverCreateFormInputs, driverCreateSchema } from "../driver.payload";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useState } from "react";
import {
  commissionTypeLists,
  driverStatusLists,
  genderStatuslists,
  kycStatusLists,
  propertyStatusLists,
  roleLists,
  vehicleStatusLists,
} from "../../../constants/config";
import { formBuilder } from "../../../helpers/formBuilder";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";

import Loading from "../../../components/Loading";

const DriverCreate = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DriverCreateFormInputs>({
    resolver: zodResolver(driverCreateSchema),
  });

  const onSubmit = async (data: DriverCreateFormInputs) => {
    try {
      setLoading(true);

      const formData = formBuilder(data, driverCreateSchema);
      const response = await driverService.store(
        formData,
        dispatch,
        notifications
      );

      if (response.statusCode === 201) {
        setLoading(false);
        navigate(paths.driverList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Driver Create Error: ", error);
    }
  };

  return (
    <Box>
      <Breadcrumb />

      <Card
        sx={{ marginTop: "20px", padding: "20px" }}
        className=" form-container"
      >
        <Loading loading={loading} />
        <h2>Driver Create</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.name}>
                <InputLabel htmlFor="driver_name">Driver Name</InputLabel>
                <FilledInput
                  size="small"
                  id="driver_name"
                  {...register("name")}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.phone}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FilledInput size="small" id="phone" {...register("phone")} />
                <FormHelperText>{errors.phone?.message}</FormHelperText>
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
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.driverLicense}
              >
                <InputLabel htmlFor="driverLicense">Driver License</InputLabel>
                <FilledInput
                  size="small"
                  id="driverLicense"
                  {...register("driverLicense")}
                />
                <FormHelperText>{errors.driverLicense?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_profile}
              >
                <Controller
                  name="file_profile"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "Profile is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_profile
                          ? typeof errors.file_profile.message === "string"
                            ? errors.file_profile.message
                            : undefined
                          : undefined
                      }
                      field="Profile"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_driverImageLicenseFront}
              >
                <Controller
                  name="file_driverImageLicenseFront"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "DriverLicenseFront is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_driverImageLicenseFront
                          ? typeof errors.file_driverImageLicenseFront
                              .message === "string"
                            ? errors.file_driverImageLicenseFront.message
                            : undefined
                          : undefined
                      }
                      field="DriverLicenseFront"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_driverImageLicenseBack}
              >
                <Controller
                  name="file_driverImageLicenseBack"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "DriverLicenseBack is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_driverImageLicenseBack
                          ? typeof errors.file_driverImageLicenseBack
                              .message === "string"
                            ? errors.file_driverImageLicenseBack.message
                            : undefined
                          : undefined
                      }
                      field="DriverLicenseBack"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.nrc}>
                <InputLabel htmlFor="nrc">Nrc</InputLabel>
                <FilledInput size="small" id="nrc" {...register("nrc")} />
                <FormHelperText>{errors.nrc?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.nrc}>
                <InputLabel htmlFor="city">City</InputLabel>
                <FilledInput size="small" id="city" {...register("city")} />
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.townShip}>
                <InputLabel htmlFor="townShip">TownShip</InputLabel>
                <FilledInput
                  size="small"
                  id="townShip"
                  {...register("townShip")}
                />
                <FormHelperText>{errors.townShip?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.address}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <FilledInput
                  size="small"
                  id="address"
                  {...register("address")}
                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.referralMobileNumber}
              >
                <InputLabel htmlFor="referralMobileNumber">
                  Referral Mobile Number
                </InputLabel>
                <FilledInput
                  size="small"
                  id="referralMobileNumber"
                  {...register("referralMobileNumber")}
                />
                <FormHelperText>
                  {errors.referralMobileNumber?.message}
                </FormHelperText>
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
                      id="propertyStatus"
                      aria-describedby="propertyStatus_text"
                      size="small"
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

                <FormHelperText>
                  {errors?.propertyStatus?.message}
                </FormHelperText>
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
                      id="commissionType"
                      aria-describedby="commissionType_text"
                      size="small"
                      disabled={loading}
                      label="commissionType"
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
                  {errors?.commissionType?.message}
                </FormHelperText>
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
                      id="status"
                      aria-describedby="status_text"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {driverStatusLists?.map((driverStatus: any) => (
                        <MenuItem key={driverStatus.id} value={driverStatus.id}>
                          {driverStatus.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors?.status?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.kycStatus}
              >
                <InputLabel htmlFor="kycStatus">Kyc Status</InputLabel>
                <Controller
                  name="kycStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="kycStatus"
                      aria-describedby="kycStatus_text"
                      size="small"
                      disabled={loading}
                      label="kycStatus"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {kycStatusLists?.map((kycStatus: any) => (
                        <MenuItem key={kycStatus.id} value={kycStatus.id}>
                          {kycStatus.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors?.kycStatus?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.vehicleNo}
              >
                <InputLabel htmlFor="vehicleNo">Vehicle No</InputLabel>
                <FilledInput
                  size="small"
                  id="vehicleNo"
                  {...register("vehicleNo")}
                />
                <FormHelperText>{errors.vehicleNo?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.model}>
                <InputLabel htmlFor="model">Model</InputLabel>
                <FilledInput size="small" id="model" {...register("model")} />
                <FormHelperText>{errors.model?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.vehicleType}
              >
                <InputLabel htmlFor="vehicleType">Vehicle Type</InputLabel>
                <FilledInput
                  size="small"
                  id="vehicleType"
                  {...register("vehicleType")}
                />
                <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.fuelType}>
                <InputLabel htmlFor="vehicleType">Fuel Type</InputLabel>
                <FilledInput
                  size="small"
                  id="fuelType"
                  {...register("fuelType")}
                />
                <FormHelperText>{errors.fuelType?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.vehicleStatus}
              >
                <InputLabel htmlFor="vehicleStatus">Vehicle Status</InputLabel>
                <Controller
                  name="vehicleStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="vehicleStatus"
                      aria-describedby="vehicleStatus_text"
                      size="small"
                      disabled={loading}
                      label="vehicleStatus"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {vehicleStatusLists?.map((vehicleStatus: any) => (
                        <MenuItem
                          key={vehicleStatus.id}
                          value={vehicleStatus.id}
                        >
                          {vehicleStatus.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors?.kycStatus?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_businessLicenseImage}
              >
                <Controller
                  name="file_businessLicenseImage"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "file_businessLicenseImage is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_businessLicenseImage
                          ? typeof errors.file_businessLicenseImage.message ===
                            "string"
                            ? errors.file_businessLicenseImage.message
                            : undefined
                          : undefined
                      }
                      field="BusinessLicense"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_vehicleLicenseFront}
              >
                <Controller
                  name="file_vehicleLicenseFront"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "file_vehicleLicenseFront is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_vehicleLicenseFront
                          ? typeof errors.file_vehicleLicenseFront.message ===
                            "string"
                            ? errors.file_vehicleLicenseFront.message
                            : undefined
                          : undefined
                      }
                      field="VehicleLicenseFront"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_vehicleLicenseBack}
              >
                <Controller
                  name="file_vehicleLicenseBack"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "file_vehicleLicenseBack is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_vehicleLicenseBack
                          ? typeof errors.file_vehicleLicenseBack.message ===
                            "string"
                            ? errors.file_vehicleLicenseBack.message
                            : undefined
                          : undefined
                      }
                      field="VehicleLicenseBack"
                      disabled={loading}
                    />
                  )}
                />
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

export default DriverCreate;
