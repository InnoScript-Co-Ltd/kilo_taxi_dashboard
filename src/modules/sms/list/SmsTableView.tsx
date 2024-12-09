import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";

import { smsStatusLists, paginateOptions } from "../../../constants/config";
import { paths } from "../../../constants/paths";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router";
import UpAndDel from "../../../components/UpAndDel";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import { useNotifications } from "@toolpad/core";
import Status from "../../../components/Status";
import { setPaginate } from "../sms.slice";
import { smsService } from "../sms.service";
import { smsColumns, smsPayload } from "../sms.payload";

const SmsTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.sms
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
    await smsService.index(dispatch, pagingParams, notifications);
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
          placeholder="Search State"
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
            onClick={() => navigate(paths.smsCreate)}
          >
            Create
          </Button>

          <Button
            onClick={() => {
              dispatch(setPaginate(smsPayload.pagingParams));
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
              {smsColumns.map((column) => (
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
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sms?.map((row: any) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {smsColumns.map((column) => {
                  const value = row[column.id];
                  console.log(value);
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "Name":
                            return value;
                          case "Mobile Number":
                            return value;
                          case "Title":
                            return value;
                          case "Message":
                            return value;
                          case "Status":
                            return (
                              <Status status={value} lists={smsStatusLists} />
                            );
                          case "Admin Name":
                            return value;
                          case "Customer Name":
                            return value;
                          case "Driver Name":
                            return value;
                          case "Action":
                            return (
                              <UpAndDel
                                url={`${paths.sms}/${row.id}`}
                                fn={loadingData}
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

export default SmsTableView;
