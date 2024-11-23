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
import { adminService } from "../admin.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AdminFormInputs, adminSchema } from "../admin.payload";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useState } from "react";
import { genderStatuslists } from "../../../constants/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import Loading from "../../../components/Loading";

const AdminCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AdminFormInputs>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data: AdminFormInputs) => {
    try {
      setLoading(true);
      const response = await adminService.store(data, dispatch, notifications);
      if (response.status === 201) {
        setLoading(false);
        navigate(paths.adminList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Admin Create Error: ", error);
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
        <h2>Admin Create</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="outlined" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="admin_name">Name</InputLabel>
                <FilledInput
                  size="small"
                  id="admin_name"
                  disabled={loading}
                  {...register("Name")}
                />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <FilledInput size="small" disabled={loading} id="email" {...register("Email")} />
                <FormHelperText>{errors.Email?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Phone}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FilledInput size="small"  disabled={loading} id="phone" {...register("Phone")} />
                <FormHelperText>{errors.Phone?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                 disabled={loading}
                  size="small"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("Password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                         disabled={loading}
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
              <FormControl variant="filled" fullWidth error={!!errors.address}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <FilledInput
                  size="small"
                  id="address"
                  disabled={loading}
                  {...register("address")}
                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.emailVerifiedAt}>
                <Controller
                  name="emailVerifiedAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Email verified at"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.emailVerifiedAt,
                          helperText: errors.emailVerifiedAt?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>
                  {errors.emailVerifiedAt?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.phoneVerifiedAt}>
                <Controller
                  name="phoneVerifiedAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Phone verified at"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.phoneVerifiedAt,
                          helperText: errors.phoneVerifiedAt?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>
                  {errors.phoneVerifiedAt?.message}
                </FormHelperText>
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
                      id="gender"
                      aria-describedby="gender_text"
                      size="small"
                      disabled={loading}
                      label="Gender"
                      {...field}
                      value={field.value || ''} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {genderStatuslists?.map((general: any) => (
                        <MenuItem key={general.id} value={general.id}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.gender?.message}</FormHelperText>
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
                      value={field.value || ''} // Convert field value to a string
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

                <FormHelperText>{errors.status?.message}</FormHelperText>
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
              onClick={() => navigate(paths.adminList)}
            >
              Cancel
            </Button>
            <Button type="submit"  disabled={loading} variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AdminCreate;
