import React from "react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import {
  openPersonDelete,
  openPersonEdit,
  personFormDataAssign,
} from "../../../store/maritime/person/PersonActionSlice";
import PersonEdit from "./PersonEdit";
import PersonDelete from "./PersonDelete";
import { Toast } from "primereact/toast";
import { PersonService } from "../../../api/services/maritime/person/PersonService";
import { updateSelectRows } from "../../../store/maritime/SelectRowsSlice";
import { IoMdPerson } from "react-icons/io";
import Card from "../shared/Card";
import { authDataAssign } from "../../../store/user/authSlice";
import { AuthService } from "../../../api/auth/auth";

function PersonList() {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.person_filter);
  const { isEditVisible, isDeleteVisible } = useSelector(
    (state) => state.person_action
  );

  const { selectedRows } = useSelector((state) => state.select_rows);

  useEffect(() => {
  }, [selectedRows]);

  const handleChange = useCallback((state) => {
    dispatch(updateSelectRows(state.selectedRows));
  }, []);

  const { access_token, refresh_token, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
  }, [selectedRows]);

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
  //   setPersons((prev) => PERSONS);
  //   // setFilteredPorts(ports);
  // }, []);

  const fetchPersons = async (page) => {
    try {
      setLoading(true);
      const response = await PersonService.getAllPersons(access_token);
      setPersons((prev) => response);
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
        console.error("An error occurred during personlistget:", error.message);
      }
      setLoading(false);
    }
  };

  /* 	const handlePageChange = page => {
		fetchPersons(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	}; */

  useEffect(() => {
    fetchPersons(1); // fetch page 1 of users
  }, [access_token]);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

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
      personFormDataAssign({
        id: row.id || 0,
        person_name: row.person_name || "",
        gender: row.gender || "",
        age: row.age || 0,
        country_name: row.country_name || "",
        person_surname: row.person_surname || "",
        identificationNumber: row.identificationNumber || 0,
        job: row.job || "",
      })
    );
  };

  const handleDeleteButtonClick = (row) => {
    dispatch(openPersonDelete());
    assignRowData(row);
  };

  const handleEditButtonClick = (row) => {
    dispatch(openPersonEdit());
    assignRowData(row);
  };

  const deleteRow = (personId) => {
    const updatedPersons = filteredPersons.filter(
      (person) => person.id !== personId
    );
    setFilteredPersons(updatedPersons);
  };

  const updateRow = (updatedPerson) => {
    const updatedPersons = filteredPersons.map((port) => {
      if (port.id === updatedPerson.id) {
        return updatedPerson;
      } else {
        return port;
      }
    });
    setFilteredPersons(updatedPersons);
  };

  useEffect(() => {
    // Define filter function
    const filterPersons = (row) => {
      // Convert filter values to lowercase for case-insensitive comparison
      const nameFilter = filter.name ? filter.name.toLowerCase() : "";
      const genderFilter = filter.gender ? filter.gender.toLowerCase() : "";
      const ageFilter = filter.age ? filter.age.toString() : "";
      const countryFilter = filter.country ? filter.country.toLowerCase() : "";
      const surnameFilter = filter.surname ? filter.surname.toLowerCase() : "";

      const jobFilter = filter.job ? filter.job.toLowerCase() : "";

      return (
        (!nameFilter || row.person_name?.toLowerCase().includes(nameFilter)) &&
        (!genderFilter || row.gender?.toLowerCase().includes(genderFilter)) &&
        (!ageFilter || row.age.toString() === ageFilter) &&
        (!countryFilter ||
          row.country_name?.toLowerCase().includes(countryFilter)) &&
        (!surnameFilter ||
          row.person_surname?.toLowerCase().includes(surnameFilter)) &&
        (!jobFilter || row.job?.toLowerCase().includes(jobFilter))
      );
    };

    const fp = persons.filter(filterPersons).sort((a, b) => b.id - a.id);

    setFilteredPersons(fp);
  }, [filter, persons]);

  const columns = useMemo(
    () => [
      {
        name: "Id num",
        selector: (row) => row.identificationNumber,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
        // right: true,
      },
      {
        name: "Name",
        selector: (row) => row.person_name,
        sortable: true,
        // grow: 1,
        width: "200px",
      },
      {
        name: "Surname",
        selector: (row) => row.person_surname,
        sortable: true,
        hide: "sm",
        // grow: 1,
        width: "200px",
      },
      {
        name: "Gender",
        selector: (row) => row.gender,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
        // right: true,
      },
      {
        name: "Job",
        selector: (row) => row.job,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
        // right: true,
      },
      {
        name: "Age",
        selector: (row) => row.age,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
        // right: true,
      },
      {
        name: "Country",
        selector: (row) => row.country_name,
        sortable: true,
        // grow: 1,
        hide: "md",
        width: "150px",
        // right: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row, index, column) => (
          <div className="flex gap-4 -translate-x-26">
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
      },
    ],
    []
  );

  const ExpandedComponent = ({ data }) => (
    <div className="flex justify-center gap-20 bg-blue-100 p-4 rounded-md shadow-md">
      {/* <pre className="w-full md:w-2/6 text-sm whitespace-pre-wrap align-items-center justify-content-center">
        {JSON.stringify(data, null, 2)}
      </pre> */}
      <div className="flex-col justify-between divide-blue-950 h-96 w-full md:w-3/6 bg-blue-200 rounded-3xl drop-shadow-xl mt-2 ">
        <div className="w-full h-1/6 bg-blue-500 rounded-t-3xl shadow-black drop-shadow-lg">
          <div className="font-bold text-4xl text-center py-1 font-sans drop-shadow-lg">
            {data.person_name} {data.person_surname}
          </div>
        </div>

        <div className="h-3/4 flex justify-between m-3 ">
          <div className="flex justify-center items-center overflow-hidden h-full w-2/6 bg-white rounded-full ring-4 ml-4">
            <IoMdPerson fontSize={512} />
          </div>
          <div className="h-fit w-1/2 mr-5 z-10">
            <Card
              header={"Id Card"}
              data={{
                id: data.identificationNumber,
                name: data.person_name,
                surname: data.person_surname,
                age: data.age,
                gender: data.gender,
                job: data.job,
                country: data.country_name,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="person_datatable">
      <div className="fixed top-0 left-0 flex align-items-center justify-content-center z-20">
        <Toast ref={toastBottomCenter} position="bottom-center" />
      </div>
      <DataTable
        title={
          <h2
            className="text-blue-950 font-extrabold text-center 
          bg-gradient-to-b from-blue-300 to-white w-full scale-x-105 p-2"
          >
            Persons
          </h2>
        }
        data={filteredPersons}
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
            The Person of Maritime Interest Application enables operators to
            find, annotate, store and disseminate information about people
            related to maritime interests <br /> in order to support enhanced
            Maritime Situational Awareness.
          </div>
        } */
        subHeaderAlign="center"
        // onRowClicked={(e) => {
        //   console.log(`${e.name}`);
        // }}
      ></DataTable>
      {isEditVisible && <PersonEdit updateRow={updateRow} />}
      {isDeleteVisible && (
        <PersonDelete deleteRow={deleteRow} showMessage={showMessage} />
      )}
    </div>
  );
}

export default PersonList;
