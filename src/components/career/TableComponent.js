import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import * as XLSX from "xlsx";
// import 'bootstrap/dist/css/bootstrap.min.css';

const TableComponent = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };
  const handleButtonClick = (row) => {
    alert(`Button clicked for row: ${JSON.stringify(row)}`);
    // Add your custom functionality here
  };
  return (
    <div className="container">
        <div className="row mt-3">
            <div className="col-lg-4">
                <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="form-control mb-3 w-100"
        />
            </div>
        </div>
      
      <table
        {...getTableProps()}
        className="table table-bordered table-striped"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
              <th>
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleButtonClick(row.original)}
                  >
                    <i class="bx bx-show me-1"></i> View
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-primary mt-4"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-primary mt-4"
        >
          Next
        </button>
      </div>
      <button onClick={handleExport} className="btn btn-success mt-3">
        Export to XLSX
      </button>
    </div>
  );
};

export default TableComponent;
