import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  ExtraDemandFormInputs,
  extraDemandSchema,
} from "../extraDemand.payload"; // Assuming walletSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { extraDemandService } from "../extraDemand.service"; // Service for handling wallet API requests
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";

const ExtraDemandUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { extraDemand } = useSelector(
    (state: AppRootState) => state.extraDemand
  ); // Selecting wallet data from the store
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExtraDemandFormInputs>({
    resolver: zodResolver(extraDemandSchema),
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
    },
  });

  // Function to handle form submission and wallet update
  const submitExtraDemandUpdate = async (data: ExtraDemandFormInputs) => {
    setLoading(true);
    const response: any = await extraDemandService.update(
      dispatch,
      params.id,
      data,
      notifications
    );
    if (response.statusCode === 200) {
      navigate(`${paths.extraDemandList}`); // Navigate to the wallet list page on success
    }
    setLoading(false);
  };

  // Function to load wallet data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await extraDemandService.show(dispatch, params.id); // Fetch wallet data to populate the form
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (extraDemand) {
      setValue("id", Number(extraDemand.id) || 0);
      setValue("title", extraDemand.title || "");
      setValue("amount", extraDemand.amount || 0);
      setValue("description", extraDemand.description || "");
    }
  }, [extraDemand, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>ExtraDemand Update</h2>

        <form onSubmit={handleSubmit(submitExtraDemandUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.title}>
                <InputLabel htmlFor="ExtraDemand_name">
                  ExtraDemand Name
                </InputLabel>
                <FilledInput
                  size="small"
                  id="ExtraDemand_name"
                  {...register("title")}
                />
                <FormHelperText>{errors.title?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.amount}>
                <InputLabel htmlFor="ExtraDemand_amount">Amount</InputLabel>
                <FilledInput
                  size="small"
                  id="ExtraDemand_amount"
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.amount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.description}
              >
                <InputLabel htmlFor="ExtraDemand_description">
                  Description
                </InputLabel>
                <FilledInput
                  size="small"
                  id="ExtraDemand_description"
                  multiline
                  rows={4}
                  {...register("description")}
                />
                <FormHelperText>{errors.description?.message}</FormHelperText>
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
              onClick={() => navigate(paths.extraDemandList)}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ExtraDemandUpdate;
