// PasswordReset.tsx
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

interface PasswordResetProps {
  open: boolean;
  phone: string;
  onClose: () => void;
  onResetComplete: () => void;
}

interface ResetPasswordInputs {
  newPassword: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  open,
  phone,
  onClose,
  onResetComplete,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5112/api/v1/Auth/password-reset/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, newPassword: data.newPassword }),
        }
      );
      const result = await response.json();
      if (response.ok && result.statusCode === 200) {
        onResetComplete();
      } else {
        alert(result.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Reset Password error:", error);
      alert("Error resetting password");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography variant="subtitle1">
            Reset password for {phone}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            {...register("newPassword", {
              required: "New Password is required",
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PasswordReset;
