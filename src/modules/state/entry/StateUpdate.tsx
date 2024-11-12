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
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { StateFormInputs, statePayload, stateSchema } from "../state.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { stateService } from "../state.service"; // Service for handling state API requests
import {
  httpErrorHandler,
  httpServiceHandler,
  payloadHandler,
} from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { COUNTRY } from "../../country/country.payload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const StateUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [countryLists, setCountryLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useSelector((state: AppRootState) => state.state); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StateFormInputs>({
    resolver: zodResolver(stateSchema),
    defaultValues: {
      name: "",
      zipCode: "",
      countryId: "",
      profile: ""
    }
  });

  // Function to handle form submission and state update
  const submitStateUpdate = async (data : StateFormInputs) => {
    setLoading(true);
    const response: any = await stateService.update(
      dispatch,
      params.id,
      data
    );
    if (response.status === 204) {
      navigate(`${paths.stateList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await stateService.show(dispatch, params.id); // Fetch state data to populate the form
      const response: any = await getRequest(`${endpoints.country}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCountryLists(response.data.countries);
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
    if (state) {
      setValue("name", state.name || "");
      setValue("countryId", state.countryId || "");
      setValue("profile", state.profile || "")
      setValue("zipCode", state.zipCode || "")
    }
  }, [state]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>State Update</h2>

        <form onSubmit={handleSubmit(submitStateUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.countryId}
              >
                <InputLabel htmlFor="country_name">Country</InputLabel>
                <Controller
                  name="countryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="country_name"
                      type="text"
                      aria-describedby="country_name_text"
                      disabled={loading}
                      label="Country"
                      {...field} // Spread the field props
                      value={field.value || ""}
                      onChange={field.onChange}  // No conversion needed
                    >
                      {countryLists?.map((country: COUNTRY) => (
                        <MenuItem key={country.id} value={String(country.id)}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.countryId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.name}>
                <InputLabel htmlFor="country_name">Country Name</InputLabel>
                <Input id="country_name" {...register("name")} />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.zipCode}>
                <InputLabel htmlFor="zip_code">Zip Code</InputLabel>
                <Input id="zip_code" {...register("zipCode")} />
                <FormHelperText>{errors.zipCode?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.profile}>
                <InputLabel htmlFor="profile">Profile</InputLabel>
                <Input id="profile" {...register("profile")} />
                <FormHelperText>{errors.profile?.message}</FormHelperText>
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
          <Button variant="outlined" onClick={() => navigate(paths.stateList)}>
            Cancle
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
        </form>

        {/* <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="country_name">
                Country Name
              </InputLabel>
              <Select
                id="country_name"
                aria-describedby="country_name_text"
                disabled={loading}
                label="Country"
                value={payload ? payload.countryId : ""}
                onChange={(e: SelectChangeEvent) => {
                  payloadHandler(
                    payload,
                    e.target.value,
                    "countryId",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  );
                }}
              >
                {countryLists?.map((country: COUNTRY) => {
                  return (
                    <MenuItem
                      defaultValue={0}
                      key={country.id}
                      value={country.id}
                    >
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText id="state_country_text">
                Choose country name
              </FormHelperText>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="state_name">
                Name
              </InputLabel>
              <Input
                id="state_name"
                aria-describedby="state_name_text"
                disabled={loading}
                value={payload ? payload.name : ""}
                onChange={(e) => {
                  payloadHandler(
                    payload,
                    e.target.value,
                    "name",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  );
                }}
              />
              <FormHelperText id="state_name_text">
                Enter state name
              </FormHelperText>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="zip_code">
                Zip Code
              </InputLabel>
              <Input
                id="zip_code"
                aria-describedby="zip_code_text"
                disabled={loading}
                value={payload ? payload.zipCode : ""}
                onChange={(e) =>
                  payloadHandler(
                    payload,
                    e.target.value,
                    "ZipCode",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  )
                }
              />
              <FormHelperText id="zip_code_text">Enter zip code</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="profile">
                Profile
              </InputLabel>
              <Input
                id="profile"
                aria-describedby="profile"
                disabled={loading}
                value={payload ? payload.profile : ""}
                autoFocus
                onChange={(e) =>
                  payloadHandler(
                    payload,
                    e.target.value,
                    "profile",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  )
                }
              />
              <FormHelperText id="profile">Choose profile</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2> */}

        {/* footer */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={() => navigate(paths.stateList)}>
            Cancle
          </Button>
          <Button variant="contained" onClick={submitStateUpdate}>
            Submit
          </Button>
        </Box> */}
      </Card>
    </Box>
  );
};

export default StateUpdate;
