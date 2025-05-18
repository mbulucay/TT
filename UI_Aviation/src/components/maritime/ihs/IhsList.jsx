import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSelectRows,
  resetSelectRows,
} from "../../../store/maritime/SelectRowsSlice";
import axios from "axios";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import { PersonService } from "../../../api/services/maritime/person/PersonService";
import { ObjectUtils } from "primereact/utils";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function IhsList() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );
  const { selectedRows } = useSelector((state) => state.select_rows);

  useEffect(() => {
  }, [selectedRows]);

  const handleChange = useCallback((state) => {
    dispatch(updateSelectRows(state.selectedRows));
  }, []);

  const fetchIhsData = async (page) => {
    try {
      setLoading(true);
      const org_response =
        await OrganizationService.getAllOrganizations(access_token);
      const prs_response = await PersonService.getAllPersons(access_token);

      const org_data = org_response;
      const prs_data = prs_response;

      // assign random table_id to each row
      org_data.forEach((row) => {
        const r1 = Math.random() * 100000;
        const r2 = Math.random() * 100000;
        row.table_id = Math.floor(r1 + r2);
      });
      prs_data.forEach((row) => {
        const r1 = Math.random() * 100000;
        const r2 = Math.random() * 100000;
        row.table_id = Math.floor(r1 + r2);
      });

      const data = org_data.concat(prs_data);
      setData((prev) => data);
      setLoading(false);
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
        console.error("An error occurred during msclistget:", error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIhsData(1); // fetch page 1 of users
  }, [access_token]);

  /*   const columns = useMemo(
    () = [
        {name: "Ihs Data",
        selector: "id",
        sortable: true,
        cell: (row) => <div>{row.id}</div>},
    ], []
    ); */

  const columns = useMemo(
    () => [
      {
        name: "Ihs Data",
        selector: (row) => row.table_id,
        sortable: true,
        cell: (row) => (
          <div className="flex justify-between content-center ml-4">
            <div className="grid grid-cols-5 ">
              {Object.keys(row).map((key) => {
                if (key !== "id" && key !== "table_id") {
                  return (
                    <div key={key} className="w-72 ">
                      <span className="font-semibold">{key}: </span>
                      <span>{row[key]}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
          </div>
        ),
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  return (
    <div id="ihs_datatable">
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
            bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            IHS / Llyods
          </h2>
        }
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<h2>Loading...</h2>}
        pagination
        // paginationServer
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
        }}
        onChangePage={(page) => {
          fetchIhsData(page);
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          setPerPage(currentRowsPerPage);
          fetchIhsData(currentPage);
        }}
        // selectableRows
        onSelectedRowsChange={handleChange}
        selectableRowsComponentProps={{
          selectableRows: true,
          // selectableRowsHeader: false,
        }}
        // expandableRows
        // expandableRowsComponent={ExpandedComponent}
        striped
        highlightOnHover
      />
    </div>
  );
}

export default IhsList;
