import React, { memo, useEffect } from "react";
import {
  DataManager,
  ODataV4Adaptor,
} from "@syncfusion/ej2-data";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Filter,
  Sort,
  Edit,
  Toolbar,
  PdfExport,
  ExcelExport,
  ColumnChooser,
  ForeignKey,
} from "@syncfusion/ej2-react-grids";
import JurisdictionEditDialog from "../JurisdictionEditDialog";
import VehicleModelDialogEdit from "./VehicleModelDialogEdit";

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function VehicleModel(this: any) {
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

  let gridInstance: any;

  const filterOptions: any = {
    type: "Menu",
  };
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const sortingOptions: Object = { columns: [{ field: 'Title', direction: 'Ascending' }] };


  //console.log("token",token)

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/VehicleModel`,
    insertUrl: `${REACT_APP_BASE_URL}/VehicleModel`,
    updateUrl: `${REACT_APP_BASE_URL}/VehicleModel`,
    removeUrl: `${REACT_APP_BASE_URL}/VehicleModel`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const actionBeginFun = (args: any) => {

    if (args.requestType === "save") {
      if (args.action === "add") {
        console.log(args.data)
      }
      else if (args.action === "edit") {
        console.log(args.data)
      }
    }

  };

  function actionComplete(args: any) {
    const dialog = args.dialog
    if (dialog && dialog.header) {
      dialog.header = args.requestType === 'add' ? "Add Vehicle Model" : "Edit Vehicle Model"
      dialog.width = '500px'
    }
  }

  const dialogTemplate = (props: any) => {
    return (<VehicleModelDialogEdit {...props} />);
  }

  return (
      <div className="bg-[#EDEDED] ">
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={dataFromApi}
          allowPaging={true}
          pageSettings={pageOptions}
          allowFiltering={true}
          allowSorting={true}
          sortSettings={sortingOptions}
          editSettings={{
            allowEditing: true,
            //allowEditOnDblClick: false,
            allowAdding: true,
            allowDeleting: true,
            // mode: "Dialog",
            // template: dialogTemplate
          }}
          showColumnChooser={true}
          toolbar={toolBarOptions}
          filterSettings={filterOptions}
          allowPdfExport={true}
          allowExcelExport={true}
          actionBegin={actionBeginFun}
          actionComplete={actionComplete}
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
              ForeignKey,
            ]}
          />
        </GridComponent>
      </div>
  );
}

export default VehicleModel;
