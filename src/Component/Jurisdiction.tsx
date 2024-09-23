import React, { memo, useEffect } from "react";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import moment from "moment";
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
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import CourtInformatiionEditDilog from "./CourtInformatiionEditDilog";
import DiscoveryEditDialog from "./DiscoveryEditDialog";
import JurisdictionEditDialog from "./JurisdictionEditDialog";

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function Jurisdiction(this: any) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [popupData, setPopUpData] = React.useState(null);
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


  //console.log("token",token)

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/jurisdiction`,
    insertUrl: `${REACT_APP_BASE_URL}/jurisdiction`,
    updateUrl: `${REACT_APP_BASE_URL}/jurisdiction`,
    removeUrl: `${REACT_APP_BASE_URL}/jurisdiction`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const courtTypeDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/courtType`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });
  const StateDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/State`,
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
      dialog.header = args.requestType === 'add' ? "Add Court Information" : "Edit Court Information"
      dialog.width = '500px'
    }
  }

  const dialogTemplate = (props: any) => {
    return (<JurisdictionEditDialog {...props} courtTypeDataFromApi={courtTypeDataFromApi} StateDataFromApi={StateDataFromApi} />);
  }

  return (
      <div className="bg-[#EDEDED] ">
        <div className="bg-white py-3 px-3 drop-shadow-xl">
      <h1 className='ml-3 text-lg'>Court</h1>
    </div>
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={dataFromApi}
          allowPaging={true}
          pageSettings={pageOptions}
          allowFiltering={true}
          allowSorting={true}
          editSettings={{
            allowEditing: true,
            //allowEditOnDblClick: false,
            allowAdding: true,
            allowDeleting: true,
            mode: "Dialog",
            template: dialogTemplate
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
              field="Id"
              headerText="Id"
              width="140"
              isPrimaryKey={true}
              visible={false}
              allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="CourtName"
              headerText="Court Name"
              width="140"
              type="string"
            ></ColumnDirective>

            <ColumnDirective
              field="CourtDescription"
              headerText="Court Description"
              width="160"
              type="string"
            // displayAsCheckBox={true}
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="CourtTypeId"
              headerText="Court Type"
              width="100"
              foreignKeyValue="Title"
              foreignKeyField="Id"
              dataSource={courtTypeDataFromApi}
            // template={gridTemplateDateServedDate}
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="AddressLine1"
              headerText="Address Line 1"
              width="160"
              type="string"
              // template={gridTemplateDateDueDate}
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="AddressLine2"
              headerText="Address Line 2"
              width="160"
              type="string"
              // template={gridTemplateDateCompletedDate}
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="City"
              headerText="City"
              width="160"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="StateId"
              headerText="State"
              width="160"
              foreignKeyValue="StateName"
              foreignKeyField="Id"
              dataSource={StateDataFromApi}

              // type="string"
              // template={gridTemplateDateCompletedDate}
            // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="PostalCode"
              headerText="PostalCode"
              width="160"
              type="string"
            // allowEditing={false}
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
            ]}
          />
        </GridComponent>
      </div>
  );
}

export default memo(Jurisdiction);
