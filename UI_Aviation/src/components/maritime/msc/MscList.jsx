import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataTable from "react-data-table-component";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdDocumentScanner,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MscEdit from "./MscEdit";
import MscDelete from "./MscDelete";
import {
  mscFormDataAssign,
  openMscDelete,
  openMscEdit,
} from "../../../store/maritime/msc/MscActionSlice";
import { Toast } from "primereact/toast";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import axios from "axios";
import { configData } from "../../../config";
import {
  updateSelectRows,
  resetSelectRows,
} from "../../../store/maritime/SelectRowsSlice";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";

function MscList() {
  const [vessels, setVessel] = useState([]);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.msc_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.msc_action
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
  //       const data = await PortService.getAllPorts();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  //   setVessel((prev) => VESSELS);
  // }, []);

  const fetchMsc = async (page) => {
    try {
      setLoading(true);
      const response = await MscService.getAllMsc(access_token);

      setVessel((prev) => response);
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

  // const handlePageChange = (page) => {
  //   fetchMsc(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   const response = await MscService.getMscByPage(page, access_token);
  //   setVessel((prev) => response);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchMsc(1); // fetch page 1 of users
  }, [access_token]);

  useEffect(() => {
    setFilteredVessels(vessels);
  }, [vessels]);

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
      mscFormDataAssign({
        id: row.id || 0,
        ship_type: row.ship_type || "",
        flag_name: row.flag_name || "",
        alpha_twocode: row.alpha_twocode || "",
        source_name: row.source_name || "",
        imo: row.imo || 0,
        mmsi: row.mmsi || 0,
        callsign: row.callsign || "",
        ship_name: row.ship_name || "",
        years_of_build: row.years_of_build || 0,
        width: row.width || 0.0,
        length: row.length || 0.0,
        deadweight: row.deadweight || 0.0,
        gross_tonnage: row.gross_tonnage || 0,
        images: row.images || "",
      })
    );
  };

  const handleDeleteButtonClick = (row) => {
    dispatch(openMscDelete());
    assignFormRowData(row);
  };

  const deleteRow = (orgId) => {
    const updatedVessels = filteredVessels.filter((org) => org.id !== orgId);
    setFilteredVessels(updatedVessels);
  };

  const handleEditButtonClick = (row) => {
    dispatch(openMscEdit());
    assignFormRowData(row);
  };

  const updateRow = (updatedVessel) => {
    const updatedVessels = filteredVessels.map((vessel) => {
      if (vessel.id === updatedVessel.id) {
        return updatedVessel;
      } else {
        return vessel;
      }
    });
    setFilteredVessels(updatedVessels);
  };

  const handleDetailButtonClicked = (row) => {
    assignFormRowData(row);
  };

  useEffect(() => {
    const fp = vessels
      .filter((vessel) => {
        const nameFilter = filter.name ? filter.name.toLowerCase() : "";
        const imoFilter = filter.imo ? filter.imo.toLowerCase() : "";
        const mmsiFilter = filter.mmsi ? filter.mmsi.toLowerCase() : "";
        const callsignFilter = filter.callsign
          ? filter.callsign.toLowerCase()
          : "";
        const typeFilter = filter.type ? filter.type.toLowerCase() : "";
        const flagFilter = filter.flag ? filter.flag.toLowerCase() : "";

        return (
          (!nameFilter ||
            vessel.ship_name?.toLowerCase().includes(nameFilter)) &&
          (!imoFilter ||
            vessel.imo?.toString().toLowerCase().includes(imoFilter)) &&
          (!mmsiFilter ||
            vessel.mmsi?.toString().toLowerCase().includes(mmsiFilter)) &&
          (!filter.callsign ||
            vessel.callsign?.toLowerCase().includes(callsignFilter)) &&
          (!typeFilter ||
            vessel.ship_type?.toLowerCase().includes(typeFilter)) &&
          (!flagFilter || vessel.flag_name?.toLowerCase().includes(flagFilter))
        );
      })
      .sort((a, b) => b.id - a.id);
    setFilteredVessels(fp);
  }, [filter, vessels]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row?.ship_name,
        sortable: true,
        // grow: 1,
        width: "200px",
      },
      {
        name: "Imo",
        selector: (row) => row?.imo,
        sortable: true,
        width: "100px",
        hide: "sm",
      },
      {
        name: "Type",
        selector: (row) => row?.ship_type,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
      },
      {
        name: "Flag",
        selector: (row) => row?.flag_name,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
      },
      {
        name: "Mmsi",
        selector: (row) => row?.mmsi,
        sortable: true,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Callsign",
        selector: (row) => row?.callsign,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Gross Tonnage",
        selector: (row) => row?.gross_tonnage,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Dwt",
        selector: (row) => row?.deadweight,
        // sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Length",
        selector: (row) => row?.length,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
        // right: true,
      },
      {
        name: "Width",
        selector: (row) => row?.width,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "100px",
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
                // className="icon"
                // style={{
                //   position: "relative",
                //   top: "0px",
                //   right: "0px",
                // }}
                onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
              ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            )}
            <Link
              to={`/msc/ship/details/${row.id}`}
              onClick={() => {
                handleDetailButtonClicked(row);
              }}
            >
              <MdDocumentScanner
                // onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 p-1
                ring-1 ring-blue-400 hover:ring-2 text-blue-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
            </Link>
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
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <div className="flex gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      <pre className="w-full md:w-3/6 text-sm whitespace-pre-wrap align-items-center justify-content-center">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  return (
    <div id="msc_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
          bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Vessels
          </h2>
        }
        data={filteredVessels}
        progressPending={loading}
        columns={columns}
        selectableRows
        onSelectedRowsChange={handleChange}
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        // onChangePage={(page) => {
        //   fetchMsc(page);
        //   console.log(`fetching page ${page}`);
        // }}
        striped
        highlightOnHover
        // expandableRows
        // expandOnRowDoubleClicked
        //   expandOnRowClicked
        //   expandableRowsHideExpander
        // expandableRowsComponent={ExpandedComponent}
        subHeader
        /*  subHeaderComponent={
          <div className="font-semibold">
            The Merchant Ships Characteristics (MSC) Application
          </div>
        } */
        subHeaderAlign="center"
        // onRowClicked={(e) => {
        //   console.log(`${e.ship_name}`);
        // }}
      ></DataTable>
      {isEditVisible && <MscEdit updateRow={updateRow}></MscEdit>}
      {isDeleteVisible && (
        <MscDelete deleteRow={deleteRow} showMessage={showMessage}></MscDelete>
      )}
    </div>
  );
}

export default MscList;
