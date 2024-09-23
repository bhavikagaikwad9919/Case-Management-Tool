import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
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
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import moment from "moment";
const { REACT_APP_BASE_URL, REACT_APP_DATE_FORMAT_NO_TIME, REACT_APP_DATE_FORMAT } = process.env;
const pageOptions = {currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25","50", "100", "All"]};

function Cases(props: any) {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  var gridRef = useRef(null)
  let gridInstance: any
  const format: any = { type: 'dateTime', format: 'M/d/y' };
  const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };


  let query = new Query().where("IsActive", "equal", true);
  const [caseDataFromApi, setcaseDataFromApi] = useState([])




  useEffect(() => {

    var dataFromApi = new DataManager({
      url: `${REACT_APP_BASE_URL}/caseinformation`,
      removeUrl: `${REACT_APP_BASE_URL}/caseinformation`,
      adaptor: new ODataV4Adaptor(),
      crossDomain: true,
      headers: [{ Authorization: `Bearer ${props.token}` }],
    }).executeQuery(query).then((e: any) => {
      setcaseDataFromApi(e?.result)
    });

  }, [])

  // var caseDataFromApi = new DataManager({
  //   url: `${REACT_APP_BASE_URL}/caseinformation`,
  //   adaptor: new ODataV4Adaptor(),
  //   crossDomain: true,
  //   headers: [{ Authorization: `Bearer ${props.token}` }],
  // });



  var matterTypeDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/mattertype`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  var matterstatusDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/matterstatus`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  var postureDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/posture`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  // var AllegedLiabilityDefectDataApi = new DataManager({
  //   url: `${REACT_APP_BASE_URL}/AllegedLiabilityDefect`,
  //   adaptor: new ODataV4Adaptor(),
  //   crossDomain: true,
  //   headers: [{ Authorization: `Bearer ${props.token}` }],
  // });

  var CausesofActionClaimDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  var outcomedispositionDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/outcomedisposition`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  var outcomedispositionspecificDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/outcomedispositionspecific`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });

  var vehiclepurchasetypeDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/vehiclepurchasetype`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });


  var vehiclModeltypeDataApi = new DataManager({
    url: `${REACT_APP_BASE_URL}/VehicleModel`,
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    headers: [{ Authorization: `Bearer ${props.token}` }],
  });


  const handleAddAction = (args: any) => {
    if (args.requestType === "add") {
      navigate("/casedetails");
    }
  };

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

  const filterOptions: any = {
    type: "Menu",
  };

  const toolbarClick = (args: any) => {
    if (gridInstance) {
      if (args.item.id.includes("pdfexport")) {
        gridInstance.pdfExport({
          fileName: "demoData.pdf",
        });
      } else if (args.item.id.includes("excelexport")) {
        gridInstance.excelExport({
          fileName: "demoData.xlsx",
        });
      }
    }
  };

  let dropInstance: any;

  const filterMatterType = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/mattertype`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterMatterStatus = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/matterstatus`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterPosture = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/posture`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterCauseOfActionClaims = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/CausesofActionClaim`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterOutComeDiposition = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/outcomedisposition`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterOutComeDipositionSpecific = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/outcomedispositionspecific`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterVehicelPurchaesType = {
    ui: {
      create: (args: any) => {
        console.log("args1 create", args);
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/vehiclepurchasetype`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  const filterModelType = {
    ui: {
      create: (args: any) => {
        const flValInput = createElement("input", { className: "flm-input" });
        args.target.appendChild(flValInput);
        dropInstance = new DropDownList({
          dataSource: new DataManager({
            url: `${REACT_APP_BASE_URL}/VehicleModel`,
            adaptor: new ODataV4Adaptor(),
            crossDomain: true,
            headers: [{ Authorization: `Bearer ${props.token}` }],
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

  return (
    <>
    <div>
      <div className="bg-white py-3 px-3 drop-shadow-xl">
        <h1 className='ml-3 text-lg'>Cases</h1>
      </div>
      <GridComponent
        ref={gridRef}
        dataSource={caseDataFromApi}
        allowPaging={true}
        pageSettings={pageOptions}
        allowResizing={true}
        allowFiltering={true}
        allowSorting={true}
        recordDoubleClick={(args: any) => {

          window.open(`/casedetails/${args.rowData.ClientReferenceNumber}`, "_blank");
        }}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: "Dialog",
          allowEditOnDblClick: false,
        }}
        showColumnChooser={true}
        toolbar={toolBarOptions}
        filterSettings={filterOptions}
        allowPdfExport={true}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
        actionBegin={handleAddAction}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="Id"
            headerText="Id"
            width="50"
            visible={false}
            type="number"
            isPrimaryKey={true}
            allowEditing={false}
          ></ColumnDirective>
          <ColumnDirective
            field="MatterNum"
            headerText="Matter #"
            width="140"
            type="number"
          ></ColumnDirective>
           <ColumnDirective
            field="ClientReferenceNumber"
            headerText="Client Reference #"
            width="140"
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="MatterName"
            headerText="Matter Name"
            width="160"
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="MatterTypeId"
            headerText="Matter Type"
            width="160"
            allowEditing={false}
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={matterTypeDataApi}
            type="string"
            filter={filterMatterType}
          ></ColumnDirective>
          <ColumnDirective
            field="MatterStatusId"
            headerText="Matter Status"
            width="160"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={matterstatusDataApi}
            allowEditing={false}
            type="string"
            filter={filterMatterStatus}
          ></ColumnDirective>
          <ColumnDirective
            field="DateFiled"
            headerText="Date Filed"
            width="160"
            format={format}
            allowEditing={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="DateAssigned"
            headerText="Date Assigned"
            width="160"
            format={format}
            allowEditing={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="ClientNum"
            headerText="Client ID"
            width="160"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="PostureId"
            headerText="Posture Id"
            width="180"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={postureDataApi}
            allowEditing={false}
            visible={false}
            type="string"
            filter={filterPosture}
          ></ColumnDirective>
          <ColumnDirective
            field="DateServed"
            headerText="Date Served"
            format={format}
            width="160"
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="Facts"
            headerText="Facts"
            width="160"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="VehicleYear"
            headerText="Model Year"
            width="160"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="VehicleVinNo"
            headerText="VIN"
            width="120"
            visible={false}
            type="string"
          ></ColumnDirective>
          {/* <ColumnDirective
            dataSource={vehiclModeltypeDataApi}
            foreignKeyValue="Title"
            foreignKeyField="Id"
            field="VehicleModelId"
            headerText="Model"
            width="140"
            visible={false}
            type="string"
            filter={filterModelType}
          ></ColumnDirective> */}
          {/* <ColumnDirective
            field="AllegedLiabilityDefectId"
            headerText="AllegedLiability Defect"
            width="160"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={AllegedLiabilityDefectDataApi}
            allowEditing={false}
            visible={false}
          ></ColumnDirective> */}
          <ColumnDirective
            field="CausesofActionClaimsId"
            headerText="Cases of Action Claims"
            width="220"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={CausesofActionClaimDataApi}
            allowEditing={false}
            visible={false}
            type="string"
            filter={filterCauseOfActionClaims}
          ></ColumnDirective>
          <ColumnDirective
            field="Generaldamagesdescription"
            headerText="General Damage"
            width="200"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="DispositionDate"
            headerText="Deposition Date"
            width="180"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="OutcomeDispositionId"
            headerText="Outcome Disposition"
            width="220"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={outcomedispositionDataApi}
            allowEditing={false}
            visible={false}
            type="string"
            filter={filterOutComeDiposition}
          ></ColumnDirective>
          <ColumnDirective
            field="OutcomeDispositionSpecificId"
            headerText="Outcome Disposition Specific"
            width="270"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={outcomedispositionspecificDataApi}
            allowEditing={false}
            visible={false}
            type="string"
            filter={filterOutComeDipositionSpecific}
          ></ColumnDirective>
          {/* <ColumnDirective
            field="VehiclePurchaseTypeId"
            headerText="Model Purchase Type"
            width="220"
            foreignKeyValue="Title"
            foreignKeyField="Id"
            dataSource={vehiclepurchasetypeDataApi}
            allowEditing={false}
            visible={false}
            type="string"
            filter={filterVehicelPurchaesType}
          ></ColumnDirective> */}
          <ColumnDirective
            field="OtherVehicleSalesInfo"
            headerText="OtherVehicle Sales Info"
            width="220"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="DispositionSummary"
            headerText="Disposition Summary"
            width="220"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="SettlementAmount"
            headerText="Settlement Amount"
            width="200"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="SettlementAmountClientContribution"
            headerText="Settlement Amount Client Contribution"
            width="320"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="TrialStartDate"
            headerText="Trial Start Date"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="TrialVerdictDate"
            headerText="Trial Verdict Date"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="TrialVerdictAmount"
            headerText="Trial Verdict Amount"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="DateOffirstNotice"
            headerText="Date Of First Notice"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="DateClaimSubmitted"
            headerText="Date Claims Submitted"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="DateRemovalFiled"
            headerText="date Removed Filed"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="DateAnswerFiled"
            headerText="Date Answer Filed"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="FactDiscoveryCloseDate"
            headerText="Fact Discovery Close date"
            width="270"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="ExpertDiscoveryCloseDate"
            headerText="Expert Discovery Close date"
            width="270"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="TrialDate"
            headerText="Trial Date"
            width="160"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="InitialSettlementDemand"
            headerText="Initial Settlemnt Demand"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="InitialSettlementOffer"
            headerText="Initial Settlemnt Offer"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="InitialSettlementOfferDate"
            headerText="Initial Settlemnt Offer Date"
            width="270"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="CurrentSettlementOffer"
            headerText="Current Settlemnt Offer"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="DaysOutOfService"
            headerText="Days Out Of Service"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="CurrentSettlementOfferDate"
            headerText="Current Settlemnt Offer Date"
            width="270"
            format={format}
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="SettlementAuthorityRequested"
            headerText="Settlemnt Authority Requested"
            width="270"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="CabuyBackRequestFlag"
            headerText="CA Buy BackRequest Flag"
            width="270"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="PriorClassSettlementFlag"
            headerText="Prior Class Settlement Flag"
            width="270"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="DateSettlementAuthorityRequested"
            headerText="Date Settlement Authority Requested"
            width="320"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="AmountRequested"
            headerText="Amount Requested"
            width="220"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="SettlementAuthorityReceived"
            headerText="Settlemnt Authority Received"
            width="270"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="RiscsalesLeaseContract"
            headerText="RISC Sales Lease Contract"
            width="290"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="DateSettlementAuthorityReceived"
            headerText="Date Settlement Authority Received"
            width="320"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="AmountReceived"
            headerText="Amount Received"
            width="200"
            allowEditing={false}
            visible={false}
            type="number"
          ></ColumnDirective>
          <ColumnDirective
            field="DateReleaseReceived"
            headerText="Date Release Received"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="DismissalFiledDate"
            headerText="Dismissal Filled date"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
            type="date"
          ></ColumnDirective>
          <ColumnDirective
            field="AttorneysFeesandCostsRequested"
            headerText="Attorneys Fees and Cost requested"
            width="320"
            displayAsCheckBox={true}
            type="boolean"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="PunitiveDamagesRequested"
            headerText="Punitive Damges Request"
            width="260"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="FraudClaimsFlag"
            headerText="Fraud Claims Flag"
            width="220"
            type="boolean"
            displayAsCheckBox={true}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="TenderOfDefenseFromDealerFlag"
            headerText="Tender Of Defense From Dealer"
            width="290"
            type="boolean"
            displayAsCheckBox={true}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="DealerName"
            headerText="Dealer Name"
            width="160"
            type="string"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="DateOfTender"
            headerText="Date Of Tender"
            width="160"
            type="date"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="DateOfResponse"
            type="date"
            headerText="Date Of Response"
            width="220"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="DateOfAgreementExecuted"
            type="date"
            headerText="Date Of Agreement Executed"
            width="270"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="PurchaseDate"
            type="date"
            headerText="Purchase Date"
            width="160"
            format={format}
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="CivilPenaltiesFlag"
            displayAsCheckBox={true}
            type="boolean"
            headerText="Civil Penalties Flag"
            width="200"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="CivilPenaltiesEstimate"
            headerText="Civil Penalties Estimate"
            width="220"
            type="number"
            allowEditing={false}
            visible={false}
          ></ColumnDirective>
          <ColumnDirective
            field="IsActive"
            headerText="Status"
            width="160"
            allowEditing={false}
            visible={false}
            displayAsCheckBox={true}
            type="boolean"
          ></ColumnDirective>
          <ColumnDirective
            field="Created"
            headerText="Created"
            width="160"
            format={formatAmPm}
            allowEditing={false}
            visible={false}
            type="datetime"
          ></ColumnDirective>
          <ColumnDirective
            field="CreatedBy"
            headerText="Created By"
            width="160"
            allowEditing={false}
            visible={false}
            type="string"
          ></ColumnDirective>
          <ColumnDirective
            field="Modified"
            headerText="Modified"
            width="160"
            format={formatAmPm}
            allowEditing={false}
            visible={false}
            type="datetime"
          ></ColumnDirective>
          <ColumnDirective
            field="ModifiedBy"
            headerText="Modified By"
            width="160"
            allowEditing={false}
            visible={false}
            type="string"
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
        </>

  );
}
export default Cases;
