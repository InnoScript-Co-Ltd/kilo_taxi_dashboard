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
import { AdminUpdateFormInputs, adminUpdateSchema } from "../admin.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { adminService } from "../admin.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../constants/paths";
import { genderStatuslists } from "../../../constants/config";
import Loading from "../../../components/Loading";
import { useNotifications } from "@toolpad/core";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";

const AdminUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [roleLists, setRoleLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { admin } = useSelector((state: AppRootState) => state.admin);

  const notification = useNotifications();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AdminUpdateFormInputs>({
    resolver: zodResolver(adminUpdateSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Phone: "",
      Gender: "MALE",
      roleIds: [],
    },
  });
  const onSubmit = async (data: AdminUpdateFormInputs) => {
    try {
      setLoading(true);
      const response = await adminService.update(
        dispatch,
        params.id,
        data,
        notification
      );
      if (response.statusCode === 200) {
        setLoading(false);
        navigate(`${paths.adminList}`);
      }
      setLoading(false);
    } catch (error) {
      console.error("Admin Update Error :", error);
    }
  };

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
      console.log("admin:", admin.roleInfoDtos);
      setValue("Id", admin.id);
      setValue("Name", admin.name || "");
      setValue("Phone", admin.phone || "");
      setValue("Email", admin.email || "");
      setValue("Address", admin.address || "");
      setValue("Gender", admin.gender || "MALE");
      setValue(
        "roleIds",
        (admin?.roleInfoDtos || []).map((r) => Number(r.id))
      );
    }
  }, [admin, setValue]);

  const loadRoles = useCallback(async () => {
    try {
      const roleRes: any = await getRequest(
        `${endpoints?.role}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, roleRes.data);
      if (roleRes && "data" in roleRes && roleRes.status === 200) {
        console.log("roles :", roleRes.data.payload.roleInfoDtos[2].name);
        setRoleLists(roleRes?.data?.payload?.roleInfoDtos);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  // Submit form data

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
                <InputLabel htmlFor="admin_name" style={{ fontSize: "12px" }}>
                  Name
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
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
                <InputLabel htmlFor="email" style={{ fontSize: "12px" }}>
                  Email
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
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
                <InputLabel htmlFor="phone" style={{ fontSize: "12px" }}>
                  Phone
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  disabled={loading}
                  id="phone"
                  {...register("Phone")}
                />
                <FormHelperText>{errors.Phone?.message}</FormHelperText>
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
                      style={{ paddingTop: "20px", fontSize: "14px" }}
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
                        <MenuItem key={general.id} value={general.value}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Gender?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 4 }}>
              <FormControl variant="filled" fullWidth error={!!errors.roleIds}>
                <InputLabel htmlFor="role_name">Roles</InputLabel>
                <Controller
                  name="roleIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ paddingTop: "20px", fontSize: "14px" }}
                      size="small"
                      id="role_name"
                      aria-describedby="role_name_text"
                      disabled={loading}
                      label="Roles"
                      multiple
                      {...field}
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {roleLists.map((role: any) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.roleIds?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 8 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Address}>
                <InputLabel htmlFor="address" style={{ fontSize: "12px" }}>
                  Address
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="address"
                  {...register("Address")}
                />
                <FormHelperText>{errors.Address?.message}</FormHelperText>
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
