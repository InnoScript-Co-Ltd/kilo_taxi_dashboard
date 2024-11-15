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
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { generalLists, statusLists } from "../../../constants/config";

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
      gender: "",
      status: ""
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
      setValue("Name", admin.name || "");
      setValue("Phone", admin.phone || "");
      setValue("Email", admin.email || "");
      setValue("Password", admin.password || "");
      setValue("gender", admin.gender || "");
      setValue("status", admin.status || "");
    }
  }, [admin, setValue]);

  // Submit form data
  const onSubmit = async (data: AdminFormInputs) => {
    setLoading(true);
    const response = await adminService.update(dispatch, params.id, data);
    if (response.data) {
      navigate(`${paths.adminList}`);
    }
    setLoading(false);
  };
  

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Admin Update</h2>
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
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Email}
              >
                <InputLabel htmlFor="email">
                  Email
                </InputLabel>
                <Input id="email" {...register("Email")} />
                <FormHelperText>
                  {errors.Email?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Phone}
              >
                <InputLabel htmlFor="phone">
                  Phone
                </InputLabel>
                <Input id="phone" {...register("Phone")} />
                <FormHelperText>
                  {errors.Phone?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Password}
              >
                <InputLabel htmlFor="password">
                  Password
                </InputLabel>
                <Input id="password" {...register("Password")} />
                <FormHelperText>
                  {errors.Password?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Email}
              >
                <InputLabel htmlFor="email">
                  Email
                </InputLabel>
                <Input id="email" {...register("Email")} />
                <FormHelperText>
                  {errors.Email?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.gender}
              >
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

                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.status}
              >
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AdminUpdate;
