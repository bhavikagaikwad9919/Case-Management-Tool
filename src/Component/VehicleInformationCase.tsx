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
import "../App.css"
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import VehicleInformationEditDilog from "./VehicleInformationEditDilog";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


const format: any = { type: 'dateTime', format: 'M/d/y' };
const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
const pageOptions = { currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25", "50", "100", "All"] };

const {
    REACT_APP_BASE_URL,
} = process.env;

export function CourtInformation(props: any) {
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

    const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)
    //console.log("token",token)


    const dataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/VehicleInfo/`,
        insertUrl: `${REACT_APP_BASE_URL}/VehicleInfo`,
        updateUrl: `${REACT_APP_BASE_URL}/VehicleInfo`,
        removeUrl: `${REACT_APP_BASE_URL}/VehicleInfo`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const InjuredPartyDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/InjuredParty`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const VehicleModelDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/VehicleModel`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const VehiclePurchaseTypeDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/VehiclePurchaseType`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const riscstatusDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/riscstatus`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });





    //   const filterjurisdiction = {
    //     ui: {
    //       create: (args: any) => {
    //         console.log("args1 create", args);
    //         const flValInput = createElement("input", { className: "flm-input" });
    //         args.target.appendChild(flValInput);
    //         dropInstance = new DropDownList({
    //           dataSource: new DataManager({
    //             url: `${REACT_APP_BASE_URL}/Jurisdiction`,
    //             adaptor: new ODataV4Adaptor(),
    //             crossDomain: true,
    //             headers: [{ Authorization: `Bearer ${token}` }],
    //           }),
    //           fields: { text: "CourtName", value: "Id" },
    //           placeholder: "Select a value",
    //           popupHeight: "200px",
    //         });
    //         dropInstance.appendTo(flValInput);
    //       },
    //       read: (args: any) => {
    //         console.log("args2 read", args);
    //         args.fltrObj.filterByColumn(
    //           args.column.field,
    //           args.operator,
    //           dropInstance.text
    //         );
    //       },
    //       write: (args: any) => {
    //         console.log("args3 write", args);
    //         dropInstance.text = args.filteredValue || "";
    //       },
    //     }
    //   };



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
            dialog.header = args.requestType === 'add' ? "Add Vehicle Info" : "Edit Vehicle Info"
            dialog.width = '700px';
            dialog.height = '620px';
        }
        // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

        //   const dialog = args.dialog;

        //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
        // }



    }



    const dialogTemplate = (props: any) => {
        return (<VehicleInformationEditDilog {...props} idFromUrl={idFromUrl} VehiclePurchaseTypeDataFromApi={VehiclePurchaseTypeDataFromApi} VehicleModelDataFromApi={VehicleModelDataFromApi} InjuredPartyDataFromApi={InjuredPartyDataFromApi} riscstatusDataFromApi={riscstatusDataFromApi} />);
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
                            field="InjuredPartyId"
                            headerText="Plaintiff"
                            width="140"
                            dataSource={InjuredPartyDataFromApi}
                            foreignKeyValue="DisplayName"
                            foreignKeyField="Id"
                        //   filter={filterjurisdiction}
                        ></ColumnDirective>
                        <ColumnDirective
                            field="VehicleYear"
                            headerText="Modle Year"
                            width="160"
                            type="number"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="VehicleModelId"
                            headerText="Vehicle Model"
                            width="140"
                            dataSource={VehicleModelDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                        //   filter={filterjurisdiction}           
                        ></ColumnDirective>
                        <ColumnDirective
                            field="VehicleVinNo"
                            headerText="VIN"
                            width="160"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="VehiclePurchaseTypeId"
                            headerText="New/Used/CPO"
                            width="200"
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                            //   filter={filterjurisdiction}
                            dataSource={VehiclePurchaseTypeDataFromApi}
                        ></ColumnDirective>
                        <ColumnDirective
                            field="DealerName"
                            headerText="Dealer Name"
                            width="180"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="TenderOfDefenseFromDealerFlag"
                            headerText="Tender Of Defense From Dealer"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="PurchaseDate"
                            headerText="Purchase Date"
                            width="160"
                            type="date"
                            format={format}
                        ></ColumnDirective>
                        <ColumnDirective
                            field="PriorClassSettlementFlag"
                            headerText="Class Vehicle"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
                        ></ColumnDirective>
                         <ColumnDirective
                            field="ClassVehicleOptOut"
                            headerText="Class Vehicle OptOut"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
                        ></ColumnDirective>
                           <ColumnDirective
                            field="Riscavailable"
                            headerText="Risc available"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="RiscstatusId"
                            headerText="Risc status"
                            width="140"
                            dataSource={riscstatusDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                        //   filter={filterjurisdiction}           
                        ></ColumnDirective>
                            <ColumnDirective
                            field="CabuyBackRequestFlag"
                            headerText="Pre-Lit Buyback Request/Response"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="RepairHistory"
                            headerText="Repair History"
                            width="180"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="DaysOutOfService"
                            headerText="Days Out Of Service"
                            width="180"
                            type="number"
                        ></ColumnDirective>
                         <ColumnDirective
                            field="OtherVehicleSalesInfo"
                            headerText="Other Vehicle Info"
                            width="180"
                            type="string"
                        ></ColumnDirective>
                         <ColumnDirective
                            field="RiscsalesLeaseContract"
                            headerText="Risc sales Lease Contract"
                            displayAsCheckBox={true}
                            width="250"
                            type="boolean"
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
