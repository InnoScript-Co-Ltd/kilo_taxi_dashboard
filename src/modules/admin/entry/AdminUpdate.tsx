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
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { AdminFormInputs, adminSchema } from "../admin.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { adminService } from "../admin.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../constants/paths";
import {
  genderStatuslists,
  customerStatusLists,
} from "../../../constants/config";
import Loading from "../../../components/Loading";
import { getId } from "../../../helpers/updateHelper";
import Password from "../../../components/Password";

const AdminUpdate = () => {
  const [loading, setLoading] = useState(false);
  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { admin } = useSelector((state: AppRootState) => state.admin);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AdminFormInputs>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Phone: "",
      Password: "",
      gender: 0,
      role: "Admin",
      status: 0,
      // emailVerifiedAt: null,
      // phoneVerifiedAt: null,
      // flagIcon: undefined,
      // zipCode: ""
    },
  });

  // Load data into form fields on component mount
  const loadingData = useCallback(async () => {
    setLoading(true);
    await adminService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Populate form values when country data is available
  useEffect(() => {
    if (admin) {
      setValue("id", admin.id || 0);
      setValue("Name", admin.name || "");
      setValue("Phone", admin.phone || "");
      setValue("Email", admin.email || "");
      // setValue(
      //   "emailVerifiedAt",
      //   new Date(admin.emailVerifiedAt) || new Date()
      // );
      // setValue(
      //   "phoneVerifiedAt",
      //   new Date(admin.phoneVerifiedAt) || new Date()
      // );
      setValue("Password", admin.password || "");
      setValue("address", admin.address || "");
      setValue(
        "gender",
        getId({ lists: genderStatuslists, value: admin.gender }) || 0
      );
      setValue(
        "status",
        getId({ lists: customerStatusLists, value: admin.status }) || 0
      );
    }
  }, [admin, setValue]);

  // Submit form data
  const onSubmit = async (data: AdminFormInputs) => {
    try {
      setLoading(true);
      const response = await adminService.update(dispatch, params.id, data);
      if (response.statusCode === 200) {
        setLoading(false);
        navigate(`${paths.adminList}`);
      }
      setLoading(false);
    } catch (error) {
      console.error("Admin Update Error :", error);
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
        <h2>Admin Update</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="admin_name">Name</InputLabel>
                <FilledInput
                  disabled={loading}
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
              <Password register={register} loading={loading} errors={errors} />
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.address}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <FilledInput
                  disabled={loading}
                  size="small"
                  id="address"
                  {...register("address")}
                />
                <FormHelperText>{errors.address?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.emailVerifiedAt}>
                <Controller
                  name="emailVerifiedAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Email verified at"
                      value={field.value}
                      defaultValue={field.value}
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
            </Grid2> */}

            {/* <Grid2 size={{ xs: 6, md: 3 }}>
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
            </Grid2> */}

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
                      value={field.value} // Convert field value to a string
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
                      value={field.value} // Convert field value to a string
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
            <Button type="submit" disabled={loading} variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AdminUpdate;
