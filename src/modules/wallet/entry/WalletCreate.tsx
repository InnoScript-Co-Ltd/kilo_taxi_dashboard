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
} from "@mui/material";
import { useState } from "react";
import { WalletFormInputs, walletSchema } from "../wallet.payload"; // Import wallet schema
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { walletService } from "../wallet.service"; // Import wallet service
import { Breadcrumb } from "../../../components/Breadcrumb";
import { paths } from "../../../constants/paths";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";

const WalletCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useNotifications();

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletFormInputs>({
    resolver: zodResolver(walletSchema),
  });

  const submitWalletCreate = async (data: WalletFormInputs) => {
    setLoading(true);
    const response = await walletService.store(data, dispatch, notifications);
    if (response.statusCode === 201) {
      navigate(`${paths.walletList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Wallet Create</h2>
        <form onSubmit={handleSubmit(submitWalletCreate)}>
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
            <Button
              variant="outlined"
              onClick={() => navigate(paths.walletList)}
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

export default WalletCreate;
