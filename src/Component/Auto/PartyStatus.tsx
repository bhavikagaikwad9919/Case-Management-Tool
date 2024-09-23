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
    ToolbarItems,
    EditSettingsModel,
  } from "@syncfusion/ej2-react-grids";
  import { useEffect, useState } from "react";
  import "../../App.css";
  import moment from 'moment';
  import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
  const { REACT_APP_BASE_URL,REACT_APP_DATE_FORMAT } = process.env;
  
  function PartyStatus(props: any) {
  
    const user: any = localStorage.getItem('user')
    const token = JSON.parse(user)?.accessToken
    const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
    const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
    
    const dataFromApi = new DataManager({
      url: `${REACT_APP_BASE_URL}/PartyStatus`,
      insertUrl: `${REACT_APP_BASE_URL}/PartyStatus`,
      updateUrl: `${REACT_APP_BASE_URL}/PartyStatus`,
      removeUrl: `${REACT_APP_BASE_URL}/PartyStatus`,
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
    
    function actionBegin(args: any) {
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
              field='Id'
              headerText='ID'
              width='120'
              allowEditing={false}
              visible={false}
              isPrimaryKey={true} />
  
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
              width='120' />
  
            <ColumnDirective
              field='Created'
              headerText='Created'
              format={format}
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
              width='120'
              format={format}
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
              Resize
            ]}
          />
        </GridComponent>
      </div>
    );
  }
  export default PartyStatus;
  