import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { driverColumns, driverPayload } from "../driver.payload"; // Your driver columns and payload
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { driverService } from "../driver.service"; // Assuming you have a driver service
import UpAndDel from "../../../components/UpAndDel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  driverStatusLists,
  genderStatuslists,
  kycStatusLists,
  paginateOptions,
} from "../../../constants/config";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { setPaginate } from "../driver.slice"; // Your driver slice
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import { useNotifications } from "@toolpad/core/useNotifications";
import Status from "../../../components/Status";
import TAvatar from "../../../components/TAvatar";
import { formatDate } from "../../../helpers/common";
import FilterComponent from "../../../components/FilterComponent";
import { useNavigate } from "react-router";
import useRoleValidator from "../../../helpers/roleValidator";

export const DriverFixAmountTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [status, setStatus] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.driver // Adjust to your driver slice state
  );

  const notifications = useNotifications();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const { isSuperAdmin, isAdmin } = useRoleValidator();

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
  const handleDownloadReport = async () => {
    try {
      const response = await fetch(
        `http://4.145.92.57:81/api/v1/Driver/driver-report?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "DriverReport.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };
  const loadingData = React.useCallback(async () => {
    setLoading(true);
    await driverService.fixAmount(dispatch, pagingParams, notifications);
    setLoading(false);
  }, [dispatch, pagingParams, notifications]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          my: "20px",
          px: "20px",
          display: "flex",
          justifyContent: "start",
          gap: 5,
        }}
      >
        <Input
          id="input-with-icon-search"
          placeholder="Search Driver"
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 3,
          }}
        >
          {isSuperAdmin() || isAdmin() ? (
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate(paths.driverCreate)}
            >
              Create
            </Button>
          ) : (
            <></>
          )}
          {isSuperAdmin() || isAdmin() ? (
            <Box sx={{ my: "20px", px: "20px", display: "flex", gap: 3 }}>
              <TextField
                label="From Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <TextField
                label="To Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <FormControl variant="filled" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="DEACTIVATE">DEACTIVATE</MenuItem>
                  <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" onClick={handleDownloadReport}>
                Download Report
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <Button
            onClick={() => {
              dispatch(setPaginate(driverPayload.pagingParams)); // Reset the paginate
              setPage(0);
              setRowsPerPage(10);
            }}
            startIcon={<RestartAltIcon />}
            color="secondary"
          >
            Reset
          </Button>
        </Box>
      </Box>

      {/* <FilterComponent
        driverPayload={driverPayload}
        setPaginate={setPaginate}
      /> */}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {driverColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.numeric ? "right" : "left"}
                  padding={column.disablePadding ? "none" : "normal"}
                  sortDirection={
                    column.sort && pagingParams.SortDir === column.id
                      ? pagingParams.SortField
                      : false
                  }
                >
                  <TableSortLabel
                    hideSortIcon={!column.sort}
                    active={column.sort && pagingParams.SortDir === column.id}
                    direction={pagingParams.SortDir === 0 ? "asc" : "desc"}
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
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.drivers?.map((row: any) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {driverColumns.map((column) => {
                  const value = row[column.id];
                  console.log("value:", value);
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "Name":
                            return (
                              <NavigateId
                                url={`${paths.driver}/${row.id}`} // Driver detail path
                                value={value}
                              />
                            );
                          case "Type":
                            return value?.walletName;
                          case "Register DateTime":
                            return formatDate(value);
                          case "Profile":
                            return <TAvatar src={value} />;
                          case "Status":
                            return (
                              <Status
                                status={value}
                                lists={driverStatusLists}
                              />
                            );
                          case "Kyc Status":
                            return (
                              <Status status={value} lists={kycStatusLists} />
                            );
                          case "Gender":
                            return (
                              <Status
                                status={value}
                                lists={genderStatuslists}
                              />
                            );
                          case "Action":
                            return isSuperAdmin() || isAdmin() ? (
                              <UpAndDel
                                url={`${paths.driver}/${row.id}`}
                                fn={loadingData}
                                priority={true}
                              />
                            ) : null;
                          default:
                            return value; // Fallback for other columns
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
        count={data?.paging?.totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DriverFixAmountTableView;
