import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Toast } from "primereact/toast";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { FaSearch } from 'react-icons/fa';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { LocationServices } from "../../../api/services/tt/location/LocationServices";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

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
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    locationCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    postalCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    timezone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    coordinates: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await LocationServices.getAllLocations();
      console.log(response);
      setLocations(response);
      setLoading(false);

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
      city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      locationCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      postalCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      timezone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      coordinates: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      type: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    setGlobalFilterValue('');
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end">
        <Button 
          type="button" 
          icon={<FaFilterCircleXmark />}
          className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded scale-75"
          label="Clear" 
          outlined 
          onClick={clearFilter} 
        />
        
        <span className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <InputText 
            value={globalFilterValue} 
            onChange={onGlobalFilterChange}
            className="text-blue-900 font-bold py-2 px-4 rounded scale-75"
            placeholder="Keyword Search" 
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
    <div className="card bg-blue-100 rounded-b-3xl z-1 shadow-blue-950 shadow-2xl z-2 p-4">
      <Toast ref={toastBottomCenter} position="bottom-center" />
      <DataTable
        value={locations}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        loading={loading}
        globalFilterFields={[
          'name',
          'country',
          'city',
          'locationCode',
          'address',
          'state',
          'postalCode',
          'timezone',
          'coordinates',
          'type'
        ]}
        header={header}
        emptyMessage="No locations found."
        className="overflow-hidden"
        stripedRows
        showGridlines
        pt={{
          header: { className: 'border-none' },
          thead: { className: 'bg-gray-50' },
          tbody: { className: 'border-none' },
          wrapper: { className: 'border rounded-lg shadow-sm' }
        }}
        expandedRows={expandedRows}
        onRowExpand={onRowExpand}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        selectionMode="multiple"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        expandedRowIcon={<FaChevronDown />}
        expandedRowClassName="bg-blue-50"
        rowClassName="hover:bg-blue-200 duration-300"
        rowHover
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