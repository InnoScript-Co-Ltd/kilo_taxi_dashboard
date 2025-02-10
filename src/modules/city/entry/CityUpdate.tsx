import { Box, Button, Card, FilledInput, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { citySchema, cityStatuslists, CityUpdateFormInputs } from "../city.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { cityService } from "../city.service";
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";

const CityUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { city } = useSelector((state: AppRootState) => state.city);
  const notifications = useNotifications();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<CityUpdateFormInputs>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      Name: "",
      Status: "ACTIVE"
    },
  });

  const submitCityUpdate = async (data: CityUpdateFormInputs) => {
    setLoading(true);
    const response: any = await cityService.update(dispatch, params.id, data, notifications);
    if (response.status === 200) {
      navigate(`${paths.cityList}`);
    }
    setLoading(false);
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await cityService.show(dispatch, params.id);
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (city) {
      console.log(city);
      setValue("Name", city.Name || "");
      setValue("Status", city.Status || "ACTIVE")
    }
  }, [city, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>City Update</h2>

        <form onSubmit={handleSubmit(submitCityUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="city_name" style={{ fontSize: "12px" }}>City Name</InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  id="city_name"
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
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {cityStatuslists?.map((general: any) => (
                        <MenuItem key={general.id} value={general.value}>
                          {general.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Status?.message}</FormHelperText>
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
            <Button variant="outlined" onClick={() => navigate(paths.cityList)}>
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

export default CityUpdate;
