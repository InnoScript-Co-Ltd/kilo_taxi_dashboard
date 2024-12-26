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
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VehicleTypeFormInputs,
  vehicleTypeSchema,
} from "../vehicleType.payload";
import { vehicleTypeService } from "../vehicleType.service";

const VehicleTypeUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { vehicleTypes } = useSelector(
    (state: AppRootState) => state.vehicleType
  ); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleTypeFormInputs>({
    resolver: zodResolver(vehicleTypeSchema),
    defaultValues: {
      id: 0,
      Name: "",
      Description: "",
    },
  });

  // Function to handle form submission and state update
  const submitVehicleTypeUpdate = async (data: VehicleTypeFormInputs) => {
    setLoading(true);
    const response: any = await vehicleTypeService.update(
      dispatch,
      params.id,
      data
    );
    if (response.status === 200) {
      navigate(`${paths.vehicleTypeList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  useEffect(() => {
    if (vehicleTypes) {
      setValue("id", Number(vehicleTypes.id) || 0);
      setValue("Name", vehicleTypes.name || "");
      setValue("Description", vehicleTypes.description || "");
    }
  }, [vehicleTypes, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await vehicleTypeService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Vehicle Type Update</h2>

        <form onSubmit={handleSubmit(submitVehicleTypeUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <FilledInput size="small" id="name" {...register("Name")} />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Description}
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <FilledInput
                  size="small"
                  id="description"
                  {...register("Description")}
                />
                <FormHelperText>{errors.Description?.message}</FormHelperText>
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
              onClick={() => navigate(paths.vehicleTypeList)}
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

export default VehicleTypeUpdate;
