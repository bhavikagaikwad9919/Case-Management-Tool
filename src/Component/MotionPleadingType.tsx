
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import moment from 'moment';
const { REACT_APP_DATE_FORMAT, REACT_APP_BASE_URL } = process.env;

function MotionPleadingType(props: any) {
  const [data, setdata] = useState([]);


  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };
  
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/motionpleadingtype`,
    insertUrl: `${REACT_APP_BASE_URL}/motionpleadingtype`,
    updateUrl: `${REACT_APP_BASE_URL}/motionpleadingtype`,
    removeUrl: `${REACT_APP_BASE_URL}/motionpleadingtype`,
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

  // function actionBegin(args: any) {
  //   if (args.action === "add") {
  //     axios
  //       .post(`${REACT_APP_BASE_URL}/motionpleadingtype`,
  //         {
  //           Title: args.data.title,
  //         }
  //       )
  //       .then((response) => console.log("response", response))
  //       .catch((error) => console.log("error", error));
  //   } else if (args.action === "edit") {
  //     axios
  //       .patch(`${REACT_APP_BASE_URL}/motionpleadingtype?id=${args.data.id}`,
  //         {
  //           Title: args.data.title,
  //         }
  //       )
  //       .then((response) => console.log("response", response))
  //       .catch((error) => console.log("error", error));
  //   }
  // }

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
      toolbar={toolBarOptions}
      filterSettings={filterOptions}
      allowPdfExport={true}
      allowExcelExport={true}
      toolbarClick={toolbarClick}
      showColumnChooser={true}
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
        {/* <ColumnDirective
          field="motionPleadings"
          headerText="Motion Pleadings"
          width="160"
          allowEditing={false}
        ></ColumnDirective> */}
        <ColumnDirective
          field="IsActive"
          headerText="Status"
          width="100"
          displayAsCheckBox={true}
          editType="booleanedit"
        ></ColumnDirective>
        <ColumnDirective
          field="Created"
          headerText="Created"
          format={format}
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
          Resize
        ]}
      />
    </GridComponent>
</div>
  );
}

export default MotionPleadingType;

