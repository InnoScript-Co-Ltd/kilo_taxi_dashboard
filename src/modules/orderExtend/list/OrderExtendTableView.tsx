import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { useNotifications } from "@toolpad/core";
import {
  Box,
  Button,
  Chip,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LoginIcon from "@mui/icons-material/Login";
import { orderExtendService } from "../orderExtend.service";
import { orderExtendColumns, orderExtendPayload } from "../orderExtend.payload";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/TableCommon";
import Status from "../../../components/Status";
import { paginateOptions } from "../../../constants/config";
import { setPaginate } from "../orderExtend.slice";
import UpAndDel from "../../../components/UpAndDel";
import { paths } from "../../../constants/paths";
import { NavigateId } from "../../../shares/NavigateId";
import { formatDate } from "../../../helpers/common";

const OrderExtendTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.orderExtend // Adjust to your orderExtend slice state
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

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    await orderExtendService.index(dispatch, pagingParams, notifications);
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
          placeholder="Search Order Extend"
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
            onClick={() => {
              dispatch(setPaginate(orderExtendPayload.pagingParams)); // Reset the paginate
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
              {orderExtendColumns.map((column) => (
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
            {data.orderExtends?.map((row: any) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {orderExtendColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          
                          case "Created Date":
                            return formatDate(value);
                          case "Action":
                            return (
                              <NavigateId
                                url={`${paths.orderExtend}/${row.id}`}
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

export default OrderExtendTableView;
