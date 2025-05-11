import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UpAndDel from "../../../components/UpAndDel";
import Status from "../../../components/Status";
import { columns, adminPayload } from "../admin.payload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { adminService } from "../admin.service";
import { paginateOptions } from "../../../constants/config";
import { paths } from "../../../constants/paths";
import {
  Paper,
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
import { setPaginate } from "../admin.slice";
import { useNavigate } from "react-router";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import { useNotifications } from "@toolpad/core/useNotifications";
import { formatDate } from "../../../helpers/common";
import AdminResetPassword from "../../../components/AdminResetPassword";
import useRoleValidator from "../../../helpers/roleValidator";

const AdminTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [status, setStatus] = React.useState("");

  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.admin
  );
  const notifications = useNotifications();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isSuperAdmin } = useRoleValidator();

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
        `http://4.145.92.57:81/api/v1/Admin/admin-report?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,
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
      a.download = "AdminReport.xlsx";
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
    await adminService.index(dispatch, pagingParams, notifications);
    setLoading(false);
  }, [dispatch, pagingParams, notifications]);

  React.useEffect(() => {
    loadingData();
  }, [pagingParams, loadingData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
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
          placeholder="Search Admin"
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
          {isSuperAdmin() ? (
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate(paths.adminCreate)}
            >
              Create
            </Button>
          ) : (
            <></>
          )}
          {isSuperAdmin() ? (
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
              dispatch(setPaginate(adminPayload.pagingParams));
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
            {data.admins?.map((row: any) => {
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
                            case "Gender":
                              return value?.toUpperCase();
                            case "Status":
                              return <Status status={value} />;
                            case "Email Verified At":
                              return formatDate(value);
                            case "Phone Verified At":
                              return formatDate(value);
                            case "Created At":
                              return formatDate(value);
                            case "Updated At":
                              return formatDate(value);
                            case "Created By":
                              return value;
                            case "Updated By":
                              return value;
                            case "Roles":
                              return value?.map((v: any) => v.name).join(", ");
                            case "Reset Password":
                              return isSuperAdmin() ? (
                                <AdminResetPassword
                                  url={`${paths.admin}/reset-password`}
                                  fn={loadingData}
                                  priority={true}
                                  email={row.email}
                                />
                              ) : null;

                            case "Action":
                              return isSuperAdmin() ? (
                                <UpAndDel
                                  url={`${paths.admin}/${row.id}`}
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

export default AdminTableView;
