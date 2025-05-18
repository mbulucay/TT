import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { DashboardServices } from "../../api/services/dashboard/DashboardServices";
import { AuthService } from "../../api/auth/auth";
import { authDataAssign } from "../../store/user/authSlice";
import { HttpRequestServices } from "../../api/services/dashboard/HttpRequestServices";

function Analysis() {
  const [requests_statics, setRequestStatics] = useState([]);
  const { access_token, refresh_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchAnalysis = async () => {
    try {
      const response =
        await HttpRequestServices.getRequestStatics(access_token);
      setRequestStatics((prev) => response);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
        const response = await AuthService.updateAccessToken(refresh_token);
        if (response) {
          dispatch(
            authDataAssign({
              access_token: response?.access_token,
              refresh_token: response?.refresh_token,
              email: response?.email,
              role: response?.user_role,
              firstname: response?.user_firstname,
              lastname: response?.user_lastname,
            })
          );
        }
      } else {
        console.error("An error occurred RequestsTable get:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [access_token]);

  const columns = useMemo(
    () => [
      {
        name: "Request Path",
        selector: (row) => row["request-path"],
        sortable: true,
        // width: "200px",
      },
      {
        name: "Method",
        selector: (row) => row["request-method"],
        sortable: true,
        // width: "100px",
      },
      {
        name: "# of request",
        selector: (row) => row["number-of-requests"],
        sortable: true,
        // width: "100px",
      },
      {
        name: "Avg process time (ms)",
        selector: (row) => row["average-process-time-ms"],
        sortable: true,
        // width: "200px",
      },
      {
        name: "% of total requests",
        selector: (row) => row["percentage-over-total-requests"],
        sortable: true,
        // width: "200px",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col h-full bg-sky-200 px-4 pb-4">
      <div className="flex-grow grid grid-cols-1 bg-sky-400/50 md:grid-cols-1 w-full p-2 mt-2">
        <DataTable
          title={
            <h2
              className="text-blue-950 font-extrabold text-center rounded-t-lg
            bg-gradient-to-b from-sky-300 to-white w-full scale-x-110 scale-y-105 p-2"
            >
              Requests Analysis
            </h2>
          }
          data={requests_statics}
          columns={columns}
          // selectableRows
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          striped
          highlightOnHover
          // onRowClicked={(e) => {
          //   console.log(`${e.request.method}`);
          // }}
          // onChangePage={(page, totalRows) => {
          //   // fetchMsc(page);
          //   console.log(`fetching page ${page} - ${totalRows}`);
          // }}
          // onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          //   console.log(
          //     `change page size page ${currentRowsPerPage} - ${currentPage}`
          //   );
          // }}
        />
      </div>
    </div>
  );
}

export default Analysis;
