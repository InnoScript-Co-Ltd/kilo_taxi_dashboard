import {
    Box,
    Button,
    Card,
    FilledInput,
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
import { DatePicker } from "@mui/x-date-pickers";
  
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
        walletName: "",
        createDate: new Date(),
        updateDate: new Date(),
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
        setValue("walletName", wallet.walletName || "");
        setValue("createDate", wallet.createDate || "");
        setValue("updateDate", wallet.updateDate || "");
      }
    }, [wallet]);
  
    return (
      <Box>
        <Breadcrumb />
        <Card sx={{ marginTop: "20px", padding: "20px" }}>
          <h2>Wallet Update</h2>
  
          <form onSubmit={handleSubmit(submitWalletUpdate)}>
            <Grid2 container spacing={2}>
             
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.walletName}>
                <InputLabel htmlFor="wallet_name">Wallet Name</InputLabel>
                <FilledInput size="small" id="wallet_name" {...register("walletName")} />
                <FormHelperText>{errors.walletName?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.createDate}>
                <Controller
                  name="createDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Expired At"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.createDate,
                          helperText: errors.createDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>{errors.createDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>


            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth error={!!errors.updateDate}>
                <Controller
                  name="updateDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Expired At"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={loading}
                      slotProps={{
                        textField: {
                          error: !!errors.updateDate,
                          helperText: errors.updateDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText>{errors.updateDate?.message}</FormHelperText>
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
  