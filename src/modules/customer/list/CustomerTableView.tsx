import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns, customerPayload } from "../customer.payload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { customerService } from "../customer.service";
import {
  customerStatusLists,
  genderStatuslists,
  kycStatusLists,
  paginateOptions,
} from "../../../constants/config";
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

import { setPaginate } from "../customer.slice";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router";
import UpAndDel from "../../../components/UpAndDel";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import TAvatar from "../../../components/TAvatar";
import { useNotifications } from "@toolpad/core/useNotifications";
import { formatDate } from "../../../helpers/common";
import Status from "../../../components/Status";
import useRoleValidator from "../../../helpers/roleValidator";

const CustomerTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { isSuperAdmin, isAdmin } = useRoleValidator();

  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.customer
  );
  const notifications = useNotifications();

  const navigate = useNavigate();
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
    dispatch(
      setPaginate({
        ...pagingParams,
        CurrentPage: 1,
        PageSize: event.target.value,
      })
    );
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDownloadReport = async () => {
    try {
      const response = await fetch(
        `http://4.145.92.57:81/api/v1/Customer/customer-report?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,
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
      a.download = "CustomerReport.xlsx";
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
    await customerService.index(dispatch, pagingParams, notifications);
    setLoading(false);
  }, [dispatch, pagingParams, notifications]);

  React.useEffect(() => {
    loadingData();
  }, [pagingParams, loadingData]);

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
          placeholder="Search Customers"
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
              onClick={() => navigate(paths.customerCreate)}
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
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="DEACTIVE">DEACTIVE</MenuItem>
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
              dispatch(setPaginate(customerPayload.pagingParams));
            }}
            startIcon={<RestartAltIcon />}
            color="secondary"
          >
            Reset
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.numeric ? "right" : "left"}
                  padding={column.disablePadding ? "none" : "normal"}
                  sortDirection={
                    pagingParams.SortDir === column.id
                      ? pagingParams.SortField
                      : false
                  }
                >
                  <TableSortLabel
                    active={pagingParams.SortDir === column.id}
                    direction={pagingParams.SortDir === 0 ? "asc" : "desc"}
                    onClick={() => {
                      dispatch(
                        setPaginate({
                          ...pagingParams,
                          SortField: column.id,
                          SortDir: pagingParams.SortDir === 0 ? 1 : 0,
                        })
                      );
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.customers?.map((row: any) => {
              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns?.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {(() => {
                          switch (column.label) {
                            case "Name":
                              return value;
                            case "Phone":
                              return value; // Render the mobile prefix as-is
                            case "Email":
                              return value;
                            case "Profile":
                              return <TAvatar src={value} />; // Render the flag icon as-is
                            case "Registered Datetime":
                              return formatDate(value);
                            case "Gender":
                              return value;

                            case "Status":
                              return (
                                <Status
                                  status={value}
                                  lists={customerStatusLists}
                                />
                              );
                            case "KycStatus":
                              return (
                                <Status status={value} lists={kycStatusLists} />
                              );
                            case "Action":
                              return isSuperAdmin() || isAdmin() ? (
                                <UpAndDel
                                  url={`${paths.customer}/${row.id}`}
                                  fn={loadingData}
                                  priority={true}
                                />
                              ) : null;
                            default:
                              return value; // Fallback case
                          }
                        })()}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        disabled={loading}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        component="div"
        count={data.paging.totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomerTableView;
