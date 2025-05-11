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
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orderSchema,
  OrderFormInputs,
  orderCreateSchema,
} from "../../order/order.payload";
import { orderService } from "../../order/order.service";
import { orderStatusLists } from "../../../constants/config";
import { formBuilder } from "../../../helpers/formBuilder";

const OrderCreate = () => {
  const [loading, setLoading] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);
  const [walletLists, setWalletLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with updated Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderCreateSchema),
  });

  const onSubmit = async (data: OrderFormInputs) => {
    setLoading(true);
    try {
      const orderData = { ...data };

      const response = await orderService.store(orderData, dispatch);

      if (response?.statusCode === 201) {
        navigate(`${paths.orderList}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load customers and wallets from API
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const customerRes: any = await getRequest(
        `${endpoints.customer}`,
        null,
        dispatch
      );

      const walletRes: any = await getRequest(
        `${endpoints.wallet}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, customerRes);
      if (customerRes && "data" in customerRes && customerRes.status === 200) {
        setCustomerLists(customerRes.data?.payload?.customers);
      }

      await httpServiceHandler(dispatch, walletRes);
      if (walletRes && "data" in walletRes && walletRes.status === 200) {
        setWalletLists(walletRes.data?.payload?.wallets);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  return (
    <Box>
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Order Create</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid2 container spacing={2}>
            {/* Pick Up Location */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.pickUpLocation}>
                <InputLabel htmlFor="pickUpLocation">
                  Pick Up Location
                </InputLabel>
                <FilledInput
                  id="pickUpLocation"
                  {...register("pickUpLocation")}
                  disabled={loading}
                />
                <FormHelperText>
                  {errors.pickUpLocation?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Pick Up Latitude */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.pickUpLat}>
                <InputLabel htmlFor="pickUpLat">Pick Up Latitude</InputLabel>
                <FilledInput
                  type="text"
                  id="pickUpLat"
                  {...register("pickUpLat")}
                  disabled={loading}
                />
                <FormHelperText>{errors.pickUpLat?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Pick Up Longitude */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.pickUpLong}>
                <InputLabel htmlFor="pickUpLong">Pick Up Longitude</InputLabel>
                <FilledInput
                  type="text"
                  id="pickUpLong"
                  {...register("pickUpLong")}
                  disabled={loading}
                />
                <FormHelperText>{errors.pickUpLong?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Destination Location */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.destinationLocation}>
                <InputLabel htmlFor="destinationLocation">
                  Destination Location
                </InputLabel>
                <FilledInput
                  id="destinationLocation"
                  {...register("destinationLocation")}
                  disabled={loading}
                />
                <FormHelperText>
                  {errors.destinationLocation?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Destination Latitude */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.destinationLat}>
                <InputLabel htmlFor="destinationLat">
                  Destination Latitude
                </InputLabel>
                <FilledInput
                  type="text"
                  id="destinationLat"
                  {...register("destinationLat")}
                  disabled={loading}
                />
                <FormHelperText>
                  {errors.destinationLat?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Destination Longitude */}
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.destinationLong}>
                <InputLabel htmlFor="destinationLong">
                  Destination Longitude
                </InputLabel>
                <FilledInput
                  type="text"
                  id="destinationLong"
                  {...register("destinationLong")}
                  disabled={loading}
                />
                <FormHelperText>
                  {errors.destinationLong?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            {/* Order Type */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.orderType}
              >
                <InputLabel htmlFor="orderType">Order Type</InputLabel>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="orderType"
                      disabled={loading}
                      label="Order Type"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      <MenuItem value="INAPP">INAPP</MenuItem>
                      <MenuItem value="OTHER">OTHER</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.orderType?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Wallet */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.walletId}>
                <InputLabel htmlFor="walletId">Wallet</InputLabel>
                <Controller
                  name="walletId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="walletId"
                      disabled={loading}
                      label="Wallet"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {walletLists?.map((wallet: any) => (
                        <MenuItem key={wallet.id} value={wallet.id}>
                          {wallet.walletName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.walletId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Customer (using "CustomerId") */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.customerId}
              >
                <InputLabel htmlFor="CustomerId">Customer</InputLabel>
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="CustomerId"
                      disabled={loading}
                      label="Customer"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {customerLists?.map((customer: any) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.customerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            {/* Status (using "Status") */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl variant="filled" fullWidth error={!!errors.status}>
                <InputLabel htmlFor="Status">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="Status"
                      size="small"
                      disabled={loading}
                      label="Status"
                      {...field}
                      value={field.value || ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {orderStatusLists?.map((status: any) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(paths.orderList)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default OrderCreate;
