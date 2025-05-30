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
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { townshipService } from "../township.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TownshipCreateFormInputs,
  townshipSchema,
  townshipStatuslists,
} from "../township.payload";
import { useNotifications } from "@toolpad/core/useNotifications";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";

const TownshipCreate = () => {
  const [loading, setLoading] = useState(false);
  const [cityLists, setCityLists] = useState<Array<any>>([]);
  const notifications = useNotifications();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TownshipCreateFormInputs>({
    resolver: zodResolver(townshipSchema),
    defaultValues: {
      Name: "",
      Status: 0,
      cityId: 0,
    },
  });

  const submitTownshipCreate = async (data: TownshipCreateFormInputs) => {
    setLoading(true);
    try {
      const response = await townshipService.store(
        data,
        dispatch,
        notifications
      );
      if (response.statusCode === 201) {
        navigate(paths.townshipList);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const cityRes: any = await getRequest(
        `${endpoints.city}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, cityRes.data);
      if (cityRes && "data" in cityRes && cityRes.status === 200) {
        setCityLists(cityRes.data.cities);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Township Create</h2>
        <form onSubmit={handleSubmit(submitTownshipCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel
                  htmlFor="township_name"
                  style={{ fontSize: "12px" }}
                >
                  Name
                </InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  id="township_name"
                  {...register("Name")}
                />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
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
                      style={{ paddingTop: "20px", fontSize: "14px" }}
                      id="status"
                      aria-describedby="status_text"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {townshipStatuslists.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
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
              <FormControl variant="filled" fullWidth error={!!errors.cityId}>
                <InputLabel htmlFor="city_name">City Name</InputLabel>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="city_name"
                      aria-describedby="city_name_text"
                      disabled={loading}
                      label="City Name"
                      {...field}
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {cityLists.map((city: any) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.cityId?.message}</FormHelperText>
              </FormControl>
            </Grid2>
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
            <Button
              variant="outlined"
              onClick={() => navigate(paths.townshipList)}
            >
              Cancel
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default TownshipCreate;
