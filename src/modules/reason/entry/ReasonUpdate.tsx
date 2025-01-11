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
import { ReasonFormInputs, reasonSchema } from "../reason.payload"; // Assuming reasonSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { reasonService } from "../reason.service"; // Service for handling reason API requests
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";
import {
  genderStatuslists,
  generalStatusLists,
} from "../../../constants/config";

import { getId } from "../../../helpers/updateHelper";

const ReasonUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { reason } = useSelector((state: AppRootState) => state.reason); // Selecting reason data from the store
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReasonFormInputs>({
    resolver: zodResolver(reasonSchema),
    defaultValues: {
      name: "",
      status: 0,
    },
  });

  // Function to handle form submission and reason update
  const submitReasonUpdate = async (data: ReasonFormInputs) => {
    setLoading(true);
    const response: any = await reasonService.update(
      dispatch,
      params.id,
      data,
      notifications
    );
    if (response.status === 200) {
      navigate(`${paths.reasonList}`); // Navigate to the reason list page on success
    }
    setLoading(false);
  };

  // Function to load reason data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await reasonService.show(dispatch, params.id); // Fetch reason data to populate the form
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (reason) {
      setValue("id", Number(reason.id) || 0);
      setValue("name", reason.name || "");
      setValue(
        "status",
        getId({ lists: generalStatusLists, value: reason.status }) || 0
      );
    }
  }, [reason, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Reason Update</h2>

        <form onSubmit={handleSubmit(submitReasonUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>

              <FormControl variant="filled" fullWidth error={!!errors.name}>
                <InputLabel htmlFor="name">Reason name</InputLabel>
                <FilledInput size="small" id="name" {...register("name")} />

                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
            </Grid2>


          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth error={!!errors.status}>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    size="small"
                    id="status"
                    aria-describedby="status_text"
                    disabled={loading}
                    label="Status"
                    {...field}
                    value={field.value || 0} // Convert field value to a string
                    onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                  >
                    {generalStatusLists?.map((status: any) => (
                      <MenuItem key={status.id} value={status.id}>
                        {status.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />


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
            <Button
              variant="outlined"
              onClick={() => navigate(paths.reasonList)}
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

export default ReasonUpdate;
