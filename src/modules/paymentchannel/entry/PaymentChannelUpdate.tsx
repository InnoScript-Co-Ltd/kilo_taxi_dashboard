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
import {
  PaymentChannelFormInputs,
  paymentChannelSchema,
} from "../paymentchannel.payload"; // Assuming walletSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { paymentChannelService } from "../paymentchannel.service"; // Service for handling wallet API requests
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";

const PaymentChannelUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { paymentChannel } = useSelector(
    (state: AppRootState) => state.paymentChannel
  ); // Selecting wallet data from the store
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentChannelFormInputs>({
    resolver: zodResolver(paymentChannelSchema),
    defaultValues: {
      channelName: "",
      description: "",
    },
  });

  // Function to handle form submission and wallet update
  const submitPaymentChannelUpdate = async (data: PaymentChannelFormInputs) => {
    setLoading(true);
    const response: any = await paymentChannelService.update(
      dispatch,
      params.id,
      data,
      notifications
    );
    if (response.status === 200) {
      navigate(`${paths.paymentChannelList}`); // Navigate to the wallet list page on success
    }
    setLoading(false);
  };

  // Function to load wallet data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await paymentChannelService.show(dispatch, params.id); // Fetch wallet data to populate the form
    } catch (error) {
      await httpErrorHandler(error);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (paymentChannel) {
      setValue("id", Number(paymentChannel.id) || 0);
      setValue("channelName", paymentChannel.channelName || "");
      setValue("description", paymentChannel.description || "");
    }
  }, [paymentChannel, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Wallet Update</h2>

        <form onSubmit={handleSubmit(submitPaymentChannelUpdate)}>
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

export default PaymentChannelUpdate;
