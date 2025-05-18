import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MouService } from "../../../api/services/maritime/mou/MouService";
import MouEdit from "./MouEdit";
import MouDelete from "./MouDelete";
import {
  mouFormDataAssign,
  openMouDelete,
  openMouEdit,
} from "../../../store/maritime/mou/MouActionSlice";
import { Toast } from "primereact/toast";
import {
  updateSelectRows,
  resetSelectRows,
} from "../../../store/maritime/SelectRowsSlice";
import { authDataAssign } from "../../../store/user/authSlice";
import { AuthService } from "../../../api/auth/auth";

function MouList() {
  const [detentions, setDetentions] = useState([]);
  const [filteredDetentions, setFilteredDetentions] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.mou_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.mou_action
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
  //     // try {
  //     //   const data = await PortService.getAllPorts();
  //     //   console.log(data);
  //     // } catch (error) {
  //     //   console.error("Error:", error);
  //     // }
  //   };
  //   fetchData();
  //   setDetentions(Detentions.sort((a, b) => a.imo - b.imo));
  // }, []);

  const fetchPorts = async (page) => {
    try {
      setLoading(true);
      const response = await MouService.getAllMous(access_token);
      setDetentions((prev) => response);
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
    setFilteredDetentions(detentions);
  }, [detentions]);

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
      mouFormDataAssign({
        id: row.id || 0,
        source_name: row.source_name || "",
        company_imo: row.company_imo || 0,
        deatiningauthority: row.deatiningauthority || "",
        placeofinspectionport: row.placeofinspectionport || "",
        vesselImo: row.vesselImo || 0,
        number_of_deficiencies: row.number_of_deficiencies || 0,
        ground_for_detention: row.ground_for_detention || 0,
        agreed_repair_yard: row.agreed_repair_yard || "",
        detention_reason: row.detention_reason || "",
        date_of_detention: row.date_of_detention || "",
        date_of_release: row.date_of_release || "",
        typeofinspection: row.typeofinspection || "",
        vessel_flag: row.vessel_flag || "",
      })
    );
  };

  const handleDeleteButtonClick = (row) => {
    // eslint-disable-next-line no-console

    dispatch(openMouDelete());
    assignRowData(row);
  };

  const handleEditButtonClick = (row) => {
    dispatch(openMouEdit());
    assignRowData(row);
  };

  const deleteRow = (orgId) => {
    const updatedDetentions = filteredDetentions.filter(
      (org) => org.id !== orgId
    );
    setFilteredDetentions(updatedDetentions);
  };

  const updateRow = (updatedDetention) => {
    const updatedDetentions = filteredDetentions.map((detention) => {
      if (detention.id === updatedDetention.id) {
        return updatedDetention;
      } else {
        return detention;
      }
    });
    setFilteredDetentions(updatedDetentions);
  };

  useEffect(() => {
    const fp = detentions
      .filter((detention) => {
        const imoFilter = (filter["imo"] || "").toLowerCase();
        const flagFilter = (filter["flag"] || "").toLowerCase();
        const startDateFilter = filter["start_date"] || null;
        const endDate = filter["end_date"] || null;

        // Use optional chaining to safely access properties
        return (
          (!imoFilter ||
            detention.vesselImo
              ?.toString()
              .toLowerCase()
              .includes(imoFilter)) &&
          (!flagFilter ||
            detention.vessel_flag?.toLowerCase().includes(flagFilter)) &&
          (startDateFilter === null ||
            endDate === null ||
            isDateInRange(
              detention.date_of_detention,
              startDateFilter,
              endDate
            ))
        );
      })
      .sort((a, b) => b.id - a.id);

    setFilteredDetentions(fp);
  }, [filter, detentions]);

  function isDateInRange(dateString, s_date, e_date) {
    const date = new Date(dateString);
    const startDate = new Date(s_date);
    const endDate = new Date(e_date);

    return (
      (startDate === null || date >= startDate) &&
      (endDate === null || date <= endDate)
    );
  }

  const columns = useMemo(
    () => [
      {
        name: "IMO",
        selector: (row) => row.vesselImo,
        sortable: true,
        // grow: 1,
        hide: "sm",
      },
      {
        name: "Flag",
        selector: (row) => row.vessel_flag,
        sortable: true,
        // grow: 1,
        hide: "md",
      },
      {
        name: "Inspection Port",
        selector: (row) => row.placeofinspectionport,
        sortable: true,
        // grow: 1,
        hide: "sm",
      },
      {
        name: "Inspection Type",
        selector: (row) => row.typeofinspection,
        sortable: true,
        // grow: 1,
        hide: "sm",
      },
      {
        name: "Detention Date",
        selector: (row) => row.date_of_detention,
        sortable: true,
        // grow: 1,
        hide: "md",
      },
      {
        name: "Release Date",
        selector: (row) => row.date_of_release,
        sortable: true,
        // grow: 1,
        hide: "md",
        // right: true,
      },
      {
        name: "Detention Reason",
        selector: (row) => row.detention_reason,
        // sortable: true,
        // grow: 1,
        hide: "md",
        // right: true,
      },
      {
        name: "Number of Detentions",
        selector: (row) => row.number_of_deficiencies,
        sortable: true,
        // grow: 1,
        hide: "md",
        // right: true,
      },
      {
        name: "Detention Ground",
        selector: (row) => row.ground_for_detention,
        sortable: true,
        // grow: 1,
        hide: "md",
        // right: true,
      },
      {
        name: "Repair Yard",
        selector: (row) => row.agreed_repair_yard,
        sortable: true,
        // grow: 1,
        hide: "md",
        // right: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-2">
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
        ignoreRowClick: true,
        // allowOverflow: true,
        // button: true,
        hide: "md",
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <div className="bg-blue-100 p-4 rounded-md shadow-md">
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
      {/* Add your custom styling and content here */}
    </div>
  );

  return (
    <div id="port_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>{" "}
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
          bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            MOU Detentions
          </h2>
        }
        data={filteredDetentions}
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
        // expandableRows
        // expandOnRowDoubleClicked
        //   expandOnRowClicked
        // expandableRowsHideExpander
        // expandableRowsComponent={ExpandedComponent}
        subHeader
        /* subHeaderComponent={
          <div className="font-semibold">
            The Memorandum of Understanding (MOU) Detention Lists Application
            enables operators to access, process and manage current and
            historical information about banned and detained vessels
          </div>
        } */
        subHeaderAlign="center"
        // onRowClicked={(e) => {
        //   console.log(`${e.name}`);
        // }}
      ></DataTable>
      {isEditVisible && <MouEdit updateRow={updateRow} />}
      {isDeleteVisible && (
        <MouDelete deleteRow={deleteRow} showMessage={showMessage} />
      )}
    </div>
  );
}

export default MouList;
