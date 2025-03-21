import * as React from "react";
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
import { useState } from "react";
import {
  RoleCreateFormInputs,
  roleSchema,
  roleStatuslists,
} from "../role.payload";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { roleService } from "../role.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";

const RoleCreate = () => {
  const [loading, setLoading] = useState(false);

  const notifications = useNotifications();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoleCreateFormInputs>({
    resolver: zodResolver(roleSchema),
    // defaultValues: {
    //   Name: "",
    //   // Status: "ACTIVE",
    // },
  });

  const submitRoleCreate = async (data: RoleCreateFormInputs) => {
    console.log("role");
    setLoading(true);
    const roleData = { ...data };

    const response = await roleService.store(roleData, dispatch, notifications);
    if (response.status === 201) {
      navigate(`${paths.roleList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Role Create</h2>
        <form onSubmit={handleSubmit(submitRoleCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.name}>
                <InputLabel htmlFor="role_name" style={{ fontSize: "12px" }}>
                  Name
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  id="role_name"
                  {...register("name")}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Status}>
                <InputLabel htmlFor="status"> Status </InputLabel>
                <Controller
                  name="Status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ paddingTop: "20px", fontSize: "14px" }}
                      id="status"
                      aria-describedby="status_text"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || "ACTIVE"} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {roleStatuslists?.map((general: any) => (
                        <MenuItem key={general.id} value={general.value}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Status?.message}</FormHelperText>
              </FormControl>
            </Grid2> */}
          </Grid2>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button variant="outlined" onClick={() => navigate(paths.roleList)}>
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

export default RoleCreate;
