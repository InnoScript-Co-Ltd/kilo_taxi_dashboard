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
  MenuItem,
  Select,
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
import { useNotifications } from "@toolpad/core/useNotifications";
import { paymentTypeStatusLists } from "../../../constants/config";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview";
import { formBuilder } from "../../../helpers/formBuilder";

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
    watch,
    formState: { errors },
  } = useForm<PaymentChannelFormInputs>({
    resolver: zodResolver(paymentChannelSchema),
    defaultValues: {
      PaymentType: 0,
    },
  });

  const paymentType = watch("PaymentType");

  const submitPaymentChannelCreate = async (data: PaymentChannelFormInputs) => {
    try {
      const formData = formBuilder(data, paymentChannelSchema);
      const response = await paymentChannelService.store(
        formData,
        dispatch,
        notifications
      );
      if (response.status === 201) {
        navigate(`${paths.paymentChannelList}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
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
                  <InputLabel htmlFor="phone">Phone</InputLabel>
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
