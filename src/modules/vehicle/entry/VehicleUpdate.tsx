import {
    Box,
    Button,
    Card,
    FormControl,
    FormHelperText,
    Grid2,
    Input,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { VehicleFormInputs, vehicleSchema } from "../vehicle.payload"; // Assuming vehicleSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { vehicleService } from "../vehicle.service"; // Service for handling vehicle API requests
import {
    httpErrorHandler,
    httpServiceHandler,
} from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const VehicleUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [driversList, setDriversList] = useState<Array<any>>([]);
    const [vehicleTypes, setVehicleTypes] = useState<Array<string>>(["Sedan", "SUV", "Truck", "Van"]);
  
    const params: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { vehicle } = useSelector((state: AppRootState) => state.vehicle); // Selecting vehicle data from the store

    // Set up React Hook Form with Zod schema
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VehicleFormInputs>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            driverId: "",
            vehicleNo: "",
            vehicleType: "",
            model: "",
            fuelType: "",
            status: "",
        },
    });

    // Function to handle form submission and vehicle update
    const submitVehicleUpdate = async (data: VehicleFormInputs) => {
        setLoading(true);
        const response: any = await vehicleService.update(
            dispatch,
            params.id,
            data
        );
        if (response.status === 204) {
            navigate(paths.vehicleList); // Navigate to the vehicle list page on success
        }
        setLoading(false);
    };

    // Function to load vehicle data based on the ID from params
    const loadingData = useCallback(async () => {
        setLoading(true);
        try {
            await vehicleService.show(dispatch, params.id); // Fetch vehicle data to populate the form
            const driverResponse: any = await getRequest(endpoints.driver, null);
            const vehicleTypeResponse: any = await getRequest(endpoints.vehicle, null); // Example endpoint for vehicle types

            await httpServiceHandler(dispatch, driverResponse);
            await httpServiceHandler(dispatch, vehicleTypeResponse);

            if (driverResponse && "data" in driverResponse && driverResponse.status === 200) {
                setDriversList(driverResponse.data.drivers);
            }
            if (vehicleTypeResponse && "data" in vehicleTypeResponse && vehicleTypeResponse.status === 200) {
                setVehicleTypes(vehicleTypeResponse.data.vehicleTypes);
            }
        } catch (error) {
            await httpErrorHandler(error);
        }
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (vehicle) {
            setValue("driverId", vehicle.driverId || "");
            setValue("vehicleNo", vehicle.vehicleNo || "");
            setValue("vehicleType", vehicle.vehicleType || "");
            setValue("model", vehicle.model || "");
            setValue("fuelType", vehicle.fuelType || "");
            setValue("status", vehicle.status || "");
        }
    }, [vehicle, setValue]);

    return (
        <Box>
            <Breadcrumb />
            <Card sx={{ marginTop: "20px", padding: "20px" }}>
                <h2>Vehicle Update</h2>

                <form onSubmit={handleSubmit(submitVehicleUpdate)}>
                    <Grid2 container spacing={2}>
                        {/* Driver Select */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.driverId}>
                                <InputLabel htmlFor="driver_id">Driver</InputLabel>
                                <Controller
                                    name="driverId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            id="driver_id"
                                            label="Driver"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={loading}
                                        >
                                            {driversList?.map((driver: any) => (
                                                <MenuItem key={driver.id} value={String(driver.id)}>
                                                    {driver.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.driverId?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Vehicle Number */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.vehicleNo}>
                                <InputLabel htmlFor="vehicle_no">Vehicle Number</InputLabel>
                                <Input id="vehicle_no" {...register("vehicleNo")} />
                                <FormHelperText>{errors.vehicleNo?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Vehicle Type */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.vehicleType}>
                                <InputLabel htmlFor="vehicle_type">Vehicle Type</InputLabel>
                                <Controller
                                    name="vehicleType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            id="vehicle_type"
                                            label="Vehicle Type"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={loading}
                                        >
                                            {vehicleTypes?.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Model */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.model}>
                                <InputLabel htmlFor="model">Model</InputLabel>
                                <Input id="model" {...register("model")} />
                                <FormHelperText>{errors.model?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Fuel Type */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.fuelType}>
                                <InputLabel htmlFor="fuel_type">Fuel Type</InputLabel>
                                <Input id="fuel_type" {...register("fuelType")} />
                                <FormHelperText>{errors.fuelType?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Status */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.status}>
                                <InputLabel htmlFor="status">Status</InputLabel>
                                <Input id="status" {...register("status")} />
                                <FormHelperText>{errors.status?.message}</FormHelperText>
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
                        <Button variant="outlined" onClick={() => navigate(paths.vehicleList)}>
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

export default VehicleUpdate;
