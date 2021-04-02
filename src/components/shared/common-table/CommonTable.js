import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
} from "@material-ui/core";

// const useStyles = makeStyles({
//   leadTableContainer: {
//     boxShadow:
//       "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)"
//   }
// });

const CommonTable = ({ totalCount, customPagination, setCustomPagination, data, keys, isWithoutHeader }) => {
  const columns = keys.map(key => {
    return {
      id: key,
      label: typeof key ==="string" ?  key.split("_").join(" ") : key,
      minWidth: 25
    };
  });

  

  const createData = useCallback(
    data => {
      let TableRow = data.map((value, index) => [keys[index], value]);
      return Object.fromEntries(TableRow);
    },
    [keys]
  );

  // const classes = useStyles();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    if (customPagination) setCustomPagination({page: newPage+1});
    else setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    if (customPagination) {
      setCustomPagination({limit: +event.target.value, page: 1});

    }else {
      setRowsPerPage(+event.target.value);
      setPage(0);
    }
  };

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    let rows = data.map(e => createData(e));
    if (JSON.stringify(rowData) !== JSON.stringify(rows)) {

      setRowData(rows);
      if (customPagination) {
        setPage(customPagination.page-1);
        setRowsPerPage(customPagination.limit);
      }
    }
  }, [data, rowData, createData, customPagination]);
console.log(totalCount)
  return (
    <TableContainer
      component={Paper}
      className={` p-3 `}
    >
      <Table aria-label="a dense table" size="small">
        {!isWithoutHeader && (
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  className="text-left text-capitalize"
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {
            //for default pagination
            // rowData
            //  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            customPagination ? (rowData &&
            rowData
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="text-left"
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })) :
                rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map(column => {
                              const value = row[column.id];
                              return (
                                  <TableCell
                                      key={column.id}
                                      align={column.align}
                                      className="text-left"
                                      >
                                    {column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                  </TableCell>
                              );
                            })}
                          </TableRow>
                      );
                    })
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
        component="div"
        count={ totalCount ? parseInt(totalCount) : rowData.length}
        rowsPerPage={rowsPerPage}
        page={ page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CommonTable;
