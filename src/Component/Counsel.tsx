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
import CounselEditDilog from "./CounselEditDilog";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


const format: any = { type: 'dateTime', format: 'M/d/y' };
const formatAmPm: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
const pageOptions = { currentPage: 1, pageSize: 25, pageCount: 20, pageSizes: ["25", "50", "100", "All"] };

const {
    REACT_APP_BASE_URL,
} = process.env;

export function Counsel(props: any) {
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
        url: `${REACT_APP_BASE_URL}/CaseInfoCounsel/`,
        insertUrl: `${REACT_APP_BASE_URL}/CaseInfoCounsel`,
        updateUrl: `${REACT_APP_BASE_URL}/CaseInfoCounsel`,
        removeUrl: `${REACT_APP_BASE_URL}/CaseInfoCounsel`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const CounselAttorneyDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/CounselAttorney`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const CounselTypeDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/CounselType`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const CounselForTypeDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/CounselFor`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const CounselRoleDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/CounselRole`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const CounselPartyStatusDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/CounselPartyStatus`,
        adaptor: new ODataV4Adaptor(),
        crossDomain: true,
        headers: [{ Authorization: `Bearer ${token}` }],
    });

    const InjuredPartyDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/injuredParty`,
        adaptor: new ODataV4Adaptor(),
        headers: [{ Authorization: `Bearer ${token}` }],
        offline: true,
    });

    const CounselDataFromApi = new DataManager({
        url: `${REACT_APP_BASE_URL}/Counsel`,
        adaptor: new ODataV4Adaptor(),
        headers: [{ Authorization: `Bearer ${token}` }],
        offline: true,
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
            dialog.header = args.requestType === 'add' ? "Add Counsel Info" : "Edit Counsel Info"
            dialog.width = '700px';
            dialog.height = '420px';
        }
        // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

        //   const dialog = args.dialog;

        //   dialog.header = args.requestType === "beginEdit" ? "Edit Group event category - " + args.rowData["EventCategoryName"] : "New Group event category";
        // }



    }



    const dialogTemplate = (prop: any) => {
        return (<CounselEditDilog {...prop} CounselDataFromApi={CounselDataFromApi} InjuredPartyDataFromApi={InjuredPartyDataFromApi} caseInfoId={idFromUrl} CounselAttorneyDataFromApi={CounselAttorneyDataFromApi} CounselTypeDataFromApi={CounselTypeDataFromApi} CounselForTypeDataFromApi={CounselForTypeDataFromApi} CounselRoleDataFromApi={CounselRoleDataFromApi} CounselPartyStatusDataFromApi={CounselPartyStatusDataFromApi}
        />);
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
                            field="CounselAttorneyId"
                            headerText="Counsel Attorney"
                            width="200"
                            dataSource={CounselAttorneyDataFromApi}
                            foreignKeyValue="DisplayName"
                            foreignKeyField="Id"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="PlaintiffId"
                            headerText="Plaintiff"
                            width="200"
                            dataSource={InjuredPartyDataFromApi}
                            foreignKeyValue="FirstName"
                            foreignKeyField="Id"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="CounselId"
                            headerText="LawFirm"
                            width="200"
                            dataSource={CounselDataFromApi}
                            foreignKeyValue="CounselLawFirm"
                            foreignKeyField="Id"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="CounselTypeId"
                            headerText="Counsel Type"
                            width="140"
                            dataSource={CounselTypeDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                            type="string"
                        //   filter={filterjurisdiction}           
                        ></ColumnDirective>
                        <ColumnDirective
                            field="CounselForId"
                            headerText="Counsel For"
                            width="160"
                            dataSource={CounselForTypeDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="CounselRoleId"
                            headerText="Counsel Role"
                            width="200"
                            dataSource={CounselRoleDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                            type="string"
                        ></ColumnDirective>
                        <ColumnDirective
                            field="CounselPartyStatusId"
                            headerText="Counsel Party Status"
                            width="220"
                            dataSource={CounselPartyStatusDataFromApi}
                            foreignKeyValue="Title"
                            foreignKeyField="Id"
                            type="string"
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

export default memo(Counsel);