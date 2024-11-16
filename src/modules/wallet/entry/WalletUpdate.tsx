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
  import { WalletFormInputs, walletSchema } from "../wallet.payload"; // Assuming walletSchema for validation
  import { useNavigate, useParams } from "react-router";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, AppRootState } from "../../../stores";
  import { walletService } from "../wallet.service"; // Service for handling wallet API requests
  import {
    httpErrorHandler,
    httpServiceHandler,
    payloadHandler,
  } from "../../../helpers/handler";
  import { paths } from "../../../constants/paths";
  import { Breadcrumb } from "../../../components/Breadcrumb";
  import { getRequest } from "../../../helpers/api";
  import { endpoints } from "../../../constants/endpoints";
  import { Controller, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  
  const WalletUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [customerLists, setCustomerLists] = useState<Array<any>>([]);
    const [driverLists, setDriverLists] = useState<Array<any>>([]);
    const [walletTypes, setWalletTypes] = useState<Array<string>>(["Standard", "Premium", "VIP"]);
  
    const params: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { wallet } = useSelector((state: AppRootState) => state.wallet); // Selecting wallet data from the store
  
    // Set up React Hook Form with Zod schema
    const {
      control,
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<WalletFormInputs>({
      resolver: zodResolver(walletSchema),
      defaultValues: {
        userName: "",
        phoneNo: "",
        email: "",
        balance: "",
        walletType: "",
        customerId: "",
        driverId: "",
      },
    });
  
    // Function to handle form submission and wallet update
    const submitWalletUpdate = async (data: WalletFormInputs) => {
      setLoading(true);
      const response: any = await walletService.update(
        dispatch,
        params.id,
        data
      );
      if (response.status === 204) {
        navigate(`${paths.walletList}`); // Navigate to the wallet list page on success
      }
      setLoading(false);
    };
  
    // Function to load wallet data based on the ID from params
    const loadingData = useCallback(async () => {
      setLoading(true);
      try {
        await walletService.show(dispatch, params.id); // Fetch wallet data to populate the form
        const customerResponse: any = await getRequest(`${endpoints.customer}`, null);
        const driverResponse: any = await getRequest(`${endpoints.driver}`, null);
        const walletTypeResponse: any = await getRequest(`${endpoints.wallet}`, null); // Example endpoint for wallet types
  
        await httpServiceHandler(dispatch, customerResponse);
        await httpServiceHandler(dispatch, driverResponse);
        await httpServiceHandler(dispatch, walletTypeResponse);
  
        if (customerResponse && "data" in customerResponse && customerResponse.status === 200) {
          setCustomerLists(customerResponse.data.customers);
        }
        if (driverResponse && "data" in driverResponse && driverResponse.status === 200) {
          setDriverLists(driverResponse.data.drivers);
        }
        if (walletTypeResponse && "data" in walletTypeResponse && walletTypeResponse.status === 200) {
          setWalletTypes(walletTypeResponse.data.walletTypes);
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
      if (wallet) {
        setValue("userName", wallet.userName || "");
        setValue("phoneNo", wallet.phoneNo || "");
        setValue("email", wallet.email || "");
        setValue("balance", wallet.balance || "");
        setValue("walletType", wallet.walletType || "");
        setValue("customerId", wallet.customerId || "");
        setValue("driverId", wallet.driverId || "");
      }
    }, [wallet]);
  
    return (
      <Box>
        <Breadcrumb />
        <Card sx={{ marginTop: "20px", padding: "20px" }}>
          <h2>Wallet Update</h2>
  
          <form onSubmit={handleSubmit(submitWalletUpdate)}>
            <Grid2 container spacing={2}>
              {/* Customer Select */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.customerId}>
                  <InputLabel htmlFor="customer_id">Customer</InputLabel>
                  <Controller
                    name="customerId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="customer_id"
                        type="text"
                        aria-describedby="customer_id_text"
                        disabled={loading}
                        label="Customer"
                        {...field} // Spread the field props
                        value={field.value || ""}
                        onChange={field.onChange}  // No conversion needed
                      >
                        {customerLists?.map((customer: any) => (
                          <MenuItem key={customer.id} value={String(customer.id)}>
                            {customer.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.customerId?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* Driver Select */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.driverId}>
                  <InputLabel htmlFor="driver_id">Driver</InputLabel>
                  <Controller
                    name="driverId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="driver_id"
                        type="text"
                        aria-describedby="driver_id_text"
                        disabled={loading}
                        label="Driver"
                        {...field} // Spread the field props
                        value={field.value || ""}
                        onChange={field.onChange}  // No conversion needed
                      >
                        {driverLists?.map((driver: any) => (
                          <MenuItem key={driver.id} value={String(driver.id)}>
                            {driver.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.driverId?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* User Name */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.userName}>
                  <InputLabel htmlFor="user_name">User Name</InputLabel>
                  <Input id="user_name" {...register("userName")} />
                  <FormHelperText>{errors.userName?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* Phone Number */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.phoneNo}>
                  <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                  <Input id="phone_number" {...register("phoneNo")} />
                  <FormHelperText>{errors.phoneNo?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* Email */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.email}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" {...register("email")} />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* Balance */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.balance}>
                  <InputLabel htmlFor="balance">Balance</InputLabel>
                  <Input id="balance" type="number" {...register("balance")} />
                  <FormHelperText>{errors.balance?.message}</FormHelperText>
                </FormControl>
              </Grid2>
  
              {/* Wallet Type */}
              <Grid2 size={{ xs: 6, md: 3 }}>
                <FormControl variant="filled" fullWidth error={!!errors.walletType}>
                  <InputLabel htmlFor="wallet_type">Wallet Type</InputLabel>
                  <Controller
                    name="walletType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="wallet_type"
                        type="text"
                        aria-describedby="wallet_type_text"
                        disabled={loading}
                        label="Wallet Type"
                        {...field} // Spread the field props
                        value={field.value || ""}
                        onChange={field.onChange}  // No conversion needed
                      >
                        {walletTypes?.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.walletType?.message}</FormHelperText>
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
  
  export default WalletUpdate;
  