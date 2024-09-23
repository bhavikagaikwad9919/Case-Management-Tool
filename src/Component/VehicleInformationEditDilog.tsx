import React, { useState, memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import {
    ButtonComponent,
    CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import {
    DataManager,
    ODataV4Adaptor,
    Query,
    ReturnOption,
} from "@syncfusion/ej2-data";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useDispatch, useSelector } from 'react-redux'

const {
    REACT_APP_DATE_FORMAT,
    REACT_APP_BASE_URL,
    REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function CourtInformatiionEditDilog(props: any) {
    const params: any = useParams();
    const id: any = params.id;
    const idFromUrl = props.idFromUrl;

    const queryActive = new Query().where("CaseInformationId", "equal", idFromUrl)


    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        InjuredPartyId: props?.InjuredPartyId ?? null,
        VehicleModelId: props?.VehicleModelId ?? null,
        VehiclePurchaseTypeId: props?.VehiclePurchaseTypeId ?? null,
        VehicleVinNo: props?.VehicleVinNo ?? null,
        OtherVehicleSalesInfo: props?.OtherVehicleSalesInfo ?? null,
        PurchaseDate: props?.PurchaseDate ?? null,
        VehicleYear: props?.VehicleYear ?? null,
        DaysOutOfService: props?.DaysOutOfService ?? null,
        CabuyBackRequestFlag: props.CabuyBackRequestFlag ?? false,
        RiscsalesLeaseContract: props.RiscsalesLeaseContract ?? false,
        PriorClassSettlementFlag: props.PriorClassSettlementFlag ?? false,
        ClassVehicleOptOut: props?.ClassVehicleOptOut ?? false,
        DealerName: props?.DealerName ?? null,
        TenderOfDefenseFromDealerFlag: props?.TenderOfDefenseFromDealerFlag ?? false,
        Riscavailable: props?.Riscavailable ?? false,
        RiscstatusId: props?.RiscstatusId ?? null,
        RepairHistory: props?.RepairHistory ?? null
    });

    const user: any = localStorage.getItem("user");
    const token = JSON.parse(user)?.accessToken;

    const handlelocalStateChange = (name: string, value: any) => {
        setlocalState((prevState: any, props: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = (e: any) => {
        e.preventDefault();
        console.log("local stetate data", localState);
        // console.log("localstate", localState);
        // axios
        // .patch(`${REACT_APP_BASE_URL}/casecourtinformation/${props.Id}`, localState)
        // .then((response : any) => {
        //   if (response.status === 200) {
        //     // alert("Successfully Saved")
        //     alert("Successfully Saved")
        //   }
        // })
        // .catch((error : any) => {
        //  alert("Something went wrong")
        // });
    };

    // const jurisdictionDataFromApi = new DataManager({
    //   url: `${REACT_APP_BASE_URL}/Jurisdiction`,
    //   adaptor: new ODataV4Adaptor(),
    //   crossDomain: true,
    //   headers: [{ Authorization: `Bearer ${token}` }],
    // });

    return (
        <div>
            <div>
                <div className="">
                    <div className="">
                        <div className="grid p-2 hidden">
                            <div>
                                <h2 className="heading">Case Information Id</h2>
                                <TextBoxComponent
                                    name="CaseInformationId"
                                    type="number"
                                    disabled={true}
                                    value={localState.CaseInformationId}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CaseInformationId", e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Plaintiff</h2>
                                <DropDownListComponent
                                    name="InjuredPartyId"
                                    placeholder="Select Plaintiff"
                                    value={localState.InjuredPartyId}
                                    dataSource={props.InjuredPartyDataFromApi}
                                    query={queryActive}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("InjuredPartyId", e.target.value);
                                    }}
                                    fields={{
                                        text: "FirstName",
                                        value: "Id",
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Vehicle Model</h2>
                                <DropDownListComponent
                                    name="VehicleModelId"
                                    placeholder="Select Vehicle Model"
                                    value={localState.VehicleModelId}
                                    dataSource={props.VehicleModelDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("VehicleModelId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">New / Used / CPO</h2>
                                <DropDownListComponent
                                    name="VehiclePurchaseTypeId"
                                    placeholder="Select Vehicle Purchase Type"
                                    value={localState.VehiclePurchaseTypeId}
                                    dataSource={props.VehiclePurchaseTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("VehiclePurchaseTypeId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Risc status</h2>
                                <DropDownListComponent
                                    name="RiscstatusId"
                                    placeholder="Select Risc status "
                                    value={localState.RiscstatusId}
                                    dataSource={props.riscstatusDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("RiscstatusId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                            </div>
                        </div>



                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Model Year</h2>
                                <TextBoxComponent
                                    placeholder="Enter Model Year"
                                    name="VehicleYear"
                                    type="number"
                                    value={localState.VehicleYear}
                                    onChange={(e: any) => {
                                        handlelocalStateChange(
                                            "VehicleYear",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Days Out Of Service</h2>
                                <TextBoxComponent
                                    placeholder="Enter Days Out Of Servicer"
                                    name="DaysOutOfService"
                                    type="number"
                                    value={localState.DaysOutOfService}
                                    onChange={(e: any) => {
                                        handlelocalStateChange(
                                            "DaysOutOfService",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Dealer Name</h2>
                                <TextBoxComponent
                                    placeholder="Enter Dealer Name"
                                    name="DealerName"
                                    type="string"
                                    value={localState.DealerName}
                                    onChange={(e: any) => {
                                        handlelocalStateChange(
                                            "DealerName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">VIN</h2>
                                <TextBoxComponent
                                    name="VehicleVinNo"
                                    id="datetimepicker"
                                    type="string"
                                    placeholder="Enter Vehicle VinNo"
                                    value={localState.VehicleVinNo}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("VehicleVinNo", e.target.value);
                                    }}
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <div className="">
                                    <h2 className="heading">Purchase Date</h2>
                                    <DatePickerComponent
                                        name="PurchaseDate"
                                        id="datetimepicker"
                                        placeholder="Select Purchase Date"
                                        value={localState.PurchaseDate}
                                        data-msg-containerid="errroForDateFiled"
                                        onChange={(e: any) => {
                                            handlelocalStateChange("PurchaseDate", e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Pre-Lit Buyback Request / Response</h2>
                                <CheckBoxComponent
                                    name="CabuyBackRequestFlag"
                                    checked={localState.CabuyBackRequestFlag}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Risc sales Lease Contract</h2>
                                <CheckBoxComponent
                                    name="RiscsalesLeaseContract"
                                    type="boolean"
                                    checked={localState.RiscsalesLeaseContract}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Class Vehicle</h2>
                                <CheckBoxComponent
                                    name="PriorClassSettlementFlag"
                                    type="boolean"
                                    checked={localState.PriorClassSettlementFlag}
                                />
                            </div>

                            <div className="ml-3">
                                <h2 className="heading">Tender Of Defense From Dealer Flag</h2>
                                <CheckBoxComponent
                                    name="TenderOfDefenseFromDealerFlag"
                                    type="boolean"
                                    checked={localState.TenderOfDefenseFromDealerFlag}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Class Vehicle OptOut</h2>
                                <CheckBoxComponent
                                    name="ClassVehicleOptOut"
                                    type="boolean"
                                    checked={localState.ClassVehicleOptOut}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Risc available</h2>
                                <CheckBoxComponent
                                    name="Riscavailable"
                                    type="boolean"
                                    checked={localState.Riscavailable}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <div>
                                    <div className="text-sm">Other Vehicle Info </div>
                                </div>
                                <div className="">
                                    <TextBoxComponent
                                        multiline={true}
                                        name="OtherVehicleSalesInfo"
                                        className="e-multi-line-input"
                                        value={localState.OtherVehicleSalesInfo}
                                        onChange={(e: any) => {
                                            handlelocalStateChange(
                                                "OtherVehicleSalesInfo",
                                                e.target.value
                                            );
                                        }}
                                        placeholder="Enter Other Vehicle Sales Info"
                                        data-msg-containerid="errroForName"
                                    />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div>
                                    <div className="text-sm">Repair History </div>
                                </div>
                                <div className="">
                                    <TextBoxComponent
                                        multiline={true}
                                        name="RepairHistory"
                                        className="e-multi-line-input"
                                        value={localState.RepairHistory}
                                        onChange={(e: any) => {
                                            handlelocalStateChange(
                                                "RepairHistory",
                                                e.target.value
                                            );
                                        }}
                                        placeholder="Enter Repair History"
                                        data-msg-containerid="errroForName"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CourtInformatiionEditDilog
