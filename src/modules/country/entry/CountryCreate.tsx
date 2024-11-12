import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  Input,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { countryService } from "../country.service";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  CountryFormInputs,
  countrySchema,
} from "../country.payload";
import { formBuilder } from "../../../helpers/formBuilder";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { useNotifications } from '@toolpad/core/useNotifications';

const CountryCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications()

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CountryFormInputs>({
    resolver: zodResolver(countrySchema),
  });

  const onSubmit = async (data: CountryFormInputs) => {
    const formdata = formBuilder(data, countrySchema);
    // Use forEach to log each key-value pair in the FormData
    // for (const [key, value] of formdata.entries()) {
    //   console.log(key, value);
    // }

    // return;

    const response = await countryService.store(formdata, dispatch, notifications);
    if (response.status === 201) {
      navigate(paths.countryList);
    }
  };

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Country Create</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Name}>
                <InputLabel htmlFor="country_name">Country Name</InputLabel>
                <Input id="country_name" {...register("Name")} />
                <FormHelperText>{errors.Name?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            {/* <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.zipCode}>
                <InputLabel htmlFor="zip_code">Zip Code</InputLabel>
                <Input id="zip_code" {...register("zipCode")} />
                <FormHelperText>{errors.zipCode?.message}</FormHelperText>
              </FormControl>
            </Grid2> */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.MobilePrefixNumber}
              >
                <InputLabel htmlFor="mobile_prefix">
                  Mobile Prefix Number
                </InputLabel>
                <Input id="mobile_prefix" {...register("MobilePrefixNumber")} />
                <FormHelperText>
                  {errors.MobilePrefixNumber?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 12, xl: 12 }}>
              <FormControl variant="filled" fullWidth error={!!errors.file_FlagIcon}>
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
                      // Correctly extracting the error message
                      field="Flag Icon" // Label for the upload button
                    />
                  )}
                />
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
              onClick={() => navigate(paths.countryList)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default CountryCreate;
