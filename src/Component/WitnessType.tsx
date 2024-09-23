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
import React from "react";
import "../App.css";
import moment from "moment";
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
const { REACT_APP_BASE_URL, REACT_APP_DATE_FORMAT } = process.env;


function WitnessType(props: any) {

  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/witnessType`,
    insertUrl: `${REACT_APP_BASE_URL}/witnessType`,
    updateUrl: `${REACT_APP_BASE_URL}/witnessType`,
    removeUrl: `${REACT_APP_BASE_URL}/witnessType`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });


  let gridInstance: any;

  const toolbarClick = (args: any) => {
    if (gridInstance) {
      if (args.item.id.includes('excelexport')) {
        gridInstance.excelExport({
          fileName: 'demoData.xlsx'
        });
      }
    }
  }

  // const gridTemplateCreatedDate = (props: any) => {
  //   return (
  //     <div>
  //       {props?.Created ? (
  //         <p>{`${moment(props?.Created).format(
  //           REACT_APP_DATE_FORMAT
  //         )}`}</p>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   );
  // };
  // const gridTemplateModifiedDate = (props: any) => {
  //   return (
  //     <div>
  //       {props?.Modified ? (
  //         <p>{`${moment(props?.Modified).format(
  //           REACT_APP_DATE_FORMAT
  //         )}`}</p>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   );
  // };


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
          textAlign="Center"
          visible={false}
          allowEditing={false}
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
          width='120'
       />
        <ColumnDirective field='Created' format={format} headerText='Created' width='120' visible={false} allowEditing={false} />
        <ColumnDirective field='CreatedBy' headerText='Created By' width='120' visible={false} allowEditing={false} />
        <ColumnDirective field='Modified' format={format} headerText='Modified' width='120' visible={false} allowEditing={false} />
        <ColumnDirective field='ModifiedBy' headerText='Modified By' width='120' visible={false} allowEditing={false} />
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
export default WitnessType;
