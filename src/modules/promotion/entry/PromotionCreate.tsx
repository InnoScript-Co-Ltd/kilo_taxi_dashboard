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
import { PromotionFormInputs, promotionSchema } from "../promotion.payload"; // Import the state payload
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { promotionService } from "../promotion.service"; // Import state service and payload type
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import {
  applicableToLists,
  promoStatusLists,
  promotionTypeLists,
} from "../../../constants/config";

const PromotionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionFormInputs>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      PromotionType: 0,
      ApplicableTo: 0,
      Status: 0,
      CustomerIds: [],
    },
  });

  const promotionType = watch("PromotionType");

  const submitPromotionCreate = async (data: PromotionFormInputs) => {
    setLoading(true);
    const response = await promotionService.store(data, dispatch);
    if (response.statusCode === 201) {
      navigate(`${paths.promotionList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(
        `${endpoints.customer}`,
        null,
        dispatch
      );
      console.log(response);

      await httpServiceHandler(dispatch, response.data);
      if (response && "data" in response && response.data.statusCode === 200) {
        setCustomerLists(response.data.payload.customers);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }

    setLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Promotion Create</h2>
        <form onSubmit={handleSubmit(submitPromotionCreate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.PromoCode}
              >
                <InputLabel htmlFor="promo_code" style={{ fontSize: "12px" }}>Promo Code</InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  id="promo_code"
                  {...register("PromoCode")}
                />
                <FormHelperText>{errors.PromoCode?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.CreatedDate}>
                <Controller
                  name="CreatedDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="CreatedDate"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            error: !!errors.CreatedDate,
                            helperText: errors.CreatedDate?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>{errors.CreatedDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.ExpiredDate}>
                <Controller
                  name="ExpiredDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="ExpiredDate"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            error: !!errors.ExpiredDate,
                            helperText: errors.ExpiredDate?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>{errors.ExpiredDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Quantity}>
                <InputLabel htmlFor="Quantity" style={{ fontSize: "12px" }}>Quantity</InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
                  size="small"
                  id="Quantity"
                  {...register("Quantity")}
                />
                <FormHelperText>{errors.Quantity?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Unit}>
                <InputLabel htmlFor="Unit" style={{ fontSize: "12px" }}>Unit</InputLabel>
                <FilledInput style={{ paddingTop: "20px", fontSize: "14px" }} size="small" id="Unit" {...register("Unit")} />
                <FormHelperText>{errors.Unit?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Description}
              >
                <InputLabel htmlFor="description" style={{ fontSize: "12px" }}>Description</InputLabel>
                <FilledInput
                  style={{ paddingTop: "20px", fontSize: "14px" }}
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
                error={!!errors.PromotionType}
              >
                <InputLabel htmlFor="promotionType" style={{ fontSize: "12px" }}>PromotionType</InputLabel>
                <Controller
                  name="PromotionType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ paddingTop: "20px", fontSize: "14px" }}
                      id="promotionType"
                      aria-describedby="promotionType_text"
                      size="small"
                      disabled={loading}
                      label="PromotionType"
                      {...field}
                      value={field.value || 0}
                      defaultValue={field.value || 0}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {promotionTypeLists?.map((promotionType: any) => (
                        <MenuItem
                          key={promotionType.id}
                          value={promotionType.id}
                        >
                          {promotionType.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.PromotionType?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.ApplicableTo}
              >
                <InputLabel htmlFor="applicableTo" style={{ fontSize: "12px" }}>ApplicableTo</InputLabel>
                <Controller
                  name="ApplicableTo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ paddingTop: "20px", fontSize: "14px" }}
                      id="applicableTo"
                      aria-describedby="applicableTo_text"
                      size="small"
                      disabled={loading}
                      label="ApplicableTo"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      defaultValue={field.value || 0}
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {applicableToLists?.map((applicableTo: any) => (
                        <MenuItem key={applicableTo.id} value={applicableTo.id}>
                          {applicableTo.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.ApplicableTo?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Status}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Controller
                  name="Status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="status"
                      aria-describedby="status_text"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      defaultValue={field.value || 0}
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {promoStatusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.Status?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Conditionally Render the Customers Field */}
            {promotionType === 1 && (
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.CustomerIds}
                >
                  <InputLabel htmlFor="customer_name">Customers</InputLabel>
                  <Controller
                    name="CustomerIds"
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="small"
                        id="customer_name"
                        aria-describedby="customer_name_text"
                        disabled={loading}
                        label="Customer"
                        {...field}
                        multiple
                        value={field.value || []}
                        defaultValue={field.value || []}
                        onChange={(event) => field.onChange(event.target.value)}
                      >
                        {customerLists.map((customer: any) => (
                          <MenuItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.CustomerIds?.message}</FormHelperText>
                </FormControl>
              </Grid2>
            )}
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
              onClick={() => navigate(paths.promotionList)}
            >
              Cancel
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default PromotionCreate;
