import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AuthService } from "../../../api/auth/auth";
import { authDataAssign } from "../../../store/user/authSlice";
// import DataTable from "react-data-table-component";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
// import { LocationService } from "../../../api/services/tt/location/LocationService";
// import LocationEdit from "./LocationEdit";
// import LocationDelete from "./LocationDelete";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   openLocationDelete,
//   openLocationEdit,
//   locationFormDataAssign,
// } from "../../../store/tt/locations/LocationActionSlice";
import { Toast } from "primereact/toast";
// import { updateSelectRows } from "../../../store/tt/SelectRowsSlice";
import { FaLocationDot } from "react-icons/fa6";
// import Card from "../../shared/Card";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { FaSearch } from 'react-icons/fa';
import { FaFilterCircleXmark } from "react-icons/fa6";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);
  const [expandedRows, setExpandedRows] = useState(null);

  const [filter, setFilter] = useState({
    name: "",
    country: "",
    type: "",
    code: "",
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const handleChange = useCallback((state) => {
    // dispatch(updateSelectRows(state.selectedRows));
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
      setLoading(false);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleEditButtonClick = (row) => {
    console.log(row);
  };

  const handleDeleteButtonClick = (row) => {
    console.log(row);
  };

  // ... Rest of the component implementation similar to OrganizationList
  // Including columns definition, filter logic, and render methods

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px",
      },
      {
        name: "Country",
        selector: (row) => row.country,
        sortable: true,
        hide: "sm",
        width: "150px",
      },
      {
        name: "City",
        selector: (row) => row.city,
        sortable: true,
        width: "150px",
      },
      {
        name: "Location Code",
        selector: (row) => row.locationCode,
        sortable: true,
        width: "150px",
      },
      {
        cell: (row) => (
          <div className="flex gap-4">
              <MdOutlineModeEdit
                onClick={() => handleEditButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 p-1
                ring-1 ring-green-400 hover:ring-2 text-green-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteButtonClick(row)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
                ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
          </div>
        ),
        ignoreRowClick: false,
        hide: "md",
        width: "250px",
      },
    ],
    []
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    setGlobalFilterValue('');
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <Button 
          type="button" 
          icon={<FaFilterCircleXmark className="mr-2" />}
          label="Clear" 
          outlined 
          onClick={clearFilter} 
        />
        
        <span className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <InputText 
            value={globalFilterValue} 
            onChange={onGlobalFilterChange} 
            placeholder="Keyword Search" 
            className="pl-9"
          />
        </span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <MdOutlineModeEdit
                onClick={() => handleEditButtonClick(rowData)}
                className="bg-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 p-1
                ring-1 ring-green-400 hover:ring-2 text-green-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
        <MdOutlineDeleteOutline
                onClick={() => handleDeleteButtonClick(rowData)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 p-1
                ring-1 ring-red-400 hover:ring-2 text-red-600 hover:text-white rounded-full hover:scale-110 duration-300 w-10 h-8 text-xl"
              />
      </div>
    );
  };

  const header = renderHeader();

  const onRowExpand = (event) => {
    console.log('Row Expanded:', event.data);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Details for {data.name}</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Address:</strong> {data.address || 'N/A'}</p>
            <p><strong>State/Province:</strong> {data.state || 'N/A'}</p>
            <p><strong>Postal Code:</strong> {data.postalCode || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Timezone:</strong> {data.timezone || 'N/A'}</p>
            <p><strong>Coordinates:</strong> {data.coordinates || 'N/A'}</p>
            <p><strong>Type:</strong> {data.type || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Toast ref={toastBottomCenter} position="bottom-center" />

      <DataTable
        value={locations}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        loading={loading}
        globalFilterFields={['name', 'country', 'type', 'code']}
        header={header}
        emptyMessage="No locations found."
        className="p-datatable-gridlines"
        showGridlines
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowsPerPageOptions={[10, 20, 50]}
        expandedRows={expandedRows}
        onRowExpand={onRowExpand}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander style={{ width: '3em' }} />
        <Column 
          field="name" 
          header="Name" 
          sortable 
          filter 
          filterPlaceholder="Search by name"
          style={{ minWidth: '200px' }}
        />
        <Column 
          field="country" 
          header="Country" 
          sortable 
          filter 
          filterPlaceholder="Search by country"
          style={{ minWidth: '150px' }}
        />
        <Column 
          field="city" 
          header="City" 
          sortable 
          filter 
          filterPlaceholder="Search by city"
          style={{ minWidth: '150px' }} 
        />
        <Column 
          field="locationCode" 
          header="Location Code" 
          sortable 
          filter 
          filterPlaceholder="Search by location code"
          style={{ minWidth: '150px' }}
        />
        <Column 
          body={actionBodyTemplate} 
          exportable={false} 
          style={{ minWidth: '150px' }}
        />
      </DataTable>
    </div>
  );
}

export default LocationList; 