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
import { PromotionFormInputs, promotionSchema } from "../promotion.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { promotionService } from "../promotion.service"; // Service for handling state API requests
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import {
  generalStatusLists,
  promoStatusLists,
} from "../../../constants/config";
import { getId } from "../../../helpers/updateHelper";

const PromotionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { promotion } = useSelector((state: AppRootState) => state.promotion); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PromotionFormInputs>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      id: 0,
      CustomerId: 0,
      PromoCode: "",
      ExpiredAt: new Date(),
      Value: "",
      PromotionType: "",
      ApplicableTo: "",
      Status: 0,
    },
  });

  // Function to handle form submission and state update
  const submitPromotionUpdate = async (data: PromotionFormInputs) => {
    setLoading(true);
    const response: any = await promotionService.update(
      dispatch,
      params.id,
      data
    );
    if (response.status === 200) {
      navigate(`${paths.promotionList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(`${endpoints.customer}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCustomerLists(response.data.customers);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (promotion) {
      setValue("id", Number(promotion.id) || 0);
      setValue("CustomerId", promotion.customerId || 0);
      setValue("PromoCode", promotion.promoCode || "");
      setValue(
        "ExpiredAt",
        promotion.expiredAt ? new Date(promotion.expiredAt) : new Date()
      );
      setValue("Value", String(promotion.value) || "");
      setValue("PromotionType", String(promotion.promotionType) || "");
      setValue("ApplicableTo", String(promotion.applicableTo) || "");
      setValue(
        "Status",
        getId({ lists: promoStatusLists, value: promotion.status }) || 0
      );
    }
  }, [promotion, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await promotionService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Promotion Update</h2>

        <form onSubmit={handleSubmit(submitPromotionUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.CustomerId}
              >
                <InputLabel htmlFor="customer_name">Customer</InputLabel>
                <Controller
                  name="CustomerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="customer_name"
                      aria-describedby="customer_name_text"
                      disabled={loading}
                      label="Customer"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {customerLists.map((customer: any) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.CustomerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.PromoCode}
              >
                <InputLabel htmlFor="promo_code">Promo Code</InputLabel>
                <FilledInput
                  size="small"
                  id="promo_code"
                  {...register("PromoCode")}
                />
                <FormHelperText>{errors.PromoCode?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.ExpiredAt}>
                <Controller
                  name="ExpiredAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Expired At"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.ExpiredAt,
                          helperText: errors.ExpiredAt?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>{errors.ExpiredAt?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Value}>
                <InputLabel htmlFor="value">Value</InputLabel>
                <FilledInput size="small" id="value" {...register("Value")} />
                <FormHelperText>{errors.Value?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.PromotionType}
              >
                <InputLabel htmlFor="promotion_type">Promotion Type</InputLabel>
                <FilledInput
                  size="small"
                  id="promotion_type"
                  {...register("PromotionType")}
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
                <InputLabel htmlFor="applicable_to">Applicable To</InputLabel>
                <FilledInput
                  size="small"
                  id="applicable_to"
                  {...register("ApplicableTo")}
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
                      value={field.value || ""} // Convert field value to a string
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
              Cancle
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default PromotionUpdate;
