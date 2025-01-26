import { useState } from "react";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { AuthFormInputs, authSchema } from "../auth.payload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../constants/paths";
import { authService } from "../auth.service";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  Paper,
} from "@mui/material";
import Password from "../../../components/Password";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Set up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
  });

  const submitLogin = async (data: AuthFormInputs) => {
    setLoading(true);
    console.log(process.env.BASE_URL);

    const response = await authService.store(data, dispatch);
    console.log("res", response);
    if (response.status === 200) {
      navigate(`${paths.dashboard}`);
    }
    setLoading(false);
  };

  return (
    <Box className=" w-full h-100vh flex justify-center items-center">
      <Grid2 width={"auto"} container spacing={3}>
        <Grid2
          size={{ md: 8 }}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "start",
          }}
        >
          <img
            alt="login bg"
            width={"auto"}
            style={{
              width: "100%",
              height: "auto",
            }}
            src={"/login_bg.svg"}
          />
        </Grid2>
        <Grid2 size={{ md: 4 }}>
          <Paper elevation={0} sx={{ marginTop: "20px", padding: "20px" }}>
            <img alt="login logo" src={"/login_logo.svg"} />

            <h2 style={{ textAlign: "center", padding: "50px 0" }}>
              Admin Login
            </h2>
            <form onSubmit={handleSubmit(submitLogin)}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 12 }}>
                  <FormControl
                    variant="filled"
                    fullWidth
                    error={!!errors.emailOrPhone}
                  >
                    <InputLabel htmlFor="emailOrPhone">
                      Email Or Phone
                    </InputLabel>
                    <FilledInput
                      size="small"
                      id="emailOrPhone"
                      {...register("emailOrPhone")}
                    />
                    <FormHelperText>
                      {errors.emailOrPhone?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 12 }}>
                  <Password
                    register={register}
                    loading={loading}
                    errors={errors}
                  />
                </Grid2>
              </Grid2>

              <Button
                fullWidth
                disabled={loading}
                size={"large"}
                style={{ background: "#ffa726", marginTop: "20px" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
