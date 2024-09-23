import React, { memo, useEffect } from "react";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import { useLocation, useParams } from "react-router-dom";
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
  Resize
} from "@syncfusion/ej2-react-grids";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import InvestigationInformatiionEditDilog from "./InvestigationInformatiionEditDilog";
const format: any = { type: 'dateTime', format: 'M/d/y' };
const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};

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
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.rowData.Id;
  const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)

  //console.log("token",token)

  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/Investigation`,
    insertUrl: `${REACT_APP_BASE_URL}/Investigation`,
    updateUrl: `${REACT_APP_BASE_URL}/Investigation`,
    removeUrl: `${REACT_APP_BASE_URL}/Investigation`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const InvestigationTypeDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/InvestigationType`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  


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
      dialog.header = args.requestType === 'add' ? "Add Case Investigation" : "Edit Case Investigation"
      dialog.width = '700px';
    
    }
    // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

    //   const dialog = args.dialog;

    //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
    // }



  }
  let dropInstance: DropDownList;

  const filterInvestigationTypeData = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/InvestigationType`,
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
    }
  };




  const dialogTemplate = (props: any) => {
    return (<InvestigationInformatiionEditDilog {...props} idFromUrl={idFromUrl} InvestigationTypeDataFromApi={InvestigationTypeDataFromApi} />);
  }

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
          allowResizing={true}
          query={queryActive}
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
              field="InvestigationTypeId"
              headerText="Investigation Type"
              width="250"
              foreignKeyValue="Title"
              foreignKeyField="Id"
              filter={filterInvestigationTypeData}
              dataSource={InvestigationTypeDataFromApi}
            ></ColumnDirective>
            <ColumnDirective
              field="Description"
              headerText="Description"
              width="160"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="InvestigationStartDate"
              headerText="Investigation Start Date"
              width="250"
              format={format}
              type="date"
            ></ColumnDirective>
            <ColumnDirective
              field="InvestigationEndDate"
              headerText="Investigation End Date"
              width="250"
              format={format}
              type="date"
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
              Resize
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default memo(CaseInvestigation);
