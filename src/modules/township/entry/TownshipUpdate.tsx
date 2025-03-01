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
import {
  townshipSchema,
  townshipStatuslists,
  TownshipUpdateFormInputs,
} from "../township.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { townshipService } from "../township.service";
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { getId } from "../../../helpers/updateHelper";

const TownshipUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [cityLists, setCityLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { township } = useSelector((state: AppRootState) => state.township);
  const notifications = useNotifications();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TownshipUpdateFormInputs>({
    resolver: zodResolver(townshipSchema),
    defaultValues: {
      id: 0,
      Name: "",
      Status: 0,
      cityId: 0,
    },
  });

  const submitTownshipUpdate = async (data: TownshipUpdateFormInputs) => {
    setLoading(true);
    const response: any = await townshipService.update(
      dispatch,
      params.id,
      data,
      notifications
    );
    if (response.status === 200) {
      navigate(`${paths.townshipList}`);
    }
    setLoading(false);
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await townshipService.show(dispatch, params.id);
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  const loadCities = useCallback(async () => {
    try {
      const cityRes: any = await getRequest(
        `${endpoints.city}`,
        null,
        dispatch
      );
      if (cityRes && cityRes.data && cityRes.status === 200) {
        setCityLists(cityRes.data.cities);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  useEffect(() => {
    if (township) {
      console.log(township);
      setValue("id", township.id || 0);
      setValue("Name", township.name || "");
      setValue(
        "Status",
        getId({ lists: townshipStatuslists, value: township.status }) || 0
      );
      setValue("cityId", township?.cityDto?.id || 0);
    }
  }, [township, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Township Update</h2>

        <form onSubmit={handleSubmit(submitTownshipUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel
                  htmlFor="township_name"
                  style={{ fontSize: "12px" }}
                >
                  Township Name
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
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {townshipStatuslists?.map((general: any) => (
                        <MenuItem key={general.id} value={general.id}>
                          {general.value}
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

          {/* Footer */}
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

export default TownshipUpdate;
