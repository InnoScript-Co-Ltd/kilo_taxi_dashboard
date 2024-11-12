import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  Input,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CountryFormInputs, countrySchema } from "../country.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { countryService } from "../country.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../constants/paths";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";

const CountryUpdate = () => {
  const [loading, setLoading] = useState(false);
  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { country } = useSelector((state: AppRootState) => state.country);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CountryFormInputs>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      Name: "",
      MobilePrefixNumber: "",
      // flagIcon: undefined,
      // zipCode: ""
    },
  });

  // Load data into form fields on component mount
  const loadingData = useCallback(async () => {
    setLoading(true);
    await countryService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Populate form values when country data is available
  useEffect(() => {
    if (country) {
      setValue("Name", country.name || "");
      setValue("MobilePrefixNumber", country.mobilePrefixNumber || "");
      // setValue("zipCode", country.zipCode || "");
    }
  }, [country, setValue]);

  // Submit form data
  const onSubmit = async (data: CountryFormInputs) => {
    setLoading(true);
    const response = await countryService.update(dispatch, params.id, data);
    if (response.data) {
      navigate(`${paths.countryList}`);
    }
    setLoading(false);
  };
  

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Country Update</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="country_name">Country Name</InputLabel>
                <Input autoFocus id="country_name" {...register("Name")} />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.MobilePrefixNumber}>
                <InputLabel htmlFor="mobile_prefix">Mobile Prefix Number</InputLabel>
                <Input autoFocus id="mobile_prefix" {...register("MobilePrefixNumber")} />
                <FormHelperText>{errors.MobilePrefixNumber?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 12 }}>
              <Controller
                name="file_FlagIcon"
                control={control}
                defaultValue={undefined} // Set initial state to null
                rules={{ required: "Flag icon is required" }} // Only use required here
                render={({ field: { onChange, value } }) => (
                  <FileUploadWithPreview
                    onFileChange={(file) => {
                      console.log("Selected file:", file); // Debugging log
                      onChange(file); // Update the field with the selected file
                    }}
                    error={
                      errors.file_FlagIcon
                        ? typeof errors.file_FlagIcon.message === "string"
                          ? errors.file_FlagIcon.message
                          : undefined
                        : undefined
                    }
                    field="Flag Icon" // Label for the upload button
                    src={country?.flagIcon}
                  />
                )}
              />
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
              onClick={() => navigate(paths.countryList)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default CountryUpdate;
