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
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import moment from "moment";
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
const { REACT_APP_BASE_URL, REACT_APP_DATE_FORMAT } = process.env;


function OutcomeDisposition(props: any) {
  const [data, setdata] = useState([]);


  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/outcomedisposition`,
    insertUrl: `${REACT_APP_BASE_URL}/outcomedisposition`,
    updateUrl: `${REACT_APP_BASE_URL}/outcomedisposition`,
    removeUrl: `${REACT_APP_BASE_URL}/outcomedisposition`,
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

  // function actionBegin(args: any) {
  //   if (args.action === "add") {
  //     axios
  //       .post(
  //         `${REACT_APP_BASE_URL}/outcomedisposition`,
  //         {
  //           Title: args.data.title,
  //         }
  //       )
  //       .then((response) => console.log("response", response))
  //       .catch((error) => console.log("error", error));
  //   } else if (args.action === "edit") {
  //     console.log(args.data.id, args.data.title);
  //     axios
  //       .patch(
  //         `${REACT_APP_BASE_URL}/outcomedisposition?id=${args.data.id}`,
  //         {
  //           Title: args.data.title,
  //         }
  //       )
  //       .then((response) => console.log("response", response))
  //       .catch((error) => console.log("error", error));
  //   }
  // }

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

  // const gridTemplateCreatedDate = (data: any) => {
  //   return (
  //     <div>
  //       {data?.Created ? (
  //         <p>{`${moment(data?.Created).format(
  //           REACT_APP_DATE_FORMAT
  //         )}`}</p>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   );
  // };
  // const gridTemplateModifiedDate = (data: any) => {
  //   return (
  //     <div>
  //       {data?.Modified ? (
  //         <p>{`${moment(data?.Modified).format(
  //           REACT_APP_DATE_FORMAT
  //         )}`}</p>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   );
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
        //actionBegin={actionBegin}
        toolbarClick={toolbarClick}
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
            width="120"
          />
          <ColumnDirective field='IsActive' headerText='Status' displayAsCheckBox={true}
            editType="booleanedit"
            width='120'/>
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
export default OutcomeDisposition;
