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
import { paginateOptions } from "../../../constants/config";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
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
import { useNotifications } from '@toolpad/core/useNotifications';

const CustomerTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.country
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

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    await customerService.index(dispatch, pagingParams, notifications);
    setLoading(false);
  }, [dispatch, pagingParams]);

  React.useEffect(() => {
    loadingData();
  }, [pagingParams]);

  console.log(data);

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
          placeholder="Search Country"
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
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate(paths.customerCreate)}
          >
            Create
          </Button>

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
              {columns.map((column) => (
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
            {data.countries.map((row: any) => {
              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}
                        {(() => {
                          switch (column.label) {
                            case "Name":
                              return (
                                <NavigateId
                                  url={`${paths.country}/${row.id}`}
                                  value={value}
                                />
                              );
                            case "Mobile Prefix":
                              return value; // Render the mobile prefix as-is
                            case "FlagIcon":
                              return <TAvatar src={value} />; // Render the flag icon as-is
                            case "Action":
                              return (
                                <UpAndDel
                                  url={`${paths.country}/${row.id}`}
                                  fn={loadingData}
                                  priority={true}
                                />
                              );
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
