import React, { useEffect, useState, useMemo, useCallback } from "react";
import DataTable from "react-data-table-component";
import { DashboardServices } from "../../../api/services/dashboard/DashboardServices";
import { useSelector } from "react-redux";

function RequestsTable({ row_count, per_page }) {
  const [requests, setRequests] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [perPage, setPerPage] = useState(per_page || 10);
  const { access_token } = useSelector((state) => state.auth);

  const fetchRequests = useCallback(async (page, perPage, sortColumn = "timestamp", sortDirection = "desc") => {
    try {
      const response = await DashboardServices.getRequests(
        access_token,
        page,
        perPage,
        sortColumn,
        sortDirection
      );

      setRequests(response.content);
      setTotalRows(response.totalElements);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error("Access forbidden. Check your credentials or permissions.");
      } else {
        console.error("An error occurred RequestsTable get:", error.message);
      }
    }
  }, [access_token]);

  useEffect(() => {
    fetchRequests(page, perPage, sortColumn, sortDirection);
  }, [page, perPage, sortColumn, sortDirection, fetchRequests]);

  function formatUTCDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
      hour12: false,
    });
  }

  const handleSort = (column, sortDirection) => {
    var sortField = column.name.toLowerCase().replace(/\s+/g, '');

    if(sortField === "useremail")
      sortField = "user";
   
    else if(sortField === "method")
      sortField = "requestMethod";
   
    else if(sortField === "path")
      sortField = "requestPath";
    
    else if(sortField === "responsestatus")
      sortField = "responseStatus";
    
    else if(sortField === "durationtime")
      sortField = "processTimeMs";
   
    else if(sortField === "origin")
      sortField = "requestOrigin";
    
    else if(sortField === "parameters")
      sortField = "requestParam";

    setSortColumn(sortField);
    setSortDirection(sortDirection);
    setPage(1); // Sıralama yapıldığında sayfayı sıfırla
  };

  const columns = useMemo(
    () => [
      {
        name: "Time Stamp",
        selector: (row) => formatUTCDate(row["timestamp"]),
        sortable: true,
      },
      {
        name: "Method",
        selector: (row) => row["request-method"],
        sortable: true,
      },
      {
        name: "Duration Time",
        selector: (row) => `${row["process-time-ms"]} ms`,
        sortable: true,
      },
      {
        name: "Origin",
        selector: (row) => row["request-origin"],
        sortable: true,
      },
      {
        name: "User Email",
        selector: (row) => row["user-email"],
        sortable: true,
      },
      {
        name: "Path",
        selector: (row) => row["request-path"],
        sortable: true,
      },
      {
        name: "Response Status",
        selector: (row) => row["response-status"],
        sortable: true,
        format: (row) => row["response-status"] || "No status",
      },
      {
        name: "Parameters",
        selector: (row) => row["request-parameter"] || "None",
        sortable: true,
      },
    ],
    []
  );

  return (
    <div className="mt-2">
      <DataTable
        title={
          <h2 className="text-blue-950 font-extrabold text-center rounded-t-lg bg-gradient-to-b from-sky-300 to-white w-full scale-x-110 p-2">
            Http Requests
          </h2>
        }
        data={requests}
        columns={columns}
        pagination
        paginationServer
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={row_count || [10, 20, 50]}
        paginationTotalRows={totalRows}
        striped
        highlightOnHover
        onSort={handleSort}
        sortServer
        onChangePage={(page) => {
          console.log(`Changing page to ${page}`);
          setPage(page);
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(`Changing rows per page to ${currentRowsPerPage}, current page: ${currentPage}`);
          setPerPage(currentRowsPerPage);
        }}
      />
    </div>
  );
}

export default RequestsTable;