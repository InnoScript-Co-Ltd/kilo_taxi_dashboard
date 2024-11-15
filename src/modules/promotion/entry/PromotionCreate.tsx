import * as React from "react";
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
import { COUNTRY } from "../../country/country.payload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CUSTOMER } from "../../customer/customer.payload";
import { DatePicker } from "@mui/x-date-pickers";
import { statusLists } from "../../../constants/config";

const PromotionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [countryLists, setCountryLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromotionFormInputs>({
    resolver: zodResolver(promotionSchema),
  });

  const submitPromotionCreate = async (data: PromotionFormInputs) => {
    setLoading(true);
    const response = await promotionService.store(data, dispatch);
    if (response.status === 201) {
      navigate(`${paths.stateList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(`${endpoints.country}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCountryLists(response.data.countries);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadingData();
  }, []);

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
                      disabled={loading}
                      size="small"
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
            <Button
              variant="outlined"
              onClick={() => navigate(paths.promotionList)}
            >
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

export default PromotionCreate;
