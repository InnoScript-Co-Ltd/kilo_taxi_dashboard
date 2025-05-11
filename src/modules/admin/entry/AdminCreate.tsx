import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
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
import { AdminCreateFormInputs, adminCreateSchema } from "../admin.payload";
import { useNotifications } from "@toolpad/core/useNotifications";
import React, { useState } from "react";
import { genderStatuslists } from "../../../constants/config";
import Loading from "../../../components/Loading";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";

const AdminCreate = () => {
  const [loading, setLoading] = useState(false);
  const [roleLists, setRoleLists] = useState<Array<any>>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AdminCreateFormInputs>({
    resolver: zodResolver(adminCreateSchema),
  });

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const roleRes: any = await getRequest(
        `${endpoints?.role}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, roleRes.data);
      if (roleRes && "data" in roleRes && roleRes.status === 200) {
        setRoleLists(roleRes?.data?.payload?.roleInfoDtos);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  const onSubmit = async (data: AdminCreateFormInputs) => {
    try {
      setLoading(true);
      const adminData = { ...data };
      const response = await adminService.store(
        adminData,
        dispatch,
        notifications
      );

      if (response.statusCode === 201) {
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
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="admin_name" style={{ fontSize: "12px" }}>
                  Name
                </InputLabel>
                <FilledInput
                  size="small"
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  id="admin_name"
                  disabled={loading}
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
                      value={field.value || "MALE"} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {genderStatuslists?.map((gender: any) => (
                        <MenuItem key={gender.id} value={gender.value}>
                          {gender.value}
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
                      multiple
                      label="Roles"
                      value={field.value || []} // Ensure it's an empty array if no values
                      onChange={(event) => {
                        // Ensure the new value is correctly handled for multiple selections
                        field.onChange(event.target.value);
                      }}
                    >
                      {roleLists?.map((role: any) => (
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
                  size="small"
                  id="address"
                  disabled={loading}
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

export default AdminCreate;
