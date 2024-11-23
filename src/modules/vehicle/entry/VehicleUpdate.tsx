import {
    Box,
    Button,
    Card,
    FilledInput,
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
import { vehicleStatusLists } from "../../../constants/config";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";

const VehicleUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [driversList, setDriversList] = useState<Array<any>>([]);
  
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
            VehicleNo: "",
            VehicleType: "",
            Model: "",
            FuelType: "",
            Status: "",
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
            

            await httpServiceHandler(dispatch, driverResponse);
            

            if (driverResponse && "data" in driverResponse && driverResponse.status === 200) {
                setDriversList(driverResponse.data.drivers);
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
            setValue("DriverId", vehicle.driverId || 0);
            setValue("VehicleNo", vehicle.vehicleNo || "");
            setValue("VehicleType", vehicle.vehicleType || "");
            setValue("Model", vehicle.model || "");
            setValue("FuelType", vehicle.fuelType || "");
            setValue("Status", vehicle.status || "");
            setValue("file_BusinessLicenseImage", vehicle.file_BusinessLicenseImage || "");
            setValue("file_VehicleLicenseFront", vehicle.file_VehicleLicenseFront || "");
            setValue("file_VehicleLicenseBack", vehicle.file_VehicleLicenseBack || "");
        }
    }, [vehicle, setValue]);

    return (
        <Box>
            <Breadcrumb />
            <Card sx={{ marginTop: "20px", padding: "20px" }}>
                <h2>Vehicle Update</h2>

                <form onSubmit={handleSubmit(submitVehicleUpdate)}>
                    <Grid2 container spacing={2}>
                        

                        {/* Vehicle Number */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.VehicleNo}>
                                <InputLabel htmlFor="vehicle_no">Vehicle Number</InputLabel>
                                <FilledInput size="small" id="vehicle_no" {...register("VehicleNo")} />
                                <FormHelperText>{errors.VehicleNo?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Vehicle Type */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.VehicleType}>
                                <InputLabel htmlFor="vehicle_type">Vehicle Type</InputLabel>
                                <FilledInput size="small" id="vehicle_type" {...register("VehicleType")} />
                                <FormHelperText>{errors.VehicleType?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Model */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.Model}>
                                <InputLabel htmlFor="Model">Model</InputLabel>
                                <FilledInput size="small" id="Model" {...register("Model")} />
                                <FormHelperText>{errors.Model?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                         {/* Fuel Type */}
                         <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.FuelType}>
                                <InputLabel htmlFor="FuelType">Fuel Type</InputLabel>
                                <FilledInput size="small" id="FuelType" {...register("FuelType")} />
                                <FormHelperText>{errors.FuelType?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>

                        {/* Driver Select */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.DriverId}>
                                <InputLabel htmlFor="driver_id">Driver</InputLabel>
                                <Controller
                                    name="DriverId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select size="small"
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
                                <FormHelperText>{errors.DriverId?.message}</FormHelperText>
                            </FormControl>
                        </Grid2>                      

                        

                        {/* Status */}
                        {/* Status Select */}
                        <Grid2 size={{ xs: 6, md: 3 }}>
                            <FormControl variant="filled" fullWidth error={!!errors.Status}>
                                <InputLabel htmlFor="status">Status</InputLabel>
                                <Controller
                                    name="Status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select size="small"
                                            id="status"
                                            label="Driver"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={loading}
                                        >
                                            {vehicleStatusLists?.map((Status: any) => (
                                                <MenuItem key={Status.id} value={String(Status.id)}>
                                                    {Status.value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.Status?.message}</FormHelperText>
                            </FormControl>
                        </Grid2> 


                        <Grid2 size={{ xs: 3, md: 3, xl: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.file_BusinessLicenseImage}>
                <Controller
                  name="file_BusinessLicenseImage"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Business License Image front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        console.log("Selected file:", file); // Debugging log
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_BusinessLicenseImage
                          ? typeof errors.file_BusinessLicenseImage.message === "string"
                            ? errors.file_BusinessLicenseImage.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Business License Image" // Label for the upload button
                    />
                  )}
                />
              </FormControl>
            </Grid2>


            <Grid2 size={{ xs: 3, md: 3, xl: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.file_VehicleLicenseFront}>
                <Controller
                  name="file_VehicleLicenseFront"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Vehicle License Image front is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        console.log("Selected file:", file); // Debugging log
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_VehicleLicenseFront
                          ? typeof errors.file_VehicleLicenseFront.message === "string"
                            ? errors.file_VehicleLicenseFront.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Vehicle License Image Front" // Label for the upload button
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 3, md: 3, xl: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.file_VehicleLicenseBack}>
                <Controller
                  name="file_VehicleLicenseBack"
                  control={control}
                  defaultValue={undefined} // Set initial state to null
                  rules={{ required: "Vehicle License Image Back is required" }} // Only use required here
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        console.log("Selected file:", file); // Debugging log
                        onChange(file); // Update the field with the selected file
                      }}
                      error={
                        errors.file_VehicleLicenseBack
                          ? typeof errors.file_VehicleLicenseBack.message === "string"
                            ? errors.file_VehicleLicenseBack.message
                            : undefined
                          : undefined
                      }
                      // Correctly extracting the error message
                      field="Vehicle License Image Back" // Label for the upload button
                    />
                  )}
                />
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
