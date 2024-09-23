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
import MotionPleadingEditDialog from "./MotionPleadingEditDialog";
import { Delete } from "@syncfusion/ej2/spreadsheet";
import ImportantDeadlinesEditDilog from "./ImportantDeadlinesEditDilog";

const format: any = { type: "dateTime", format: "M/d/y" };
const formatAmPm: any = { type: "dateTime", format: "M/d/y hh:mm a" };
const pageOptions = {
  currentPage: 1,
  pageSize: 25,
  pageCount: 20,
  pageSizes: ["25", "50", "100", "All"],
};

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function ImportantDeadlines(this: any) {
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

  //console.log("token",token)

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/CaseInfoDeadlineDate`,
    insertUrl: `${REACT_APP_BASE_URL}/CaseInfoDeadlineDate`,
    updateUrl: `${REACT_APP_BASE_URL}/CaseInfoDeadlineDate`,
    removeUrl: `${REACT_APP_BASE_URL}/CaseInfoDeadlineDate`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const DeadlineDateTypeDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/DeadlineDateType`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  

  const actionBeginFun = (args: any) => {
    if (args.requestType === "save") {
      if (args.action === "add") {
        console.log(args.data);
      } else if (args.action === "edit") {
        console.log(args.data);
      } else if (args.requestType === "delete") {
        console.log(args.data[0].orderId, "data");
      }
    }
  };

  function actionComplete(args: any) {
    const dialog = args.dialog;
    if (dialog && dialog.header) {
      dialog.header =
        args.requestType === "add"
          ? "Add Important Deadlines"
          : "Edit Important Deadlines";
      dialog.width = "500px";
    }
  }

  const dialogTemplate = (props: any) => {
    return (
      <ImportantDeadlinesEditDilog
        {...props}
        DeadlineDateTypeDataFromApi={DeadlineDateTypeDataFromApi}
      />
    );
  };

  return (
    <div>
      <div style={{ width: "95vw", zIndex: -1 }}>
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
            template: dialogTemplate,
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
              field="DeadlineDateTypeId"
              headerText="DeadlineDateType "
              width="250"
              foreignKeyValue="Title"
              foreignKeyField="Id"
              dataSource={DeadlineDateTypeDataFromApi}
            ></ColumnDirective>

            <ColumnDirective
              field="DeadlineDateDesc"
              headerText="DeadlineDateDesc"
              width="250"
              type="string"
              //   displayAsCheckBox={true}
              // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="DeadlineDate"
              headerText="DeadlineDate"
              width="250"
              format={format}
              type="date"
              // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="IsActive"
              headerText="Status"
              width="100"
              type="boolean"
              // allowEditing={false}
              displayAsCheckBox={true}
              visible={false}
            ></ColumnDirective>
            <ColumnDirective
              field="Created"
              headerText="Created"
              width="160"
              format={formatAmPm}
              type="date"
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
              format={formatAmPm}
              type="date"
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
              Delete,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default memo(ImportantDeadlines);