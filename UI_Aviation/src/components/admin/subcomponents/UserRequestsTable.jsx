/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { HttpRequestServices } from "../../../api/services/dashboard/HttpRequestServices";

function RequestsTable({ email }) {
  const [requests, setRequests] = useState([]);
  const { access_token } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  const fetchRequests = async (page, sortColumn = "timestamp", sortDirection = "desc") => {
    try {
      const response = await HttpRequestServices.getUserRequestByPage(
        email,
        page,
        5,
        access_token,
        sortColumn,
        sortDirection
      );

      setTotalRows(response.data.totalElements);
      setRequests(response.data.content);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error("Access forbidden. Check your credentials or permissions.");
      } else {
        console.error("An error occurred RequestsTable get:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchRequests(page, sortColumn, sortDirection);
  }, [page, sortColumn, sortDirection]);

  const columns = useMemo(
    () => [
      {
        name: "Time Stamp",
        selector: (row) => new Date(row.timestamp).toLocaleString("tr-TR", {
          timeZone: "Europe/Istanbul",
          hour12: false,
        }),
        sortable: true,
        width: "250px",
      },
      {
        name: "Email",
        selector: (row) => row?.["user-email"],
        sortable: true,
        width: "200px",
      },
      {
        name: "Method",
        selector: (row) => row?.["request-method"],
        sortable: true,
        width: "100px",
      },
      {
        name: "Request Path",
        selector: (row) => row?.["request-path"],
        sortable: true,
        width: "300px",
      },
      {
        name: "Status",
        selector: (row) => row?.["response-status"],
        sortable: true,
        width: "100px",
      },
      {
        name: "Duration",
        selector: (row) => row?.["process-time-ms"],
        sortable: true,
        width: "100px",
      },
      {
        name: "Origin",
        selector: (row) => row?.["request-origin"],
        sortable: true,
        width: "150px",
      },
    ],
    []
  );

  const handleSort = (column, sortDirection) => {
    var sortField = column.name.toLowerCase().replace(/\s+/g, '');
    if(sortField === "email")
      sortField = "user";
   
    else if(sortField === "method")
      sortField = "requestMethod";
   
    else if(sortField === "requestpath")
      sortField = "requestPath";
    
    else if(sortField === "status")
      sortField = "responseStatus";
    
    else if(sortField === "duration")
      sortField = "processTimeMs";
   
    else if(sortField === "origin")
      sortField = "requestOrigin";

    setSortColumn(sortField);
    setSortDirection(sortDirection);
    setPage(1); // Sıralama yapıldığında sayfayı sıfırla
  };

  return (
    <div className="mt-2">
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center rounded-t-lg
            bg-gradient-to-b from-sky-300 to-white w-full scale-x-110 p-2"
          >
            Http Requests
          </h2>
        }
        data={requests}
        columns={columns}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5]}
        striped
        highlightOnHover
        onChangePage={(page) => {
          setPage(page);
        }}
        onSort={handleSort}
        sortServer
      />
    </div>
  );
}

export default RequestsTable;
