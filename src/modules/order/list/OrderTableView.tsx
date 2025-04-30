import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { useNotifications } from "@toolpad/core";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { orderService } from "../order.service";
import { orderColumns, orderPayload } from "../order.payload";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import Status from "../../../components/Status";
import { orderStatusLists, paginateOptions } from "../../../constants/config";
import { setPaginate } from "../order.slice";
import { paths } from "../../../constants/paths";
import { NavigateId } from "../../../shares/NavigateId";
import { formatDate } from "../../../helpers/common";
import { useNavigate } from "react-router";
import useRoleValidator from "../../../helpers/roleValidator";

const OrderTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.order // Adjust to your order slice state
  );
  const notifications = useNotifications();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { isOrderAdmin } = useRoleValidator();
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [status, setStatus] = React.useState("");
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
        `http://4.145.92.57:81/api/v1/Order/order-report?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,
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
      a.download = "OrderReport.xlsx";
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
    await orderService.index(dispatch, pagingParams, notifications);
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
          placeholder="Search Order"
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
          {isOrderAdmin() ? (
            <Button
              disabled={!isOrderAdmin()}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate(paths.orderCreate)}
            >
              Create
            </Button>
          ) : (
            <></>
          )}
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
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                <MenuItem value="CANCELLED">INPROGRESS</MenuItem>
                <MenuItem value="CANCELLED">DRIVERACCEPTED</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleDownloadReport}>
              Download Report
            </Button>
          </Box>
          <Button
            onClick={() => {
              dispatch(setPaginate(orderPayload.pagingParams)); // Reset the paginate
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

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {orderColumns.map((column) => (
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
                    // hideSortIcon={!column.sort}
                    active={pagingParams.SortDir === column.id}
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
            {data.orders?.map((row: any) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {orderColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "Total Amount":
                            return value;
                          case "Status":
                            return (
                              <Status status={value} lists={orderStatusLists} />
                            );
                          case "Type":
                            return value;
                          // return (
                          //   <Status status={value} lists={orderTypeLists} />
                          // );
                          case "Created Date":
                            return formatDate(value);
                          case "Wallet Transaction Id":
                            return value;
                          case "Customer":
                            return `${value?.name ?? ""} ${value?.phone ?? ""}`;
                          case "Driver":
                            return `${value?.name ?? ""} ${value?.phone ?? ""}`;
                          case "Request Datetime":
                            return formatDate(value);
                          case "Schedule Booking Id":
                            return value;
                          case "Action":
                            return (
                              <NavigateId
                                url={`${paths.order}/${row.id}`}
                                value={
                                  <>
                                    <Button startIcon={<></>} color="secondary">
                                      View Detail
                                    </Button>
                                  </>
                                }
                              />
                            );
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
        count={data.paging.totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderTableView;
