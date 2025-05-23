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
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TravelRateFormInputs, travelRateSchema } from "../travelrate.payload";
import { travelRateService } from "../travelrate.service";
import { useNotifications } from "@toolpad/core/useNotifications";

const TravelRateCreate = () => {
  const [loading, setLoading] = useState(false);
  const [cityLists, setCityLists] = useState<Array<any>>([]);
  const [vehicleLists, setVehicleTypeLists] = useState<Array<any>>([]);
  const notifications = useNotifications();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelRateFormInputs>({
    resolver: zodResolver(travelRateSchema),
  });

  const submitTravelRateCreate = async (data: TravelRateFormInputs) => {
    setLoading(true);
    const response = await travelRateService.store(
      data,
      dispatch,
      notifications
    );
    console.log("create", response);
    if (response.statusCode === 201) {
      navigate(`${paths.travelRateList}`);
    }
    setLoading(false);
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
    try {
      const vehicleTypeRes: any = await getRequest(
        `${endpoints.vehicleType}`,
        null,
        dispatch
      );
      console.log(vehicleTypeRes.data.payload.vehicleTypes);
      await httpServiceHandler(dispatch, vehicleTypeRes.data);
      if (
        vehicleTypeRes &&
        "data" in vehicleTypeRes &&
        vehicleTypeRes.data.statusCode === 200
      ) {
        setVehicleTypeLists(vehicleTypeRes.data.payload.vehicleTypes);
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
        <h2>TravelRate Create</h2>
        <form onSubmit={handleSubmit(submitTravelRateCreate)}>
          <Grid2 container spacing={2}>
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
                      label="City"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
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

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.cityId}>
                <InputLabel htmlFor="vehicle_Type">Vehicle Type</InputLabel>
                <Controller
                  name="vehicleTypeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="vehicle_Type"
                      aria-describedby="vehicle_Type_text"
                      disabled={loading}
                      label="VehicleType"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {vehicleLists.map((vehicleType: any) => (
                        <MenuItem key={vehicleType.id} value={vehicleType.id}>
                          {vehicleType.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.cityId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.unit}>
                <InputLabel htmlFor="unit">Unit</InputLabel>
                <FilledInput size="small" id="unit" {...register("unit")} />
                <FormHelperText>{errors.unit?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.rate}>
                <InputLabel htmlFor="rate">Rate</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="rate"
                  {...register("rate", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.rate?.message}</FormHelperText>
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
              onClick={() => navigate(paths.travelRateList)}
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

export default TravelRateCreate;
