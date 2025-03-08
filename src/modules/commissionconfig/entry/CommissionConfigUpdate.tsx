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
  CommissionConfigFormInputs,
  commissionConfigSchema,
} from "../commissionconfig.payload";
import { commissionConfigService } from "../commissionconfig.service";

const CommissionConfigUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { commissionConfig } = useSelector(
    (state: AppRootState) => state.commissionConfig
  ); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommissionConfigFormInputs>({
    resolver: zodResolver(commissionConfigSchema),
    defaultValues: {
      id: 0,
      commissionRate: "",
    },
  });

  // Function to handle form submission and state update
  const submitCommissionConfigUpdate = async (
    data: CommissionConfigFormInputs
  ) => {
    setLoading(true);
    const response: any = await commissionConfigService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.commissionConfigList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  useEffect(() => {
    if (commissionConfig) {
      setValue("id", Number(commissionConfig.id) || 0);
      setValue("commissionRate", commissionConfig.commissionRate || "");
    }
  }, [commissionConfig, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await commissionConfigService.show(dispatch, params.id);
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
                  Commission Rate
                </InputLabel>
                <FilledInput
                  type="text"
                  size="small"
                  id="commissionRate"
                  {...register("commissionRate")}
                />
                <FormHelperText>
                  {errors.commissionRate?.message}
                </FormHelperText>
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
              onClick={() => navigate(paths.commissionConfigList)}
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

export default CommissionConfigUpdate;
