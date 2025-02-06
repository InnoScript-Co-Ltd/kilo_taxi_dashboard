// ForgetPassword.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import VerifyOtp from "./VerifyOtp";
import PasswordReset from "./PasswordReset";

interface ForgetPasswordInputs {
  phone: string;
}

const ForgetPassword: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [openVerifyModal, setOpenVerifyModal] = useState<boolean>(false);
  const [openResetModal, setOpenResetModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordInputs>();

  // Step 1: Send OTP
  const onSendOtp: SubmitHandler<ForgetPasswordInputs> = async (data) => {
    try {
      setPhone(data.phone);
      const response = await fetch(
        "http://localhost:5112/api/v1/Auth/password-reset/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: data.phone }),
        }
      );
      const result = await response.json();
      if (response.ok && result.statusCode === 200) {
        setOpenVerifyModal(true);
      } else {
        alert(result.message || "Error sending OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Error sending OTP");
    }
  };

  // When OTP verification succeeds, open the reset password modal.
  const handleVerified = () => {
    setOpenVerifyModal(false);
    setOpenResetModal(true);
  };

  // When password reset completes, you can clear state or redirect.
  const handleResetComplete = () => {
    setOpenResetModal(false);
    alert("Password reset successfully");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Forget Password
      </Typography>
      <form onSubmit={handleSubmit(onSendOtp)}>
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          {...register("phone", { required: "Phone is required" })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Send OTP
        </Button>
      </form>

      {/* Verify OTP Modal */}
      <VerifyOtp
        open={openVerifyModal}
        phone={phone}
        onClose={() => setOpenVerifyModal(false)}
        onVerified={handleVerified}
      />

      {/* Reset Password Modal */}
      <PasswordReset
        open={openResetModal}
        phone={phone}
        onClose={() => setOpenResetModal(false)}
        onResetComplete={handleResetComplete}
      />
    </Box>
  );
};

export default ForgetPassword;
