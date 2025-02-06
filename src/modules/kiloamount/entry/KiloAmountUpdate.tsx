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
import { KiloAmountFormInputs, kiloAmountSchema } from "../kiloamount.payload";
import { kiloAmountService } from "../kiloamount.service";

const KiloAmountUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { kiloAmount } = useSelector((state: AppRootState) => state.kiloAmount); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KiloAmountFormInputs>({
    resolver: zodResolver(kiloAmountSchema),
    defaultValues: {
      id: 0,
      kilo: 0,
      amount: 0,
    },
  });

  // Function to handle form submission and state update
  const submitKiloAmountUpdate = async (data: KiloAmountFormInputs) => {
    setLoading(true);
    const response: any = await kiloAmountService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.kiloAmountList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  useEffect(() => {
    if (kiloAmount) {
      setValue("id", Number(kiloAmount.id) || 0);
      setValue("kilo", Number(kiloAmount.kilo) || 0);
      setValue("amount", Number(kiloAmount.amount) || 0);
    }
  }, [kiloAmount, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await kiloAmountService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Kilo Amount Update</h2>

        <form onSubmit={handleSubmit(submitKiloAmountUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.kilo}>
                <InputLabel htmlFor="kilo">Kilo</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="kilo"
                  {...register("kilo")}
                />
                <FormHelperText>{errors.kilo?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.amount}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="amount"
                  {...register("amount", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.amount?.message}</FormHelperText>
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
              onClick={() => navigate(paths.kiloAmountList)}
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

export default KiloAmountUpdate;
