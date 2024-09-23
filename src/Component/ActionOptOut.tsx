
import React, { useEffect, useState, memo } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Filter,
  Sort,
  Resize,
  Edit,
  Toolbar,
  PdfExport,
  ExcelExport,
  ColumnChooser,
  ForeignKey
} from '@syncfusion/ej2-react-grids';
import { connect } from 'react-redux'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import moment from 'moment';
const { REACT_APP_BASE_URL, REACT_APP_DATE_FORMAT } = process.env;

function ActionOptOut(props: any) {

  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'LastName', direction: 'Ascending' }] };
  
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/classactionoptout`,
    insertUrl: `${REACT_APP_BASE_URL}/classactionoptout`,
    updateUrl: `${REACT_APP_BASE_URL}/classactionoptout`,
    removeUrl: `${REACT_APP_BASE_URL}/classactionoptout`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const vehiclemodelFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/vehiclemodel`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  let gridInstance: any;

  const toolBarOptions = [
    'Add',
    'Edit',
    'Delete',
    'Update',
    'Cancel',
    'ExcelExport',
    'ColumnChooser',
    "Search"
  ]

  const filterOptions: any = {
    type: 'Menu'
  }


  const toolbarClick = (args: any) => {
    if (gridInstance) {
      if (args.item.id.includes('excelexport')) {
        gridInstance.excelExport({
          fileName: 'demoData.xlsx'
        });
      }
    }
  }


  return (
    <div className="bg-[#EDEDED] ">
      <div className="bg-white py-3 px-3 drop-shadow-xl">
      <h1 className='ml-3 text-lg'>Class Action Opt Out</h1>
    </div>
      <GridComponent
        ref={grid => gridInstance = grid}
        dataSource={dataFromApi}
        allowPaging={true}
        allowResizing={true}
        pageSettings={pageOptions}
        allowFiltering={true}
        allowSorting={true}
        sortSettings={sortingOptions}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: props?.tab === "Law Firm" ? 'Dialog' : 'Normal'
        }}
        showColumnChooser={true}
        toolbar={toolBarOptions}
        filterSettings={filterOptions}
        allowPdfExport={true}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="Id"
            headerText="Id"
            width="140"
            visible={false}
            isPrimaryKey={true}
          ></ColumnDirective>
          <ColumnDirective
            field="LastName"
            headerText="Last Name"
            width="140"
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="FirstName"
            headerText="First Name"
            width="140"
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="VehicleVinNo"
            headerText="VIN"
            width="140"
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="VehicleYear"
            headerText="Model Year"
            width="140"
            type="number"
          ></ColumnDirective>
          
          <ColumnDirective
            field="VehicleModelId"
            headerText="Model"
            width="160"
            type="string"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={vehiclemodelFromApi}
          ></ColumnDirective>
          <ColumnDirective
            field="IsActive"
            headerText="Status"
            width="100"
            displayAsCheckBox={true}
            editType="booleanedit"
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Created"
            headerText="Created"
            width="160"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="CreatedBy"
            headerText="Created By"
            width="160"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Modified"
            headerText="Modified"
            width="160"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="ModifiedBy"
            headerText="Modified By"
            width="160"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Filter,
            Sort,
            Edit,
            Toolbar,
            PdfExport,
            ExcelExport,
            ColumnChooser,
            ForeignKey,
            Resize
          ]}
        />

      </GridComponent>
    </div>
  );
}


export default ActionOptOut
