
import React from 'react';
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
  ColumnChooser
} from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
const { REACT_APP_BASE_URL } = process.env;

function MatterStatus(props: any) {

  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
  
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/matterstatus`,
    insertUrl: `${REACT_APP_BASE_URL}/matterstatus`,
    updateUrl: `${REACT_APP_BASE_URL}/matterstatus`,
    removeUrl: `${REACT_APP_BASE_URL}/matterstatus`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  // 

  let gridInstance: any;
  const toolBarOptions = [
    'Add',
    'Edit',
    'Delete',
    'Update',
    "Cancel",
    'ExcelExport',
    'ColumnChooser',
    "Search"
  ]

  const filterOptions: any = {
    type: 'Menu'
  }


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
        //mode:'Dialog',
        mode: props?.tab === "Law Firm" ? 'Dialog' : 'Normal'

      }}
      showColumnChooser={true}
      toolbar={toolBarOptions}
      filterSettings={filterOptions}
      allowPdfExport={true}
      allowExcelExport={true}
      toolbarClick={toolbarClick}
    //actionBegin={actionBegin}
    >
      <ColumnsDirective>
        <ColumnDirective field='Id'
          headerText='ID'
          width='120'
          visible={false}
          isPrimaryKey={true}
          allowEditing={false}
        />
        <ColumnDirective
          field="Title"
          headerText="Title"
          width="140"
        ></ColumnDirective>
        <ColumnDirective
          field="CaseInformations"
          headerText="Case Informations"
          width="160"
          visible={false}
          allowEditing={false}
        ></ColumnDirective>
        <ColumnDirective
          field="IsActive"
          headerText="Status"
          width="100"
          displayAsCheckBox={true}
          editType="booleanedit"
        ></ColumnDirective>
        <ColumnDirective
          field="Created"
          format={format}
          headerText="Created"
          width="160"
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
          format={format}
          headerText="Modified"
          width="160"
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
          Resize
        ]}
      />
    </GridComponent>
</div>
  );
}

export default MatterStatus;

