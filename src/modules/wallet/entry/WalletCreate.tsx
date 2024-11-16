import * as React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { WalletFormInputs, walletSchema } from "../wallet.payload"; // Import wallet schema
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { walletService } from "../wallet.service"; // Import wallet service
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const WalletCreate = () => {
  const [loading, setLoading] = useState(false);
  const [walletTypes, setWalletTypes] = useState<Array<string>>([]);
  const [customers, setCustomers] = useState<Array<any>>([]);
  const [drivers, setDrivers] = useState<Array<any>>([]);

  // Status dropdown options
  const statusOptions = ["Active", "Inactive"];

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletFormInputs>({
    resolver: zodResolver(walletSchema),
  });

  const submitWalletCreate = async (data: WalletFormInputs) => {
    setLoading(true);
    const response = await walletService.store(data, dispatch);
    if (response.status === 201) {
      navigate(`${paths.walletList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(`${endpoints.wallet}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setWalletTypes(response.data.wallets);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    try {
      const response: any = await getRequest(`${endpoints.customer}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCustomers(response.data.customers);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    try {
      const response: any = await getRequest(`${endpoints.driver}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setDrivers(response.data.drivers);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, []);
  
  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Wallet Create</h2>
        <form onSubmit={handleSubmit(submitWalletCreate)}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.userName}>
                <InputLabel htmlFor="user_name">User Name</InputLabel>
                <Input id="user_name" {...register("userName")} />
                <FormHelperText>{errors.userName?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.phoneNo}>
                <InputLabel htmlFor="phone_no">Phone Number</InputLabel>
                <Input id="phone_no" {...register("phoneNo")} />
                <FormHelperText>{errors.phoneNo?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" {...register("email")} />
                <FormHelperText>{errors.email?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.balance}>
                <InputLabel htmlFor="balance">Balance</InputLabel>
                <Input id="balance" {...register("balance")} />
                <FormHelperText>{errors.balance?.message}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Status Field */}
            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.status}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="status"
                      {...field}
                      label="Status"
                      disabled={loading}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.walletType}>
                <InputLabel htmlFor="wallet_type">Wallet Type</InputLabel>
                <Controller
                  name="walletType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="wallet_type"
                      {...field}
                      label="Wallet Type"
                      disabled={loading}
                    >
                      {walletTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.walletType?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.customerId}>
                <InputLabel htmlFor="customer_id">Customer</InputLabel>
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="customer_id"
                      {...field}
                      label="Customer"
                      disabled={loading}
                    >
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.customerId?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl variant="filled" fullWidth error={!!errors.driverId}>
                <InputLabel htmlFor="driver_id">Driver</InputLabel>
                <Controller
                  name="driverId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="driver_id"
                      {...field}
                      label="Driver"
                      disabled={loading}
                    >
                      {drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.driverId?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

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
            <Button variant="outlined" onClick={() => navigate(paths.walletList)}>
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

export default WalletCreate;
