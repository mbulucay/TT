import React, { useState, useEffect, useCallback, useRef } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Toast } from "primereact/toast";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { FaFilterCircleXmark } from "react-icons/fa6";
import { TransportationServices } from "../../../api/services/tt/transportation/TransportationServices";

function TransportationList() {
  const [transportations, setTransportations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastBottomCenter = useRef(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    transportationType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'originLocation.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'destinationLocation.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const showError = (message) => {
    toastBottomCenter.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  };

  const showSuccess = (message) => {
    toastBottomCenter.current.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  };

  const handleApiError = (error) => {
    if (error.response?.data?.message) {
      showError(error.response.data.message);
    } else if (error.response?.data?.errors) {
      // Handle validation errors
      const errorMessages = error.response.data.errors
        .map(err => err.defaultMessage)
        .join('\n');
      showError(errorMessages);
    } else {
      showError('An unexpected error occurred');
    }
  };

  const fetchTransportations = async () => {
    try {
      setLoading(true);
      const response = await TransportationServices.getAllTransportations();
      setTransportations(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transportations:", error);
      handleApiError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportations();
  }, []);

  const handleEditButtonClick = (row) => {
    console.log(row);
  };

  const handleDeleteButtonClick = async (row) => {
    try {
      await TransportationServices.deleteTransportation(row.id);
      showSuccess('Transportation deleted successfully');
      fetchTransportations(); // Refresh the list
    } catch (error) {
      console.error("Error deleting transportation:", error);
      handleApiError(error);
    }
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
      transportationType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      'originLocation.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      'destinationLocation.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Details for Transportation #{data.id}</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Origin Location:</strong></p>
            <p>Name: {data.originLocation?.name || 'N/A'}</p>
            <p>City: {data.originLocation?.city || 'N/A'}</p>
            <p>Country: {data.originLocation?.country || 'N/A'}</p>
            <p>Code: {data.originLocation?.locationCode || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Destination Location:</strong></p>
            <p>Name: {data.destinationLocation?.name || 'N/A'}</p>
            <p>City: {data.destinationLocation?.city || 'N/A'}</p>
            <p>Country: {data.destinationLocation?.country || 'N/A'}</p>
            <p>Code: {data.destinationLocation?.locationCode || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <p><strong>Operating Days:</strong> {data.operatingDays?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card bg-blue-100 rounded-b-3xl z-1 shadow-blue-950 shadow-2xl z-2 p-4">
      <Toast ref={toastBottomCenter} position="bottom-center" />

      <DataTable
        value={transportations}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        loading={loading}
        globalFilterFields={['transportationType', 'originLocation.name', 'destinationLocation.name']}
        header={header}
        emptyMessage="No transportation records found."
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
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        selectionMode="multiple"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        expandedRowIcon={<FaChevronDown />}
        expandedRowClassName="bg-blue-50"
        rowClassName="hover:bg-blue-200 duration-300"
        rowHover
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column expander style={{ width: '3em' }} />
        <Column 
          field="transportationType" 
          header="Type" 
          sortable 
          filter 
          filterPlaceholder="Search by type"
          style={{ minWidth: '150px' }}
        />
        <Column 
          field="originLocation.name" 
          header="Origin" 
          sortable 
          filter 
          filterPlaceholder="Search by origin"
          style={{ minWidth: '200px' }}
        />
        <Column 
          field="destinationLocation.name" 
          header="Destination" 
          sortable 
          filter 
          filterPlaceholder="Search by destination"
          style={{ minWidth: '200px' }}
        />
        <Column 
          field="operatingDays" 
          header="# Operating Days" 
          body={(rowData) => rowData.operatingDays?.length || 0}
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

export default TransportationList; 