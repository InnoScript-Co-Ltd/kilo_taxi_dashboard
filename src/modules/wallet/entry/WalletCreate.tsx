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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";

const WalletCreate = () => {
  const [loading, setLoading] = useState(false);
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

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Wallet Create</h2>
        <form onSubmit={handleSubmit(submitWalletCreate)}>
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
