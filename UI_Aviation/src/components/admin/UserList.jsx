import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { UserService } from "../../api/services/user/UserService";
import { FaPowerOff } from "react-icons/fa";
import { DashboardServices } from "../../api/services/dashboard/DashboardServices";
import { MdDocumentScanner } from "react-icons/md";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import UserRequestsTable from "./subcomponents/UserRequestsTable";
import {
  HttpStatusCard200,
  HttpStatusCard400,
  HttpStatusCard403,
  HttpStatusCard404,
} from "./subcomponents/HttpStatusCard";
import { authDataAssign } from "../../store/user/authSlice";
import { AuthService } from "../../api/auth/auth";
import { HttpRequestServices } from "../../api/services/dashboard/HttpRequestServices";

function UserList() {
  const [users, setUsers] = useState([]);
  const [active_users, setActiveUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user_log, setUserLog] = useState({});
  const [count_200, setCount200] = useState(0);
  const [count_400, setCount400] = useState(0);
  const [count_403, setCount403] = useState(0);
  const [count_404, setCount404] = useState(0);

  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.port_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.port_action
  );

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );

  const fetchUserRequestCount = async () => {
    if (!selectedRows || !selectedRows.email) {
      console.log("No valid email selected for fetching user request count.");
      return;
    }

    try {
      const response = await HttpRequestServices.getRequestsCountbyUser(
        access_token,
        selectedRows.email
      );
      setCount200(response["200"] || 0);
      setCount400(response["400"] || 0);
      setCount403(response["403"] || 0);
      setCount404(response["404"] || 0);
    } catch (error) {
      console.error("Failed to fetch user request count:", error.message);
    }
  };

  useEffect(() => {
    fetchUserRequestCount();
  }, [selectedRows]);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const response = await UserService.getUsers(access_token);
      const updatedResponse = response.map((item) => {
        return {
          ...item,
          is_active: isActive(item.email),
        };
      });
      setUsers((prev) => updatedResponse);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access forbidden. Check your credentials or permissions."
        );
      } else {
        console.error("An error occurred during UserListget:", error.message);
      }
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await DashboardServices.getActiveUsers(access_token);
      setActiveUsers((prev) => response);
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
        console.error(
          "An error occurred during Active UserListget:",
          error.message
        );
      }
    }
  };

  const isActive = (email) => {
    return active_users.some((user) => user.email === email);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchActiveUsers();
        await fetchUsers(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [access_token]);

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstname,
      sortable: true,
      // grow: 1,
      width: "200px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      // grow: 1,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      // grow: 1,
      width: "200px",
    },
    {
      name: "Role",
      selector: (row) =>
        row.authorities[0].authority === "ROLE_USER" ? "User" : "Admin",
      sortable: true,
      // grow: 1,
      width: "200px",
    },
    {
      name: "Active",
      // eslint-disable-next-line react/button-has-type
      cell: (row, index, column) => (
        <div
          className="flex justify-center items-center gap-4 
        w-10 h-10 bg-white rounded-full ring-1 ring-black/50 border-2 shadow-lg"
        >
          {isActive(row.email) ? (
            <FaPowerOff fontSize={22} color="green" />
          ) : (
            <FaPowerOff fontSize={22} color="red" />
          )}
        </div>
      ),
      ignoreRowClick: false,
      // allowOverflow: true,
      // button: true,
      hide: "md",
      width: "100px",
    },
    {
      name: "User Log",
      // eslint-disable-next-line react/button-has-type
      cell: (row, index, column) => (
        <MdDocumentScanner
          // className="icon"
          // style={{
          //   position: "relative",
          //   top: "0px",
          //   right: "0px",
          // }}
          // onClick={() => setVisible(true)}
          onClick={() => {
            setUserLog((prev) => row);
            setVisible(true);
            setSelectedRows((prev) => row);
          }}
          className="bg-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 p-1
              ring-1 ring-blue-400 hover:ring-2 text-blue-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
        />
      ),
      ignoreRowClick: false,
      // allowOverflow: true,
      // button: true,
      hide: "md",
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <pre className="w-full md:w-2/6 text-sm whitespace-pre-wrap justify-content-center">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  return (
    <div id="port_datatable">
      <div className="flex flex-col h-full bg-sky-200 px-4 pb-4">
        <div className="flex-grow grid grid-cols-1 bg-sky-400/50 md:grid-cols-1 w-full p-2 mt-2">
          <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
            <Toast ref={toastBottomCenter} position="bottom-center" />
          </div>
          <ConfirmDialog
            group="declarative"
            visible={visible}
            onHide={() => setVisible(false)}
            header="User Log Information"
            icon="pi pi-exclamation-triangle"
            content={({ hide }) => (
              <div className="bg-gradient-to-b from-blue-800 to-white p-4 rounded-3xl">
                <div className="flex justify-around p-4 gap-2 bg-blue-200 rounded-2xl">
                  {/* <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
                {JSON.stringify(user_log, null, 2)}
              </div> */}

                  <div className="flex flex-col justify-center bg-sky-400/50 rounded-lg mt-4 ring-2 ring-blue-600 p-3">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full h-full rounded-3xl">
                      <div className="grid place-content-center p-2 w-full h-28 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-lime-500">
                        <HttpStatusCard200 count={count_200} />
                      </div>
                      <div className="grid place-content-center w-full h-28 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-sky-500">
                        <HttpStatusCard400 count={count_400} />
                      </div>
                      <div className="grid place-content-center w-full h-28 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-amber-400">
                        <HttpStatusCard403 count={count_403} />
                      </div>
                      <div className="grid place-content-center w-full h-28 rounded-2xl hover:scale-105 hover:ring-4 duration-200 ring-white bg-orange-700">
                        <HttpStatusCard404 count={count_404} />
                      </div>
                    </div>
                    <div className="flex-grow grid grid-cols-1 gap-4 md:grid-cols-1 w-full mt-2">
                      <UserRequestsTable
                        row_count={[5]}
                        per_page={5}
                        email={selectedRows.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <Button
                    label="Close"
                    onClick={(e) => hide(e)}
                    text
                    className="p-3 w-8/12 text-primary-50 hover:text-white 
                      border-1 mt-2 border-blue-500/100 rounded-lg text-xl
                      border-white-alpha-30 hover:bg-white-alpha-10 duration-100
                      bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800
                      hover:bg-gradient-to-br focus:shadow-outline focus:outline-none"
                  ></Button>
                </div>
              </div>
            )}
          />

          <DataTable
            title={
              <h2
                className="text-blue-950 font-extrabold text-center rounded-t-lg
            bg-gradient-to-b from-sky-300 to-white w-full scale-x-110 scale-y-105 p-2"
              >
                Users
              </h2>
            }
            data={users}
            progressPending={loading}
            columns={columns}
            // selectableRows
            onSelectedRowsChange={handleChange}
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            onChangePage={(page) => {}}
            striped
            highlightOnHover
            // expandableRows
            // expandOnRowDoubleClicked
            //   expandOnRowClicked
            //   expandableRowsHideExpander
            // expandableRowsComponent={ExpandedComponent}
            /* subHeader
        subHeaderComponent={
          <div className="font-semibold">
            The World Port Index contains a tabular listing of thousands of
            users throughout the world (approximately 64,000 entries) describing
            their location, characteristics, known facilities, and available
            services.
            <br /> The table is arranged geographically, with an alphabetical
            index
          </div>
        } */
            subHeaderAlign="center"
            onRowClicked={(e) => {
              setSelectedRows((prev) => e);
            }}
          ></DataTable>
          {/*   {isEditVisible && <PortEdit updateRow={updateRow} />}
      {isDeleteVisible && (
        <PortDelete deleteRow={deleteRow} showMessage={showMessage} />
      )} */}
        </div>
      </div>
    </div>
  );
}

export default UserList;
