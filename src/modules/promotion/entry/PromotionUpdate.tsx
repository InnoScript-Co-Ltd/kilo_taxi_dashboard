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
  promotionTypeLists,
  applicableToLists,
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
    watch,
    formState: { errors },
  } = useForm<PromotionFormInputs>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      id: 0,
      PromoCode: "",
      CreatedDate: new Date(),
      ExpiredDate: new Date(),
      Unit: "",
      Quantity: "",
      Description: "",
      PromotionType: 0,
      ApplicableTo: 0,
      Status: 0,
      CustomerIds: [],
    },
  });

  const promotionType = watch("PromotionType");

  // Function to handle form submission and state update
  const submitPromotionUpdate = async (data: PromotionFormInputs) => {
    setLoading(true);
    const response: any = await promotionService.update(
      dispatch,
      params.id,
      data
    );
    if (response.statusCode === 200) {
      navigate(`${paths.promotionList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(
        `${endpoints.customer}`,
        null,
        dispatch
      );
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.data.statusCode === 200) {
        setCustomerLists(response.data.payload.customers);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (promotion) {
      setValue("id", Number(promotion.id) || 0);
      setValue("PromoCode", promotion.promoCode || "");
      setValue(
        "CreatedDate",
        promotion.createdDate ? new Date(promotion.createdDate) : new Date()
      );
      setValue(
        "ExpiredDate",
        promotion.expiredDate ? new Date(promotion.expiredDate) : new Date()
      );
      setValue("Unit", String(promotion.unit) || "");
      setValue("Quantity", String(promotion.quantity) || "");
      setValue("Description", String(promotion.description) || "");
      setValue(
        "PromotionType",
        getId({ lists: promotionTypeLists, value: promotion.promotionType }) ||
          0
      );
      setValue(
        "ApplicableTo",
        getId({ lists: applicableToLists, value: promotion.applicableTo }) || 0
      );
      setValue(
        "Status",
        getId({ lists: promoStatusLists, value: promotion.status }) || 0
      );
      setValue("CustomerIds", promotion.customerIds || []);
    }
  }, [promotion, setValue]);

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
                error={!!errors.PromoCode}
              >
                <InputLabel htmlFor="promo_code" style={{ fontSize: "12px" }}>
                  Promo Code
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
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
                  render={({ field }) => (
                    <DatePicker
                      label="Expired At"
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
                  )}
                />
                <FormHelperText>{errors.CreatedDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.ExpiredDate}>
                <Controller
                  name="ExpiredDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Expired At"
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
                  )}
                />
                <FormHelperText>{errors.ExpiredDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Unit}>
                <InputLabel htmlFor="Unit" style={{ fontSize: "12px" }}>
                  Unit
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="Unit"
                  {...register("Unit")}
                />
                <FormHelperText>{errors.Unit?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Quantity}>
                <InputLabel htmlFor="Quantity" style={{ fontSize: "12px" }}>
                  Quantity
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
                  size="small"
                  id="Quantity"
                  {...register("Quantity")}
                />
                <FormHelperText>{errors.Quantity?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.Description}
              >
                <InputLabel htmlFor="description" style={{ fontSize: "12px" }}>
                  Description
                </InputLabel>
                <FilledInput
                  style={{ padding: "20px", fontSize: "14px" }}
                  disabled={loading}
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
                <InputLabel htmlFor="applicableTo">PromotionType</InputLabel>
                <Controller
                  name="PromotionType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="promotionType"
                      aria-describedby="promotionType_text"
                      size="small"
                      disabled={loading}
                      label="PromotionType"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
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
                <InputLabel htmlFor="applicableTo">ApplicableTo</InputLabel>
                <Controller
                  name="ApplicableTo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="applicableTo"
                      aria-describedby="applicableTo_text"
                      size="small"
                      disabled={loading}
                      label="ApplicableTo"
                      {...field}
                      value={field.value || 0} // Convert field value to a string
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
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default PromotionUpdate;
