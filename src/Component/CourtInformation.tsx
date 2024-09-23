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
  SortSettingsModel,
} from "@syncfusion/ej2-react-grids";
import "../App.css"
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import CourtInformatiionEditDilog from "./CourtInformatiionEditDilog";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const format: any = { type: 'dateTime', format: 'M/d/y' };
const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
const pageOptions = { currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25", "50", "100", "All"] };

const {
  REACT_APP_BASE_URL,
} = process.env;

export function CourtInformation(props: any) {
  const sortingOptions: SortSettingsModel = {
    columns: [{ field: 'CourtStartDate', direction: 'Descending' }]
  };
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
  let dropInstance: any;

  const filterOptions: any = {
    type: "Menu",
  };
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const params: any = useParams();
  const dispatch = useDispatch();
  const id: any = params.id;
  const idFromUrl = props.rowData.Id;

  const query =  new Query()
  const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)
  //console.log("token",token)
  

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/casecourtinformation/`,
    insertUrl: `${REACT_APP_BASE_URL}/casecourtinformation`,
    updateUrl: `${REACT_APP_BASE_URL}/casecourtinformation`,
    removeUrl: `${REACT_APP_BASE_URL}/casecourtinformation`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const jurisdictionDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/Jurisdiction`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });


  const filterjurisdiction = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/Jurisdiction`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${token}` }],
          }),
          fields: { text: "CourtName", value: "Id" },
          placeholder: "Select a value",
          popupHeight: "200px",
        });
        dropInstance.appendTo(flValInput);
      },
      read: (args: any) => {
        console.log("args2 read", args);
        args.fltrObj.filterByColumn(
          args.column.field,
          args.operator,
          dropInstance.text
        );
      },
      write: (args: any) => {
        console.log("args3 write", args);
        dropInstance.text = args.filteredValue || "";
      },
    }
  };



  //   const gridTemplateStatus = (data: any) => {
  //     return (
  //         <>
  //           <CheckBoxComponent
  //               disabled={true}
  //               checked={data?.IsActive}
  //             />
  //         </>
  //       );
  //   };

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
      dialog.header = args.requestType === 'add' ? "Add Court Case" : "Edit Court Case"
      dialog.width = '700px';
      dialog.height = '520px';
    }
    // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

    //   const dialog = args.dialog;

    //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
    // }



  }



  const dialogTemplate = (props: any) => {
    return (<CourtInformatiionEditDilog {...props} idFromUrl={idFromUrl} jurisdictionDataFromApi={jurisdictionDataFromApi}/>);
  }

  return (
    <div>
      <div style={{ width: "95vw", zIndex: -1 }}>
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={dataFromApi}
          query={queryActive}
          allowPaging={true}
          pageSettings={pageOptions}
          allowFiltering={true}
          allowSorting={true}
          sortSettings={sortingOptions}
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
          // actionBegin={actionBeginFun}
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
              field="JurisdictionId"
              headerText="Court"
              width="140"
              foreignKeyValue="CourtName"
              foreignKeyField="Id"
              filter={filterjurisdiction}
              dataSource={jurisdictionDataFromApi}
            ></ColumnDirective>
            <ColumnDirective
              field="CourtStartDate"
              headerText="Start Date"
              width="250"
              type="date"
              format={format}
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CourtEndDate"
              headerText="End Date"
              width="250"
              type="date"
              format={format}
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CourtCaseNo"
              headerText="Case #"
              width="160"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            
            <ColumnDirective
              field="JudgeArrbitratorAssigned"
              headerText="Judge Arbitrator Assigned"
              //template={DateServedTemplate}
              displayAsCheckBox={true}
              width="250"
              type="boolean"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CurrentJudge"
              headerText="Judge"
              width="160"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
             <ColumnDirective
              field="CurrentMagistrateJudge"
              headerText="Magistrate Judge"
              width="280"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CurrentSpecialMaster"
              headerText="Special Master "
              width="280"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CurrentJudgeRulesLink"
              headerText="Judge Rules Link"
              width="250"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="IsActive"
              headerText="Status"
              width="100"
              type="boolean"
              displayAsCheckBox={true}
              visible={false}
            ></ColumnDirective>
            <ColumnDirective
              field="CurrentCourt"
              headerText="Current Court"
              width="250"
              type="boolean"
              displayAsCheckBox={true}
              visible={false}
            // allowEditing={false}
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
              Resize,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default memo(CourtInformation);
