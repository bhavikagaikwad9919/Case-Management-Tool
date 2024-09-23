import React, { memo, useEffect } from "react";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { getpartyStatus, getGenderDetails } from "../features/injuredparty/injuredPartySlice";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
const {
  REACT_APP_BASE_URL,
} = process.env;

export function InjuredParty(props :any) {
  let navigate = useNavigate();
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.rowData.Id;
  const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)

  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const format: any = { type: "dateTime", format: "M/d/y" };
  const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  const pageOptions = {
    currentPage: 1,
    pageSize: 25,
    pageCount: 20,
    pageSizes: ["25", "50", "100", "All"],
  };

  const dispatch  = useDispatch()
  const toolBarOptions = [
    "Add",
    // "Edit",
    // "Delete",
    // "Update",
    // "Cancel",
    "ExcelExport",
    "ColumnChooser",
    "Search"
  ];

  let gridInstance: any;

  const filterOptions: any = {
    type: "Menu",
  };
  
  useEffect(() => {
    const dataforOther = {
      token
    }
    dispatch(getpartyStatus(dataforOther))
    dispatch(getGenderDetails(dataforOther))
  }, [])

  const genderData = useSelector((state: any) => state.injured.genderDetails)
  const partyData = useSelector((state: any) => state.injured.partyData)

  console.log(genderData,partyData,"jjjjj")

  // console.log("party11",partyData)
  // const genderData = new DataManager({
  //   url: `${REACT_APP_BASE_URL}/Gender/`,
  //   adaptor: new ODataV4Adaptor(),
  //   headers: [{ Authorization: `Bearer ${token}` }],
  //   offline: true,
  // });

  // const partyData = new DataManager({
  //   url: `${REACT_APP_BASE_URL}/partystatus/`,
  //   adaptor: new ODataV4Adaptor(),
  //   headers: [{ Authorization: `Bearer ${token}` }],
  //   offline: true,
  // });

  const InjuredPartyData = new DataManager({
    url: `${REACT_APP_BASE_URL}/injuredParty/?$filter=CaseInformationID eq ${idFromUrl}`,
    adaptor: new ODataV4Adaptor(),
    headers: [{ Authorization: `Bearer ${token}` }],
    offline: true,
  });

  

  const handleAddAction = (args: any) => {
    if (args.requestType === "add") {
      navigate(`/injuredpartydetails/?caseId=${idFromUrl}`)
    }
  };

  let dropInstance: DropDownList;
  const filterPartyData = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/partystatus`,
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
  const filterGenderdata = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/Gender`,
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

  return (
    <div>
     {partyData && genderData && <GridComponent
        ref={(grid) => (gridInstance = grid)}
        dataSource={InjuredPartyData}
        allowPaging={true}
        pageSettings={pageOptions}
        allowResizing={true}
        allowFiltering={true}
        allowSorting={true}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          allowEditOnDblClick: false,
        }}
        showColumnChooser={true}
        toolbar={toolBarOptions}
        filterSettings={filterOptions}
        allowPdfExport={true}
        allowExcelExport={true}
        recordDoubleClick={(args: any) => {
          window.open(`/injuredpartydetails/${args.rowData.Id}`, "_blank");
        }}
        actionBegin={handleAddAction}
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
            field="DisplayName"
            headerText="Name"
            width="250"
          ></ColumnDirective>
          <ColumnDirective
            field="Ssn"
            headerText="SSN"
            width="250"
            allowEditing={false}
          ></ColumnDirective>
           { genderData &&  <ColumnDirective
            field="GenderId"
            headerText="Gender"
            width="250"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={genderData}
            allowEditing={false}
            filter={filterGenderdata}
          ></ColumnDirective> }
          <ColumnDirective
            field="FirstName"
            headerText="First Name"
            width="250"
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="MiddleName"
            headerText="Middle Name"
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="LastName"
            headerText="Last Name"
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
         {partyData && <ColumnDirective
            field="PartyStatusId"
            headerText="Party Status"
            width="250"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={partyData}
            allowEditing={false}
            type="string"
            filter={filterPartyData}
            visible={false}
          ></ColumnDirective> }
          <ColumnDirective
            field="Role"
            headerText="Role"
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Deceased"
            headerText="Deceased"
            width="250"
            allowEditing={false}
            displayAsCheckBox={true}
            visible={false}
            editType="booleanedit"
          ></ColumnDirective>
          
          <ColumnDirective
            field="Dob"
            headerText="DOB"
            type="date"
            format={format}
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Dod"
            headerText="DOD"
            type="date"
            format={format}
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Age"
            headerText="Age"
            width="250"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
      
          <ColumnDirective
            field="IsActive"
            headerText="Status"
            displayAsCheckBox={true}
            editType="booleanedit"
            width="160"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="Created"
            headerText="Created"
            width="160"
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
            Resize
          ]}
        />
      </GridComponent>}
    </div> 
  );
}

export default memo(InjuredParty);
