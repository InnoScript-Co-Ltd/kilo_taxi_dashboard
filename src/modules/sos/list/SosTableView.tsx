import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { sosColumns, sosPayload } from "../sos.payload"; // Replace with your wallet columns and payload
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { sosService } from "../sos.service";
import {
  generalStatusLists,
  paginateOptions,
  walletTypeStatusLists,
} from "../../../constants/config";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { setPaginate } from "../sos.slice"; // Adjust the slice if needed
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import { useNotifications } from "@toolpad/core/useNotifications";
import Status from "../../../components/Status";
import CurrentLocation from "../../../components/CurrentLocation";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import { format } from "date-fns";

const SosTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [status, setStatus] = React.useState<string>("customer");
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.sos
  );

  const notifications = useNotifications();
  const [loading, setLoading] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    dispatch(
      setPaginate({
        ...pagingParams,
        CurrentPage: newPage + 1,
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch(
      setPaginate({
        ...pagingParams,
        RowsPerPage: +event.target.value,
        CurrentPage: 1,
      })
    );
  };

  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    await sosService.index(dispatch, pagingParams, notifications);
    setLoading(false);
  }, [dispatch, pagingParams, notifications]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  const handleSolve = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to solve this SOS?"
    );
    if (!confirmed) return;

    try {
      const response = await sosService.solve(dispatch, id, notifications);

      if (response.statusCode === 200) {
        alert("SOS solved successfully!");
        // Refresh the SOS list
        sosService.index(dispatch, {});
      } else {
        alert("Failed to solve SOS.");
      }
    } catch (error) {
      console.error("Error solving SOS:", error);
    }
  };

  const filteredData = React.useMemo(() => {
    if (status === "CUSTOMER") {
      return data.sos.filter((row: any) => row.userType === "CUSTOMER");
    } else if (status === "driver") {
      return data.sos.filter((row: any) => row.userType === "DRIVER");
    } else if (status === "solved") {
      return data.sos.filter((row: any) => row.updatedDate !== null);
    } else {
      return data.sos; // Fallback to show all data if status is invalid
    }
  }, [data.sos, status]);

  const displayedColumns = React.useMemo(() => {
    return sosColumns.filter((col) => {
      if (status === "solved" && col.id === "action") return false; // Hide Action Column
      if (status !== "solved" && col.id === "updatedDate") return false; // Hide Solved DateTime Column
      return true;
    });
  }, [status]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      {/* Search and Reset Container */}
      <Box
        sx={{
          my: "20px",
          px: "20px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Input
          id="input-with-icon-search"
          placeholder="Search SOS"
          value={pagingParams.SearchTerm}
          onChange={(e) => {
            dispatch(
              setPaginate({
                ...pagingParams,
                SearchTerm: e.target.value,
              })
            );
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

        <Button
          onClick={() => {
            dispatch(setPaginate(sosPayload.pagingParams)); // Adjust the reset payload
            setPage(0);
            setRowsPerPage(10);
          }}
          startIcon={<RestartAltIcon />}
          color="secondary"
        >
          Reset
        </Button>
      </Box>

      {/* Toggle Buttons - Now Below Search and Reset */}
      <Box sx={{ display: "flex", justifyContent: "start", mb: 2, px: "20px" }}>
        <ToggleButtonGroup
          value={status}
          exclusive
          onChange={handleStatusChange}
          aria-label="SOS Status"
        >
          <ToggleButton value="customer" sx={{ textTransform: "none" }}>
            Customer
          </ToggleButton>
          <ToggleButton value="driver" sx={{ textTransform: "none" }}>
            Driver
          </ToggleButton>
          <ToggleButton value="solved" sx={{ textTransform: "none" }}>
            Solved
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {sosColumns.map((column) => {
                // Hide the "Action" column when status is "solved"
                if (status === "solved" && column.id === "action") {
                  return null;
                }
                // Hide the "Solved DateTime" column when status is not "solved"
                if (status !== "solved" && column.id === "updatedDate") {
                  return null;
                }

                return (
                  <StyledTableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    align={column.numeric ? "right" : "left"}
                    padding={column.disablePadding ? "none" : "normal"}
                    sortDirection={
                      column.sort === true && pagingParams.SortDir === column.id
                        ? pagingParams.SortField
                        : false
                    }
                  >
                    <TableSortLabel
                      hideSortIcon={column.sort === false ? true : false}
                      active={
                        column.sort === true
                          ? pagingParams.SortDir === column.id
                          : false
                      }
                      direction={
                        column.sort === true && pagingParams.SortDir === 0
                          ? "asc"
                          : "desc"
                      }
                      onClick={() => {
                        if (column.sort) {
                          dispatch(
                            setPaginate({
                              ...pagingParams,
                              SortField: column.id,
                              SortDir: pagingParams.SortDir === 0 ? 1 : 0,
                            })
                          );
                        }
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row: any) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {sosColumns.map((column) => {
                  // Hide the "Action" column when status is "solved"
                  if (status === "solved" && column.id === "action") {
                    return null;
                  }
                  // Hide the "Solved Date" column when status is not "solved"
                  if (status !== "solved" && column.id === "updatedDate") {
                    return null;
                  }
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "Request DateTime":
                            return value
                              ? format(new Date(value), "d MMM yyyy hh:mm a")
                              : "N/A";
                          case "Solved DateTime":
                            return value
                              ? format(new Date(value), "d MMM yyyy hh:mm a")
                              : "N/A";
                          case "Action":
                            return (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSolve(row.id)}
                              >
                                Solve
                              </Button>
                            );
                          default:
                            return value ?? "N/A";
                        }
                      })()}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        disabled={loading}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SosTableView;
