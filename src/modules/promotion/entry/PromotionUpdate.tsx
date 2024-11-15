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
import { PromotionFormInputs, promotionPayload, promotionSchema } from "../promotion.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { promotionService } from "../promotion.service"; // Service for handling state API requests
import {
  httpErrorHandler,
  httpServiceHandler,
} from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { COUNTRY } from "../../country/country.payload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { statusLists } from "../../../constants/config";

const PromotionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [countryLists, setCountryLists] = useState<Array<any>>([]);

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
      CustomerId: "",
      PromoCode: "",
      ExpiredAt: new Date(),
      FixAmount: "",
      Percentage: "",
      Status: ""
    }
  });

  // Function to handle form submission and state update
  const submitPromotionUpdate = async (data : PromotionFormInputs) => {
    setLoading(true);
    const response: any = await promotionService.update(
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
      await promotionService.show(dispatch, params.id); // Fetch state data to populate the form
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
    if (promotion) {
      setValue("CustomerId", promotion.countryId || "");
      setValue("PromoCode", promotion.promo_code || "");
      setValue("ExpiredAt", promotion.expired_at ? new Date(promotion.expired_at) : new Date())
      setValue("FixAmount", promotion.fix_amount || "")
      setValue("Percentage", promotion.percentage || "")
      setValue("Status", promotion.status || "")
    }
  }, [promotion]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>State Update</h2>

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
                      id="customer_name"
                      aria-describedby="customer_name_text"
                      size="small"
                      disabled={loading}
                      label="Customer"
                      {...field}
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {[{ id : 1, value : "New Customer" }].map((customer: any) => (
                        <MenuItem key={customer.id} value={String(customer.id)}>
                          {customer.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.CustomerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.PromoCode}>
                <InputLabel htmlFor="promo_code">Promo Code</InputLabel>
                <Input id="promo_code" {...register("PromoCode")} />
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
              <FormControl variant="filled" fullWidth error={!!errors.FixAmount}>
                <InputLabel htmlFor="fix_amount">Fix Amount</InputLabel>
                <Input id="fix_amount" {...register("FixAmount")} />
                <FormHelperText>{errors.FixAmount?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Percentage}>
                <InputLabel htmlFor="Percentage">Percentage</InputLabel>
                <Input id="Percentage" {...register("Percentage")} />
                <FormHelperText>{errors.Percentage?.message}</FormHelperText>
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
                      value={String(field.value)} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {statusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={String(status.id)}>
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
          <Button variant="outlined" onClick={() => navigate(paths.promotionList)}>
            Cancle
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

export default PromotionUpdate;
