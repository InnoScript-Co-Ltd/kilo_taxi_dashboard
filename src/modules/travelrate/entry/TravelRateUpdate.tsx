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
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TravelRateFormInputs, travelRateSchema } from "../travelrate.payload";
import { travelRateService } from "../travelrate.service";

const TravelRateUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [vehicleTypeLists, setVehicleTypeLists] = useState<Array<any>>([]);
  const [cityLists, setCityLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { travelRate } = useSelector((state: AppRootState) => state.travelRate); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelRateFormInputs>({
    resolver: zodResolver(travelRateSchema),
    defaultValues: {
      id: 0,
      unit: "",
      rate: 0,
      vehicleTypeId: 0,
      cityId: 0,
    },
  });

  // Function to handle form submission and state update
  const submitTravelRateUpdate = async (data: TravelRateFormInputs) => {
    setLoading(true);
    const response: any = await travelRateService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.travelRateList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const vehicleTypeRes: any = await getRequest(
        `${endpoints.vehicleType}`,
        null,
        dispatch
      );
      await httpServiceHandler(dispatch, vehicleTypeRes);
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
    try {
      const cityRes: any = await getRequest(
        `${endpoints.city}`,
        null,
        dispatch
      );
      await httpServiceHandler(dispatch, cityRes);
      if (cityRes && "data" in cityRes && cityRes.status === 200) {
        setCityLists(cityRes.data.cities);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (travelRate) {
      setValue("id", Number(travelRate.id) || 0);
      setValue("unit", travelRate.unit || "");
      setValue("rate", travelRate.rate || 0);
      setValue("vehicleTypeId", travelRate.vehicleTypeId || 0);
      setValue("cityId", travelRate.cityId || 0);
    }
  }, [travelRate, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await travelRateService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>TravelRate Update</h2>

        <form onSubmit={handleSubmit(submitTravelRateUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.vehicleTypeId}
              >
                <InputLabel htmlFor="vehicleTypeId">VehicleType</InputLabel>
                <Controller
                  name="vehicleTypeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="vehicleTypeId"
                      aria-describedby="vehicleTypeId_text"
                      disabled={loading}
                      label="VehicleTypeId"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {vehicleTypeLists.map((vehicleType: any) => (
                        <MenuItem key={vehicleType.id} value={vehicleType.id}>
                          {vehicleType.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.vehicleTypeId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.cityId}>
                <InputLabel htmlFor="cityId">CityName</InputLabel>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="cityId"
                      aria-describedby="cityId_text"
                      disabled={loading}
                      label="cityId"
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

                <FormHelperText>{errors.vehicleTypeId?.message}</FormHelperText>
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
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default TravelRateUpdate;
