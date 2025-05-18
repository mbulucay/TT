import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { OrganizationService } from "../../../api/services/maritime/organization/OrganizationService";
import OrganizationEdit from "./OrganizationEdit";
import OrganizationDelete from "./OrganizationDelete";
import { useSelector, useDispatch } from "react-redux";
import {
  openOrganizationDelete,
  openOrganizationEdit,
  organizationFormDataAssign,
} from "../../../store/maritime/organizations/OrganizationActionSlice";
import { Toast } from "primereact/toast";
import { updateSelectRows } from "../../../store/maritime/SelectRowsSlice";
import { IoBusinessSharp } from "react-icons/io5";
import Card from "../shared/Card";

function PortList() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.organizations_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.organization_action
  );

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );

  const { selectedRows } = useSelector((state) => state.select_rows);

  useEffect(() => {
  }, [selectedRows]);

  const handleChange = useCallback((state) => {
    dispatch(updateSelectRows(state.selectedRows));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await OrganizationService.getAllOrganizations();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  //   setOrganizations((prev) => ORGANIZATIONS);
  //   // setFilteredPorts(ports);
  // }, []);

  const fetchOrganizations = async (page) => {
    try {
      setLoading(true);
      const response =
        await OrganizationService.getAllOrganizations(access_token);
      setOrganizations((prev) => response);
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
        // fetchOrganizations(page);
      } else {
        console.error("An error occurred during msclistget:", error.message);
      }
      setLoading(false);
    }
  };

  /* 	const handlePageChange = page => {
		fetchOrganizations(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	}; */

  // useEffect(() => {
  //   fetchOrganizations(1); // fetch page 1 of users
  // }, [access_token]);

  useEffect(() => {
    fetchOrganizations(1); // fetch page 1 of users
  }, [access_token]);

  useEffect(() => {
    setFilteredOrganizations(organizations);
  }, [organizations]);

  const showMessage = (event, severity, label) => {
    toastBottomCenter.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  };

  const assignFormRowData = (row) => {
    dispatch(
      organizationFormDataAssign({
        id: row.id || 0,
        companyName: row.companyName || "",
        country_name: row.country_name || "",
        companyImo: row.companyImo || 0,
        headquarters: row.headquarters || "",
        number_of_employees: row.number_of_employees || 0,
        postal_code: row.postal_code || "",
        mail: row.mail || "",
        website: row.website || "",
        telephone: row.telephone || "",
        address: row.address || "",
        typeof_organization: row.typeof_organization || "",
        activity_areas: row.activity_areas || "",
      })
    );
  };

  const handleDeleteButtonClick = (row) => {
    // eslint-disable-next-line no-console
    dispatch(openOrganizationDelete());
    assignFormRowData(row);
  };

  const deleteRow = (orgId) => {
    const updatedOrganizations = filteredOrganizations.filter(
      (org) => org.id !== orgId
    );
    setFilteredOrganizations(updatedOrganizations);
  };

  const handleEditButtonClick = (row) => {
    dispatch(openOrganizationEdit());
    assignFormRowData(row);
  };

  const updateRow = (updatedOrg) => {
    const updatedOrganizations = filteredOrganizations.map((org) => {
      if (org.id === updatedOrg.id) {
        return updatedOrg;
      } else {
        return org;
      }
    });
    setFilteredOrganizations(updatedOrganizations);
  };

  useEffect(() => {
    // Define filter function
    const fp = organizations
      .filter((organization) => {
        const nameFilter = (filter.name || "").toLowerCase();
        const countryFilter = (filter.country || "").toLowerCase();
        const postcodeFilter = (filter.postcode || "").toLowerCase();
        const imoFilter = (filter.imo || "").toLowerCase();

        return (
          (!nameFilter ||
            organization.companyName?.toLowerCase().includes(nameFilter)) &&
          (!countryFilter ||
            organization.country_name?.toLowerCase().includes(countryFilter)) &&
          (!postcodeFilter ||
            organization.postal_code
              ?.toString()
              .toLowerCase()
              .includes(postcodeFilter)) &&
          (!imoFilter ||
            organization.companyImo
              ?.toString()
              .toLowerCase()
              .includes(imoFilter))
        );
      })
      .sort((a, b) => b.id - a.id);
    setFilteredOrganizations(fp);
  }, [filter, organizations]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.companyName,
        sortable: true,
        // grow: 1,
        width: "200px",
      },
      {
        name: "Country",
        selector: (row) => row.country_name,
        sortable: true,
        // grow: -3,
        hide: "sm",
        width: "150px",
      },
      {
        name: "Addr",
        selector: (row) => row.address,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "200px",
      },
      {
        name: "Postal Code",
        selector: (row) => row.postal_code,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
      },
      {
        name: "Tel",
        selector: (row) => row.telephone,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
      },
      {
        name: "Imo",
        selector: (row) => row.companyImo,
        sortable: true,
        // grow: 1,
        hide: "sm",
        width: "100px",
        // right: true,
      },
      {
        name: "# of Employees",
        selector: (row) => row.number_of_employees,
        sortable: true,
        // grow: 1,
        hide: "sm",
        width: "100px",
        // right: true,
      },
      {
        name: "Activity Areas",
        selector: (row) => row.activity_areas,
        sortable: true,
        grow: 3,
        hide: "sm",
        width: "200px",
        // right: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-4">
            {role === "ADMIN" && (
              <MdOutlineModeEdit
                // className="icon"
                // style={{
                //   position: "relative",
                //   top: "0px",
                //   right: "0px",
                // }}
                onClick={() => handleEditButtonClick(row)}
                className=" bg-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 p-1
              ring-1 ring-green-400 hover:ring-2 text-green-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )}
            {role === "ADMIN" && (
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
              ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )}
          </div>
        ),
        ignoreRowClick: false,
        // allowOverflow: true,
        // button: true,
        hide: "md",
        width: "250px",
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    <div className="flex items-center gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <div className="w-fit md:w-2/6 text-sm whitespace-div-wrap justify-content-center">
        <Card
          header={"Company Information"}
          data={{
            company_name: `${data.companyName} - ${data.companyImo}`,

            mail: data.mail,
            telephone: data.telephone,
            website: data.website,
            postal_code: data.postal_code,
            headquarters: data.headquarters,
            address: data.address,
          }}
        />
      </div>
      <div className="flex-col justify-between divide-blue-950 h-80 w-full md:w-3/6 bg-blue-200 rounded-3xl drop-shadow-xl mt-2 ">
        <div className="w-full h-1/6 bg-blue-500 rounded-t-3xl shadow-black drop-shadow-lg">
          <div className="font-bold text-4xl text-center py-1 font-sans drop-shadow-lg">
            {data.name}
          </div>
        </div>

        <div className="h-3/4 flex justify-between m-3 ">
          <div className="flex justify-center items-center overflow-hidden h-full w-2/6 bg-white rounded-full ring-4 ml-4">
            <IoBusinessSharp fontSize={256} />
          </div>
          <div className="h-full w-1/2 bg-blue-500/50 rounded-2xl mr-5 z-10">
            <p className="p-3">Company details. (Who are we?)</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="organization_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>

      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
          bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Organizations
          </h2>
        }
        data={filteredOrganizations}
        progressPending={loading}
        columns={columns}
        selectableRows
        onSelectedRowsChange={handleChange}
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        // onChangePage={(page) => {
        //   console.log("asd", page);
        // }}
        striped
        highlightOnHover
        expandableRows
        expandOnRowDoubleClicked
        //   expandOnRowClicked
        //   expandableRowsHideExpander
        expandableRowsComponent={ExpandedComponent}
        subHeader
        /* subHeaderComponent={
          <div className="font-semibold">
            The Maritime Organizations Application enables operators to access
            information about maritime organizations in order to support
            enhanced Maritime Situational Awareness.
          </div>
        } */
        subHeaderAlign="center"
        // onRowClicked={(row) => {
        //   console.log(`${row.companyName}`);
        // }}
      ></DataTable>

      {isEditVisible && <OrganizationEdit updateRow={updateRow} />}
      {isDeleteVisible && (
        <OrganizationDelete deleteRow={deleteRow} showMessage={showMessage} />
      )}
    </div>
  );
}

export default PortList;
