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
import { useLocation, useParams } from "react-router-dom";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import { Delete } from "@syncfusion/ej2/spreadsheet";
import InjuryDispositionEditDilog from "./InjuryDispositionEditDilog";
const format: any = { type: "dateTime", format: "M/d/y" };
const formatAmPm: any = { type: "dateTime", format: "M/d/y hh:mm a" };

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function InjuryDeposition(this: any) {
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
  const params: any = useParams();
  const id: any = params.id
  const idFromUrl = parseInt(id)
  const query = new Query().where("InjuredPartyId", "equal", idFromUrl);

  const InjuredPartyData = new DataManager({
    url: `${REACT_APP_BASE_URL}/injuredParty`,
    adaptor: new ODataV4Adaptor(),
    headers: [{ Authorization: `Bearer ${token}` }],
    offline: true,
  });
  const depositionStatusDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/depositionstatus`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });
  
  
  const InjuryDepositionDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/InjuryDeposition`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  let dropInstance: any;

  const filterInjuredParty = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/injuredParty`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${token}` }],
          }),
          fields: { text: "FirstName", value: "Id" },
          placeholder: "Select a value",
          popupHeight: "200px",
        });
        dropInstance.appendTo(flValInput);
      },
      read: (args: any) => {
        args.fltrObj.filterByColumn(
          args.column.field,
          args.operator,
          dropInstance.text
        );
      },
      write: (args: any) => {
        dropInstance.text = args.filteredValue || "";
      },
    },
  };

  const filterDepositionStatus = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/depositionstatus`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${token}` }],
          }),
          fields: { text: "Title", value: "Id" },
          placeholder: "Select a value",
          popupHeight: "200px",
        });
        dropInstance.appendTo(flValInput);
      },
      read: (args: any) => {
        args.fltrObj.filterByColumn(
          args.column.field,
          args.operator,
          dropInstance.text
        );
      },
      write: (args: any) => {
        dropInstance.text = args.filteredValue || "";
      },
    },
  };


  function actionComplete(args: any) {
    const dialog = args.dialog
    if (dialog && dialog.header) {
      dialog.header = args.requestType === 'add' ? "Add Injury Deposition" : "Edit Injury Deposition"
      dialog.width = '700px';
      dialog.height = '330px';
    }
    // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

    //   const dialog = args.dialog;

    //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
    // }



  }



  const dialogTemplate = (props: any) => {
    return (<InjuryDispositionEditDilog {...props} depositionStatusDataFromApi={depositionStatusDataFromApi}  />);
  }

  return (
    <div>
      <div style={{ width: "95vw" }}>
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={InjuryDepositionDataFromApi}
          allowPaging={true}
          pageSettings={{ pageSize: 6 }}
          allowFiltering={true}
          allowSorting={true}
          query={query}
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
              type="number"
            ></ColumnDirective>

            {/* <ColumnDirective
              field="InjuredPartyId"
              headerText="Injured Party"
              width="140"
              foreignKeyValue="FirstName"
              foreignKeyField="Id"
              dataSource={InjuredPartyData}
              filter={filterInjuredParty}
              type="string"
            ></ColumnDirective> */}

            <ColumnDirective
              field="DepositionStatusId"
              headerText="Deposition Status"
              width="160"
              foreignKeyValue="Title"
              foreignKeyField="Id"
              dataSource={depositionStatusDataFromApi}
              filter={filterDepositionStatus}
              type="string"
            ></ColumnDirective>

            <ColumnDirective
              field="DepositionDate"
              headerText="Deposition Date"
              width="100"
              format={format}
              type="date"
            ></ColumnDirective>

            <ColumnDirective
              field="CourtReporterFirstName"
              headerText="Court Reporter First Name"
              width="160"
              type="string"
            ></ColumnDirective>
            <ColumnDirective
              field="CourtReporterMiddleName"
              headerText="Court Reporter Middle Name"
              width="160"
              type="string"
            ></ColumnDirective>

            <ColumnDirective
              field="CourtReporterLastName"
              headerText="Court Reporter Last Name"
              width="160"
              type="string"
              // allowEditing={false}
            ></ColumnDirective>

            <ColumnDirective
              field="DepositionTrascriptLink"
              headerText="Deposition Trascript Link"
              width="140"
              type="string"
            ></ColumnDirective>

            <ColumnDirective
              field="IsActive"
              headerText="Status"
              width="160"
              displayAsCheckBox={true}
              editType="booleanedit"
              visible={false}
            ></ColumnDirective>

            <ColumnDirective
              field="Created"
              headerText="Created"
              width="160"
              type="date"
              format={formatAmPm}
              visible={false}
            ></ColumnDirective>

            <ColumnDirective
              field="CreatedBy"
              headerText="Created By"
              width="160"
              type="string"
              visible={false}
            ></ColumnDirective>
            <ColumnDirective
              field="Modified"
              headerText="Modified"
              width="160"
              type="date"
              format={formatAmPm}
              visible={false}
            ></ColumnDirective>

            <ColumnDirective
              field="ModifiedBy"
              headerText="Modified By"
              width="160"
              type="string"
              visible={false}
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
              Delete,
            ]}
          />
        </GridComponent>
        
      </div>
    </div>
  );
}

export default memo(InjuryDeposition);
