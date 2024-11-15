import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { customerService } from "../customer.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CustomerFormInputs, customerSchema } from "../customer.payload";
import { formBuilder } from "../../../helpers/formBuilder";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useState } from "react";
import {
  generalLists,
  kycStatusLists,
  statusLists,
} from "../../../constants/config";
import { DatePicker } from "@mui/x-date-pickers";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomerCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event : React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: CustomerFormInputs) => {
    const formdata = formBuilder(data, customerSchema);
    // Use forEach to log each key-value pair in the FormData
    // for (const [key, value] of formdata.entries()) {
    //   console.log(key, value);
    // }

    // return;

    const response = await customerService.store(
      formdata,
      dispatch,
      notifications
    );
    if (response.status === 201) {
      navigate(paths.countryList);
    }
  };

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Customer Create</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="admin_name">Name</InputLabel>
                <Input id="admin_name" {...register("Name")} />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" {...register("Email")} />
                <FormHelperText>{errors.Email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Phone}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input id="phone" {...register("Phone")} />
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
                <Input id="MobilePrefix" {...register("MobilePrefix")} />
                <FormHelperText>{errors.MobilePrefix?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
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
              <FormControl variant="filled" fullWidth error={!!errors.Email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" {...register("Email")} />
                <FormHelperText>{errors.Email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.Dob}>
                <Controller
                  name="Dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Date of Birth"
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
                  )}
                />
                <FormHelperText>{errors.Dob?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 6, xl: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.NrcFront}>
                <Controller
                  name="NrcFront"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        console.log("Selected file:", file); // Debugging log
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.NrcFront
                          ? typeof errors.NrcFront.message === "string"
                            ? errors.NrcFront.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="NRC Front" // Label for the upload button
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 6, xl: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.NrcBack}>
                <Controller
                  name="NrcBack"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "NRC front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        console.log("Selected file:", file); // Debugging log
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.NrcBack
                          ? typeof errors.NrcBack.message === "string"
                            ? errors.NrcBack.message
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

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Address}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input id="address" {...register("Address")} />
                <FormHelperText>{errors.Address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.State}>
                <InputLabel htmlFor="state">State</InputLabel>
                <Input id="state" {...register("State")} />
                <FormHelperText>{errors.State?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.City}>
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" {...register("City")} />
                <FormHelperText>{errors.City?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Township}>
                <InputLabel htmlFor="township">Township</InputLabel>
                <Input id="township" {...register("Township")} />
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
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {generalLists?.map((general: any) => (
                        <MenuItem key={general.id} value={String(general.id)}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Gender?.message}</FormHelperText>
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
                      id="KycStatus"
                      aria-describedby="kyc_status_text"
                      disabled={loading}
                      label="KycStatus"
                      {...field}
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {kycStatusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={String(status.id)}>
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

export default CustomerCreate;
