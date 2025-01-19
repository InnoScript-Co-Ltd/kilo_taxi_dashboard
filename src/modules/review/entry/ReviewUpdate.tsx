import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { httpErrorHandler, httpServiceHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormInputs, reviewSchema } from "../review.payload";
import { reviewService } from "../review.service";

const ReviewUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [customerLists, setCustomerLists] = useState<Array<any>>([]);
  const [driverLists, setDriverLists] = useState<Array<any>>([]);

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { review } = useSelector((state: AppRootState) => state.review); // Selecting state data from the store

  // Set up React Hook Form with Zod schema
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      id: 0,
      CustomerId: 0,
      DriverId: 0,
      Rating: 0,
      ReviewContent: "",
    },
  });

  // Function to handle form submission and state update
  const submitReviewUpdate = async (data: ReviewFormInputs) => {
    setLoading(true);
    const response: any = await reviewService.update(dispatch, params.id, data);
    if (response.statusCode === 200) {
      navigate(`${paths.reviewList}`); // Navigate to the state list page on success
    }
    setLoading(false);
  };

  // Function to load state data based on the ID from params
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const customerResponse: any = await getRequest(
        `${endpoints.customer}`,
        null,
        dispatch
      );
      const driverResponse: any = await getRequest(
        `${endpoints.driver}`,
        null,
        dispatch
      );

      await httpServiceHandler(dispatch, customerResponse);
      await httpServiceHandler(dispatch, driverResponse);

      if (
        customerResponse &&
        "data" in customerResponse &&
        customerResponse.status === 200
      ) {
        setCustomerLists(customerResponse.data.payload.customers);
      }
      if (
        driverResponse &&
        "data" in driverResponse &&
        driverResponse.status === 200
      ) {
        setDriverLists(driverResponse.data.payload.drivers);
      }
    } catch (error) {
      await httpErrorHandler(error, dispatch);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (review) {
      setValue("id", Number(review.id) || 0);
      setValue("CustomerId", review.customerId || 0);
      setValue("DriverId", review.driverId || 0);
      setValue("Rating", Number(review.rating) || 0);
      setValue("ReviewContent", String(review.reviewContent) || "");
    }
  }, [review, setValue]);

  // Load data into form fields on component mount
  const loadingDataDetail = useCallback(async () => {
    setLoading(true);
    await reviewService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingDataDetail();
  }, [loadingDataDetail]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Review Update</h2>

        <form onSubmit={handleSubmit(submitReviewUpdate)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.CustomerId}
              >
                <InputLabel htmlFor="customer_name">Customer</InputLabel>
                <Controller
                  name="CustomerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="customer_name"
                      aria-describedby="customer_name_text"
                      disabled={loading}
                      label="Customer"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {customerLists.map((customer: any) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.CustomerId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.DriverId}>
                <InputLabel htmlFor="driver_name">Driver</InputLabel>
                <Controller
                  name="DriverId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      size="small"
                      id="driver_name"
                      aria-describedby="driver_name_text"
                      disabled={loading}
                      label="Driver"
                      {...field}
                      value={field.value} // Convert field value to a string
                      onChange={(event) => field.onChange(event.target.value)} // Ensure onChange value is a string
                    >
                      {driverLists.map((driver: any) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.DriverId?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl variant="filled" fullWidth error={!!errors.Rating}>
                <InputLabel htmlFor="rating">Rating</InputLabel>
                <FilledInput
                  type="number"
                  size="small"
                  id="rating"
                  {...register("Rating", { valueAsNumber: true })}
                />
                <FormHelperText>{errors.Rating?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.ReviewContent}
              >
                <InputLabel htmlFor="review_content">Review Content</InputLabel>
                <FilledInput
                  size="small"
                  id="review_content"
                  {...register("ReviewContent")}
                />
                <FormHelperText>{errors.ReviewContent?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>

          {/* footer */}
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
              onClick={() => navigate(paths.reviewList)}
            >
              Cancle
            </Button>
            <Button disabled={loading} variant="contained" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ReviewUpdate;
