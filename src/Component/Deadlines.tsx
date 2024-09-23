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
  Resize,
} from "@syncfusion/ej2-react-grids";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import DeadlineEditDilog from "./DeadlineEditDilog";
import { useLocation, useParams } from "react-router-dom";

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function CaseInvestigation(props: any) {

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
  const format: any = { type: 'dateTime', format: 'M/d/y' };
  const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };

  const params: any = useParams();
  const id: any = params.id
  const idFromUrl = props.rowData.Id
  const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)


  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/deadline/?$filter=CaseInformationID eq ${idFromUrl}`,
    insertUrl: `${REACT_APP_BASE_URL}/deadline`,
    updateUrl: `${REACT_APP_BASE_URL}/deadline`,
    removeUrl: `${REACT_APP_BASE_URL}/deadline`,
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
      dialog.header = args.requestType === 'add' ? "Add Case Deadline" : "Edit Case Deadline"
      dialog.width = '700px';

    }
    // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

    //   const dialog = args.dialog;

    //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
    // }



  }




  const dialogTemplate = (props: any) => {
    return (<DeadlineEditDilog {...props} idFromUrl={idFromUrl} />);
  }

  return (
    <div>
      <div style={{ width: "95vw", zIndex: -1 }}>
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={dataFromApi}
          allowPaging={true}
          pageSettings={{ pageSize: 6 }}
          allowFiltering={true}
          allowSorting={true}
          allowResizing={true}
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
              field="DeadlineDate"
              headerText="Deadline Date"
              width="160"
              type="date"
              format={format}
            //template={gridTemplateDeadlineDateDate}
            ></ColumnDirective>
            <ColumnDirective
              field="DescriptionOfEvent"
              headerText="Description Of Event"
              width="160"
              type="string"
            ></ColumnDirective>
            <ColumnDirective
              field="Created"
              headerText="Created"
              width="160"
              //template={gridTemplateCreated}
              type="date"
              format={formatAmPm}
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
              //template={gridTemplateModified}
              type="date"
              format={formatAmPm}
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
    </div>
  );
}

export default memo(CaseInvestigation);
