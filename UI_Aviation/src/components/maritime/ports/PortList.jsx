import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataTable from "react-data-table-component";
import { MdMap } from "react-icons/md";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { PortService } from "../../../api/services/maritime/ports/PortService";
import PortEdit from "./PortEdit";
import PortDelete from "./PortDelete";
import PortMap from "./PortMap";
import { useSelector, useDispatch } from "react-redux";
import {
  openPortDelete,
  openPortEdit,
  portFormDataAssign,
} from "../../../store/maritime/ports/PortActionSlice";
import { Toast } from "primereact/toast";
import {
  updateSelectRows,
  resetSelectRows,
} from "../../../store/maritime/SelectRowsSlice";
import Card from "../shared/Card";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function PortList() {
  const [ports, setPorts] = useState([]);
  const [filteredPorts, setFilteredPorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.port_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.port_action
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
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const data = await PortService.getAllPorts();
  //   //     console.log(data);
  //   //   } catch (error) {
  //   //     console.error("Error:", error);
  //   //   }
  //   // };

  //   // fetchData();
  //   setPorts((prev) => PORTS);
  //   // setFilteredPorts(ports);
  // }, []);

  const fetchPorts = async (page) => {
    try {
      setLoading(true);
      const response = await PortService.getAllPorts(access_token);
      setPorts((prev) => response);
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
        console.error("An error occurred during portlistget:", error.message);
      }
      setLoading(false);
    }
  };

  /* 	const handlePageChange = page => {
		fetchPorts(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	}; */

  useEffect(() => {
    fetchPorts(1); // fetch page 1 of users
  }, [access_token]);

  useEffect(() => {
    setFilteredPorts(ports);
  }, [ports]);

  const showMessage = (event, severity, label) => {
    toastBottomCenter.current.show({
      severity: severity,
      summary: label.head,
      detail: label.content,
      life: 2000,
      style: { zIndex: 40 },
    });
  };

  const assignRowData = (row) => {
    dispatch(
      portFormDataAssign({
        id: row.id || 0,
        portname: row.portname || "",
        countryname: row.countryname || "",
        address: row.address || "",
        port_type: row.port_type || "",
        port_size: row.port_size || "",
        countrycode: row.countrycode || "",
        telephone: row.telephone || "",
        terminal: row.terminal || "",
        email: row.email || "",
        port_auth: row.port_auth || "",
        coordinates: row.coordinates || "",
        latitude: row.latitude || 0.0,
        longitude: row.longitude || 0.0,
        unlocode: row.unlocode || "",
        region: row.region || "",
      })
    );
  };

  const handleDeleteButtonClick = (row) => {
    // eslint-disable-next-line no-console
    dispatch(openPortDelete());
    assignRowData(row);
  };

  const handleEditButtonClick = (row) => {
    // setIsEditVisible(!isEditVisible);
    dispatch(openPortEdit());
    assignRowData(row);
  };

  const deleteRow = (orgId) => {
    const updatedPorts = filteredPorts.filter((org) => org.id !== orgId);
    setFilteredPorts(updatedPorts);
  };

  const updateRow = (updatedPort) => {
    const updatedPorts = filteredPorts.map((port) => {
      if (port.id === updatedPort.id) {
        return updatedPort;
      } else {
        return port;
      }
    });
    setFilteredPorts(updatedPorts);
  };

  useEffect(() => {
    // Define filter function
    const filterPorts = (port) => {
      // Convert filter values to lowercase for case-insensitive comparison
      const nameFilter = filter.name ? filter.name.toLowerCase() : "";
      const regionFilter = filter.region ? filter.region.toLowerCase() : "";
      const countryFilter = filter.country ? filter.country.toLowerCase() : "";
      const typeFilter = filter.type ? filter.type.toLowerCase() : "";
      const sizeFilter = filter.size ? filter.size.toLowerCase() : "";

      return (
        (!nameFilter || port.portname?.toLowerCase().includes(nameFilter)) &&
        (!regionFilter || port.region?.toLowerCase().includes(regionFilter)) &&
        (!countryFilter ||
          port.unlocode?.toLowerCase().includes(countryFilter)) &&
        (!typeFilter || port.port_type?.toLowerCase().includes(typeFilter)) &&
        (!sizeFilter || port.port_size?.toLowerCase().includes(sizeFilter))
      );
    };

    const fp = ports.filter(filterPorts).sort((a, b) => b.id - a.id);

    setFilteredPorts(fp);
  }, [filter, ports]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.portname,
        sortable: true,
        // grow: 1,
        width: "200px",
      },
      {
        name: "UN/LOCODE",
        selector: (row) => row.unlocode,
        sortable: true,
        hide: "sm",
        width: "110px",
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
        name: "Auth",
        selector: (row) => row.port_auth,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
      },
      {
        name: "Latitude",
        selector: (row) => row.latitude,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Longitude",
        selector: (row) => row.longitude,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Region",
        selector: (row) => row.region,
        sortable: true,
        // grow: 1,
        hide: "sm",
        width: "120px",
        // right: true,
      },
      {
        name: "Type",
        selector: (row) => row.port_type,
        sortable: true,
        // grow: 1,
        hide: "sm",
        width: "100px",

        // right: true,
      },
      {
        name: "Size",
        selector: (row) => row.port_size,
        sortable: true,
        // grow: 1,
        hide: "sm",
        width: "100px",

        // right: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-4 ">
            {role === "ADMIN" && (
              <MdOutlineModeEdit
                // className="icon"
                // style={{
                //   position: "relative",
                //   top: "0px",
                //   right: "0px",
                // }}
                onClick={() => handleEditButtonClick(row)}
                // onClick={() => {
                //   console.log("aa")
                //   dispatch(openPortEdit(row));
                // }}
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
            {/* <MdMap
              // onClick={() => handleDeleteButtonClick(row)}
              // onClick={()=> ()}
              className="bg-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 p-1
              ring-1 ring-blue-400 hover:ring-2 text-blue-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
            /> */}
          </div>
        ),
        ignoreRowClick: false,
        // allowOverflow: true,
        // button: true,
        hide: "md",
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    <div className="flex items-center gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <div className="w-fit md:w-2/6 text-sm whitespace-div-wrap justify-content-center">
        <Card
          header={"Port Communication"}
          data={{
            unlocode: data.unlocode,
            email: data.email,
            telephone: data.telephone,
            country: `${data.countryname}-${data.countrycode}`,
            region: data.region,
            address: data.address,
          }}
        />
      </div>
      <div className="h-80 w-full md:w-3/6 ring-4 ring-blue-900 bg-gradient-to-r from-blue-400 via-blue-900 to-blue-400 rounded-3xl m-4 flex justify-center items-center">
        <div className="grid h-4/5 w-4/5 bg-black mt-2">
          <PortMap port={data} className="" />
        </div>
      </div>
    </div>
  );

  return (
    <div id="port_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
          bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Ports
          </h2>
        }
        data={filteredPorts}
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
            The World Port Index contains a tabular listing of thousands of
            ports throughout the world (approximately 64,000 entries) describing
            their location, characteristics, known facilities, and available
            services.
            <br /> The table is arranged geographically, with an alphabetical
            index
          </div>
        } */
        subHeaderAlign="center"
        // onRowClicked={(e) => {
        //   console.log(`${e.name}`);
        // }}
      ></DataTable>
      {isEditVisible && <PortEdit updateRow={updateRow} />}
      {isDeleteVisible && (
        <PortDelete deleteRow={deleteRow} showMessage={showMessage} />
      )}
    </div>
  );
}

export default PortList;
