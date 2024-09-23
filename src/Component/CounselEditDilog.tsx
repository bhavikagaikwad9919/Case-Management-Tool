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

function CounselEditDilog(props: any) {

    const queryActive = new Query().where("CaseInformationId", "equal", props?.caseInfoId)

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: props?.caseInfoId ?? null,
        CounselId: props?.CounselId ?? null,
        PlaintiffId: props?.PlaintiffId ?? null,
        CounselAttorneyId: props?.CounselAttorneyId ?? null,
        CounselTypeId: props?.CounselTypeId ?? null,
        CounselForId: props?.CounselForId ?? null,
        CounselRoleId: props?.CounselForId ?? null,
        CounselPartyStatusId: props?.CounselForId ?? null,
    });

    const user: any = localStorage.getItem("user");
    const token = JSON.parse(user)?.accessToken;

    const handlelocalStateChange = (name: string, value: any) => {
        setlocalState((prevState: any, props: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const queryAttorney = new Query().where("CounselId", "equal", localState?.CounselId)

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
                                    name="PlaintiffId"
                                    placeholder="Select Plaintiff"
                                    value={localState.PlaintiffId}
                                    dataSource={props.InjuredPartyDataFromApi}
                                    query={queryActive}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("PlaintiffId", e.target.value);
                                    }}
                                    fields={{
                                        text: "FirstName",
                                        value: "Id",
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Counsel Type</h2>
                                <DropDownListComponent
                                    name="CounselTypeId"
                                    placeholder="Select Counsel Type"
                                    value={localState.CounselTypeId}
                                    dataSource={props.CounselTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselTypeId", e.target.value);
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
                                <h2 className="heading">LawFirm</h2>
                                <DropDownListComponent
                                    name="CounselId"
                                    placeholder="Select LawFirm"
                                    value={localState.CounselId}
                                    dataSource={props.CounselDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselId", e.target.value);
                                    }}
                                    fields={{
                                        text: "CounselLawFirm",
                                        value: "Id",
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Counsel Attorney</h2>
                                <DropDownListComponent
                                    name="CounselAttorneyId"
                                    placeholder="Select Counsel Attorney"
                                    value={localState.CounselAttorneyId}
                                    query={queryAttorney}
                                    dataSource={props.CounselAttorneyDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselAttorneyId", e.target.value);
                                    }}
                                    fields={{
                                        text: "DisplayName",
                                        value: "Id",
                                    }}
                                />

                            </div>

                        </div>
                        <div className="grid grid-cols-2 p-2">
                            <div className="">
                                <h2 className="heading">Counsel For</h2>
                                <DropDownListComponent
                                    name="CounselForId"
                                    placeholder="Select Counsel For"
                                    value={localState.CounselForId}
                                    dataSource={props.CounselForTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselForId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                            </div>
                            <div className="ml-3">
                                <h2 className="heading">Counsel Role</h2>
                                <DropDownListComponent
                                    name="CounselRoleId"
                                    placeholder="Select Counsel Role"
                                    value={localState.CounselRoleId}
                                    dataSource={props.CounselRoleDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselRoleId", e.target.value);
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
                                <h2 className="heading">Counsel Party Status</h2>
                                <DropDownListComponent
                                    name="CounselPartyStatusId"
                                    placeholder="Select Counsel Party Status"
                                    value={localState.CounselPartyStatusId}
                                    dataSource={props.CounselPartyStatusDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CounselPartyStatusId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default CounselEditDilog
