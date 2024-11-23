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
import { generalStatusLists, kycStatusLists, paginateOptions } from "../../../constants/config";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
} from "@mui/material";
import { setPaginate } from "../driver.slice"; // Your driver slice
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { StyledTableCell, StyledTableRow } from "../../../components/TableCommon";
import { useNotifications } from '@toolpad/core/useNotifications';
import Status from "../../../components/Status";

const DriverTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.driver // Adjust to your driver slice state
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
    await driverService.index(dispatch, pagingParams,notifications);
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
                  sortDirection={column.sort && pagingParams.SortDir === column.id ? pagingParams.SortField : false}
                >
                  <TableSortLabel
                    hideSortIcon={!column.sort}
                    active={column.sort && pagingParams.SortDir === column.id}
                    direction={pagingParams.SortDir === 0 ? "asc" : "desc"}
                    onClick={() => {
                      if(column.sort) {
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
          

              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
              >
                {driverColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "Driver Name":                            
                            return (
                              <NavigateId
                                url={`${paths.driver}/${row.id}`} // Driver detail path
                                value={value}
                              />
                            );
                          case "Audit Column":
                            return value;
                          case "License":
                            return value;
                          case "Driver ID":
                            return value; // Optionally link to a driver detail page
                          case "Status":
                            return <Status status={value} lists={generalStatusLists} />
                          case "kycStatus":
                            return <Status status={value} lists={kycStatusLists} />
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

export default DriverTableView;
