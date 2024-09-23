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
import DepositionInformatiionEditDilog from "./DepositionInformatiionEditDilog";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { createElement } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";


const format: any = { type: 'dateTime', format: 'M/d/y' };
const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};
const {
  REACT_APP_BASE_URL,
} = process.env;

export function CaseDeposition(props: any) {

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
  const id: any = params.id
  const idFromUrl = props.rowData.Id
  const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)
  //console.log("token",token)
  // const DeponentTypeDataFromApi = useSelector((state: any) => state.caseedit.deponentType)


  // useEffect(() => {
  //   const data = {
  //     token
  //   }
  //   dispatch(fetchdeponentType())
  // }, [])
  
  const dataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/CaseDeposition`,
    insertUrl: `${REACT_APP_BASE_URL}/CaseDeposition`,
    updateUrl: `${REACT_APP_BASE_URL}/CaseDeposition`,
    removeUrl: `${REACT_APP_BASE_URL}/CaseDeposition`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const DeponentTypeDataFromApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/DeponentType`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${token}` }],
  });

  const filterDeponentType = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/DeponentType`,
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
      dialog.header = args.requestType === 'add' ? "Add Case Deposition" : "Edit Case Deposition"
      dialog.width = '700px';
    }
    // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

    //   const dialog = args.dialog;

    //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
    // }



  }




  const dialogTemplate = (props: any) => {
    return (<DepositionInformatiionEditDilog {...props} idFromUrl={idFromUrl} DeponentTypeDataFromApi={DeponentTypeDataFromApi} />);
  }

  return (
    <div>
      <div style={{ width: "95vw", zIndex: -1 }}>
        <GridComponent
          ref={(grid) => (gridInstance = grid)}
          dataSource={dataFromApi}
          allowPaging={true}
          query={queryActive}
          pageSettings={pageOptions}
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
              field="DepositionDate"
              headerText="Deposition Date"
              width="250"
              format={format}
              type="date"
            ></ColumnDirective>
             <ColumnDirective
              field="DeponentName"
              headerText="Deponent Name"
              width="250"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="DeponentTypeId"
              headerText="Deponent Type"
              width="250"
              foreignKeyValue="Title"
              foreignKeyField="Id"
              filter={filterDeponentType}
              dataSource={DeponentTypeDataFromApi}
            ></ColumnDirective>
           
            <ColumnDirective
              field="DepositionNoticedBy"
              headerText="Deposition Noticed By"
              width="250"
              type="string"
            // allowEditing={false}
            ></ColumnDirective>
            <ColumnDirective
              field="DepositionNotes"
              headerText="Deposition Notes"
              width="250"
              type="string"
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
              allowEditing={false}
              visible={false}
              format={formatAmPm}
              type="date"
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
              allowEditing={false}
              visible={false}
              format={formatAmPm}
              type="date"
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

export default memo(CaseDeposition);
