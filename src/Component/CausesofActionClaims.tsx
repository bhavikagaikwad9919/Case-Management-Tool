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
} from "@syncfusion/ej2-react-grids";
import moment from 'moment';
import React from "react";
import "../App.css";

import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
const { REACT_APP_DATE_FORMAT, REACT_APP_BASE_URL } = process.env;

function CausesofActionClaims(props: any) {
  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]}
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
    insertUrl: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
    updateUrl: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
    removeUrl: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });


  let gridInstance: any;

  const toolbarClick = (args: any) => {
    if (gridInstance) {
      if (args.item.id.includes('pdfexport')) {
        gridInstance.pdfExport({
          fileName: 'demoData.pdf'
        });
      }
      else if (args.item.id.includes('excelexport')) {
        gridInstance.excelExport({
          fileName: 'demoData.xlsx'
        });
      }
    }
  }


  const toolBarOptions = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "ExcelExport",
    "ColumnChooser",
    "Search"
  ];

  const filterOptions: any = {
    type: "Menu",
  };

  // const gridTemplateCreated = (data: any) => {
  //   return (<div>
  //   {data?.Created ? <p >{moment(data?.Created).format(REACT_APP_DATE_FORMAT)}</p> : <></> }
  //   </div>);
  // };

  // const gridTemplateModified = (data: any) => {

  //   return (<div>
  //    {data?.Modified ? <p >{moment(data?.Modified).format(REACT_APP_DATE_FORMAT)}</p> : <></> }
  //   </div>);
  // };



  return (
    <div className="bg-[#EDEDED] ">
      <GridComponent
        ref={grid => gridInstance = grid}
        dataSource={dataFromApi}
        allowPaging={true}
        pageSettings={pageOptions}
        allowFiltering={true}
        allowSorting={true}
        sortSettings={sortingOptions}
        allowResizing={true}
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
        //actionBegin={actionBegin}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          <ColumnDirective field='Id'
            headerText='Id'
            width='120'
            visible={false}
            isPrimaryKey={true}
            allowEditing={false}
          />
          <ColumnDirective
            field="Title"
            headerText="Title"
            width="120"
          />
          <ColumnDirective
            field='IsActive'
            headerText='Status'
            displayAsCheckBox={true}
            editType="booleanedit"
            width='30'
            />
          <ColumnDirective
            field='Created'
            format={format}
            headerText='Created'
            width='120'
            visible={false}
            allowEditing={false} />
          <ColumnDirective
            field='CreatedBy'
            headerText='Created By'
            width='120'
            visible={false}
            allowEditing={false} />
          <ColumnDirective
            field='Modified'
            headerText='Modified'
            format={format}
            width='120'
            visible={false}
            allowEditing={false} />
          <ColumnDirective
            field='ModifiedBy'
            headerText='Modified By'
            width='120'
            visible={false}
            allowEditing={false} />
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
            Resize,
          ]}
        />
      </GridComponent>
    </div>
  );
}
export default CausesofActionClaims;
