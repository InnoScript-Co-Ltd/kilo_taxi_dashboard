import * as React from "react";
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
import { useState } from "react";
import { ExtraDemandFormInputs, extraDemandSchema } from "../extraDemand.payload"; // Import wallet schema
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { extraDemandService } from "../extraDemand.service"; // Import wallet service
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";

const ExtraDemandCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtraDemandFormInputs>({
    resolver: zodResolver(extraDemandSchema),
  });

  const submitExtraDemadCreate = async (data: ExtraDemandFormInputs) => {
    console.log("Submitting data:", data);
    setLoading(true);
    const response = await extraDemandService.store(data, dispatch, notifications);
    console.log("API Response:", response);
    if (response.status === 201) {
      navigate(`${paths.extraDemandList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Create New Form</h2>
        <form onSubmit={handleSubmit(submitExtraDemadCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.title}>
                <InputLabel htmlFor="title">Charges Name</InputLabel>
                <FilledInput
                  size="small"
                  id="title"
                  {...register("title")}
                />
                <FormHelperText>{errors.title?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <FormControl variant="filled" fullWidth error={!!errors.amount}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <FilledInput
                      size="small"
                      id="amount"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                    <FormHelperText>{errors.amount?.message}</FormHelperText>
                  </FormControl>
                )}
              />
           </Grid2>

           <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.description}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <FilledInput
                  size="small"
                  id="description"
                  multiline
                  rows={4}
                  {...register("description")}
                />
                <FormHelperText>{errors.description?.message}</FormHelperText>
              </FormControl>
            </Grid2>

          </Grid2>

          {/* Footer with Cancel and Submit buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button variant="outlined" onClick={() => navigate(paths.extraDemandList)}>
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

export default ExtraDemandCreate;
