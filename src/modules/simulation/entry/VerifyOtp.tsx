// VerifyOtp.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface VerifyOtpProps {
  open: boolean;
  phone: string;
  onClose: () => void;
  onVerified: () => void;
}

interface VerifyOtpInputs {
  otp: string;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({
  open,
  phone,
  onClose,
  onVerified,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpInputs>();

  const onSubmit: SubmitHandler<VerifyOtpInputs> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5112/api/v1/Auth/password-reset/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp: data.otp }),
        }
      );
      const result = await response.json();
      if (response.ok && result.statusCode === 200) {
        onVerified();
      } else {
        alert(result.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Error verifying OTP");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verify OTP</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography variant="subtitle1">
            Enter the OTP sent to {phone}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="text"
            fullWidth
            {...register("otp", { required: "OTP is required" })}
            error={!!errors.otp}
            helperText={errors.otp?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Verify
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VerifyOtp;
