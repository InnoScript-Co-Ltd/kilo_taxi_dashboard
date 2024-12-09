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
import {
  PaymentChannelFormInputs,
  paymentChannelSchema,
} from "../paymentchannel.payload"; // Import wallet schema
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { paymentChannelService } from "../paymentchannel.service"; // Import wallet service
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";

const PaymentChannelCreate = () => {
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
  } = useForm<PaymentChannelFormInputs>({
    resolver: zodResolver(paymentChannelSchema),
  });

  const submitPaymentChannelCreate = async (data: PaymentChannelFormInputs) => {
    setLoading(true);
    const response = await paymentChannelService.store(
      data,
      dispatch,
      notifications
    );
    if (response.status === 201) {
      navigate(`${paths.walletList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>PaymentChannel Create</h2>
        <form onSubmit={handleSubmit(submitPaymentChannelCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.channelName}
              >
                <InputLabel htmlFor="channel_name">Channel Name</InputLabel>
                <FilledInput
                  size="small"
                  id="channel_name"
                  {...register("channelName")}
                />
                <FormHelperText>{errors.channelName?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.description}
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <FilledInput
                  size="small"
                  id="description"
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
            <Button
              variant="outlined"
              onClick={() => navigate(paths.walletList)}
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

export default PaymentChannelCreate;
