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
import { paymentTypeStatusLists } from "../../../constants/config";
import { getId } from "../../../helpers/updateHelper";
import { formBuilder } from "../../../helpers/formBuilder";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentChannelFormInputs>({
    resolver: zodResolver(paymentChannelSchema),
    defaultValues: {
      ChannelName: "",
      Description: "",
      PaymentType: 0,
      UserName: "",
      Phone: "",
    },
  });

  const paymentType = watch("PaymentType");

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
      setValue("ChannelName", paymentChannel.channelName || "");
      setValue("Description", paymentChannel.description || "");
      setValue(
        "PaymentType",
        getId({
          lists: paymentTypeStatusLists,
          value: paymentChannel.paymentType,
        }) || 0
      );
      setValue("UserName", paymentChannel.userName || "");
      setValue("Phone", paymentChannel.phone || "");
    }
  }, [paymentChannel, setValue]);

  const submitPaymentChannelUpdate = async (data: PaymentChannelFormInputs) => {
      setLoading(true);
      const formData = formBuilder(data, paymentChannelSchema);
      const response = await paymentChannelService.update(
        dispatch,
        params.id,
        formData
      );
      if (response.status === 200) {
        navigate(`${paths.customerList}`);
      }
      setLoading(false);
    };
  

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
                error={!!errors.ChannelName}
              >
                <InputLabel htmlFor="channel_name">Channel Name</InputLabel>
                <FilledInput
                  size="small"
                  id="channel_name"
                  {...register("ChannelName")}
                />
                <FormHelperText>{errors.ChannelName?.message}</FormHelperText>
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

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.PaymentType}
              >
                <InputLabel htmlFor="payment_type">Payment Type</InputLabel>
                <Controller
                  name="PaymentType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="payment_type"
                      aria-describedby="payment_type_text"
                      size="small"
                      disabled={loading}
                      label="PaymentType"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {paymentTypeStatusLists?.map((payment: any) => (
                        <MenuItem key={payment.id} value={payment.id}>
                          {payment.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors?.PaymentType?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.file_Icon}
              >
                <Controller
                  name="file_Icon"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "Icon is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FileUploadWithPreview
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      error={
                        errors.file_Icon
                          ? typeof errors.file_Icon.message === "string"
                            ? errors.file_Icon.message
                            : undefined
                          : undefined
                      }
                      field="Icon"
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            {paymentType === 2 && (
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.Phone}>
                  <InputLabel htmlFor="phone">Channel Name</InputLabel>
                  <FilledInput size="small" id="phone" {...register("Phone")} />
                  <FormHelperText>{errors.Phone?.message}</FormHelperText>
                </FormControl>
              </Grid2>
            )}
            {(paymentType === 1 || paymentType === 2) && (
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.UserName}
                >
                  <InputLabel htmlFor="user_name">User Name</InputLabel>
                  <FilledInput
                    size="small"
                    id="user_name"
                    {...register("UserName")}
                  />
                  <FormHelperText>{errors.UserName?.message}</FormHelperText>
                </FormControl>
              </Grid2>
            )}
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
