import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { WalletFormInputs, walletSchema } from "../wallet.payload"; // Assuming walletSchema for validation
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { walletService } from "../wallet.service"; // Service for handling wallet API requests
import { httpErrorHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";
import { useNotifications } from "@toolpad/core/useNotifications";

const WalletUpdate = () => {
  const [loading, setLoading] = useState(false);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { wallet } = useSelector((state: AppRootState) => state.wallet); // Selecting wallet data from the store
  const notifications = useNotifications();

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
    },
  });

  // Function to handle form submission and wallet update
  const submitWalletUpdate = async (data: WalletFormInputs) => {
    setLoading(true);
    const response: any = await walletService.update(
      dispatch,
      params.id,
      data,
      notifications
    );
    if (response.status === 200) {
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
      setValue("id", Number(wallet.id) || 0);
      setValue("walletName", wallet.walletName || "");
    }
  }, [wallet, setValue]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Wallet Update</h2>

        <form onSubmit={handleSubmit(submitWalletUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.walletName}
              >
                <InputLabel htmlFor="wallet_name">Wallet Name</InputLabel>
                <FilledInput
                  size="small"
                  id="wallet_name"
                  {...register("walletName")}
                />
                <FormHelperText>{errors.walletName?.message}</FormHelperText>
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

export default WalletUpdate;
