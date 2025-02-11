import { useState } from "react";
import { Box, Grid2, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { DRIVER_PAYLOAD } from "../modules/driver/driver.payload";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";

export const FilterComponent = ({
  driverPayload,
  setPaginate,
}: {
  driverPayload: DRIVER_PAYLOAD;
  setPaginate: any;
}) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(true); // State to toggle filters

  return (
    <Box
      sx={{
        my: "20px",
        px: "20px",
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          position: "absolute",
          top: 130,
          right: 60,
        }}
      >
        <IconButton
          color="primary"
          onClick={() => setShowFilters((prev) => !prev)}
          sx={{ marginBottom: 2 }}
        >
          {showFilters ? <FilterAlt /> : <FilterAltOff />}
        </IconButton>
      </Box>

      {/* Conditionally render filter fields */}
      {showFilters && (
        <Grid2 container spacing={3} sx={{ md: 12 }}>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="Name"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    Name: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="ID"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    Id: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="Phone"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    Phone: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="Status"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    Status: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="Township"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    Township: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <TextField
              label="City"
              variant="standard"
              onChange={(e) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    City: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <DatePicker
              label="Register From"
              onChange={(date) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    RegisterFrom: date?.toISOString(),
                  })
                )
              }
            />
          </Grid2>
          <Grid2 sx={{ md: 3 }}>
            <DatePicker
              label="Register To"
              onChange={(date) =>
                dispatch(
                  setPaginate({
                    ...driverPayload.pagingParams,
                    RegisterTo: date?.toISOString(),
                  })
                )
              }
            />
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};

export default FilterComponent;
