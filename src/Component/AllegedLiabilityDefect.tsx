
import React, { useEffect, useState,memo } from 'react';
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
  ForeignKey,
} from '@syncfusion/ej2-react-grids';
import { connect } from 'react-redux'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import moment from 'moment';
const { REACT_APP_BASE_URL,REACT_APP_DATE_FORMAT } = process.env;

function AllegedLiabilityDefect(props: any) {

  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/AllegedLiabilityDefect`,
    insertUrl: `${REACT_APP_BASE_URL}/AllegedLiabilityDefect`,
    updateUrl: `${REACT_APP_BASE_URL}/AllegedLiabilityDefect`,
    removeUrl: `${REACT_APP_BASE_URL}/AllegedLiabilityDefect`,
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
  // const gridTemplateCreated = (data: any) => {

  //   return (<div>
  //     <p >{moment(data?.Created).format(REACT_APP_DATE_FORMAT)}</p>
  //   </div>);
  // };

  // const gridTemplateModified = (data: any) => {

  //   return (<div>
  //     <p >{moment(data?.Modified).format(REACT_APP_DATE_FORMAT)}</p>
  //   </div>);
  // };

  return (
    <div className="bg-[#EDEDED] ">
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
            field="Title"
            headerText="Title"
            width="140"
          ></ColumnDirective>
          <ColumnDirective
            field="IsActive"
            headerText="Status"
            width="30"
            displayAsCheckBox={true}
            editType="booleanedit"
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
            Resize,
          ]}
        />

      </GridComponent>

    </div>
  );
}


export default AllegedLiabilityDefect
