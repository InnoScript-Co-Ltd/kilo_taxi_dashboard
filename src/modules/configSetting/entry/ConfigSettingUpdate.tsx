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
import {
  ConfigSettingFormInputs,
  configSettingSchema,
} from "../configsetting.payload";
import { configSettingService } from "../configsetting.service";

const ConfigSettingUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { configSetting } = useSelector(
    (state: AppRootState) => state.configSetting
  ); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfigSettingFormInputs>({
    resolver: zodResolver(configSettingSchema),
    defaultValues: {
      id: 0,
      commissionRate: 0,
      commissionAmount: 0,
      defaultTime: "00:00:00",
      matchDistance: 0,
      maxMatchDistance: 0,
      minute: 0,
      minutePerRate: 0,
    },
  });

  // Function to handle form submission and state update
  const submitCommissionConfigUpdate = async (
    data: ConfigSettingFormInputs
  ) => {
    setLoading(true);
    const response: any = await configSettingService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.configSettingList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  useEffect(() => {
    if (configSetting) {
      setValue("id", Number(configSetting.id) || 0);
      setValue("commissionRate", Number(configSetting.commissionRate) || 0);
      setValue("commissionAmount", configSetting.commissionAmount);
      setValue("defaultTime", configSetting.defaultTime || "00:00:00");
      setValue("matchDistance", configSetting.matchDistance);
      setValue("maxMatchDistance", configSetting.maxMatchDistance);
      setValue("minute", configSetting.minute);
      setValue("minutePerRate", configSetting.minutePerRate);
    }
  }, [configSetting, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await configSettingService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Commission Config Update</h2>

        <form onSubmit={handleSubmit(submitCommissionConfigUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.commissionRate}
              >
                <InputLabel htmlFor="commissionRate">
                  Commission Rate(%)
                </InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="commissionRate"
                  {...register("commissionRate", { valueAsNumber: true })}
                />
                <FormHelperText>
                  {errors.commissionRate?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.commissionAmount}
              >
                <InputLabel htmlFor="commissionAmount">
                  Commission Amount(MMK)
                </InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="commissionAmount"
                  {...register("commissionAmount", { valueAsNumber: true })}
                />
                <FormHelperText>
                  {errors.commissionAmount?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.matchDistance}
              >
                <InputLabel htmlFor="matchDistance">
                  Match Distance(Kilo)
                </InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="matchDistance"
                  {...register("matchDistance", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.matchDistance?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.maxMatchDistance}
              >
                <InputLabel htmlFor="maxMatchDistance">
                  Max Match Distance(Kilo)
                </InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="maxMatchDistance"
                  {...register("maxMatchDistance", { valueAsNumber: true })}
                />
                <FormHelperText>
                  {errors.maxMatchDistance?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.minute}>
                <InputLabel htmlFor="minute">Minute</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="minute"
                  {...register("minute", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.minute?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.minutePerRate}
              >
                <InputLabel htmlFor="minutePerRate">
                  Minute Per Rate(MMK)
                </InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="minutePerRate"
                  {...register("minutePerRate")}
                />
                <FormHelperText>{errors.minutePerRate?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                fullWidth
                variant="filled"
                error={!!errors.defaultTime}
              >
                <InputLabel htmlFor="defaultTime">
                  Default Time (hh:mm:ss)
                </InputLabel>
                <FilledInput
                  type="text"
                  id="timeSpan"
                  {...register("defaultTime")}
                />
                <FormHelperText>{errors.defaultTime?.message}</FormHelperText>
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
              onClick={() => navigate(paths.configSettingList)}
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

export default ConfigSettingUpdate;
