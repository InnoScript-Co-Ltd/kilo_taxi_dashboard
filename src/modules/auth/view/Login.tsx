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
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

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
    const response = await authService.store(data, dispatch);
    if (response.status === 200) {
      navigate(`${paths.dashboard}`);
    }
    setLoading(false);
  };

  return (
    <div className=" w-full h-100vh flex justify-center items-center">
      <Box>
        <Card sx={{ marginTop: "20px", padding: "20px" }}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submitLogin)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.emailOrPhone}
                >
                  <InputLabel htmlFor="emailOrPhone">Email Or Phone</InputLabel>
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
                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    disabled={loading}
                    size="small"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={loading}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
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
              {/* <Button variant="outlined" onClick={() => navigate(paths.cityList)}>
                                Cancel
                            </Button> */}
              <Button
                style={{ background: "#ffa726" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
