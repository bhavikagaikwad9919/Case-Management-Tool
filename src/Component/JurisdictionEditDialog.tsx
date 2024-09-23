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
} from "@syncfusion/ej2-data";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const {
    REACT_APP_DATE_FORMAT,
    REACT_APP_BASE_URL,
    REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function JurisdictionEditDialog(props: any) {

    const params: any = useParams();
    const id: any = params.id
    const idFromUrl = parseInt(id)

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        CourtName: props.CourtName,
        CourtDescription: props.CourtDescription,
        AddressLine1: props.AddressLine1,
        CourtTypeId: props.CourtTypeId,
        AddressLine2: props.AddressLine2,
        City: props.City,
        PostalCode: props.PostalCode,
        StateId: props.StateId,
        IsActive: props.IsActive,
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

    };

    return (
        <div>
            <div>
                <div className="mt-5 ml-6">
                    <div className="container">

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>

                                <h2 className="heading">Court Type</h2>
                                <DropDownListComponent
                                    name="CourtTypeId"
                                    placeholder="Select Court Type"
                                    value={localState.CourtTypeId}
                                    dataSource={props.courtTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CourtTypeId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />

                            </div>

                            <div className="lg:ml-3">
                                <h2 className="heading">Court Name</h2>
                                <TextBoxComponent
                                    name="CourtName"
                                    placeholder="Enter Court Name"
                                    value={localState.CourtName}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("CourtName", e.target.value);
                                    }}
                                />
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-18 p-2">

                            <h2 className="heading">Court Description</h2>
                            <TextBoxComponent
                                placeholder="Enter Court Description"
                                multiline={true}
                                className="e-multi-line-input"
                                name="CourtDescription"
                                id="datetimepicker"
                                value={localState.CourtDescription}
                                data-msg-containerid="errroForDateFiled"
                                onChange={(e: any) => {
                                    handlelocalStateChange("CourtDescription", e.target.value);
                                }}
                            />

                        </div>

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">Address Line 1</h2>
                                <TextBoxComponent
                                    name="AddressLine1"
                                    id="datetimepicker"
                                    placeholder="Enter Address Line 1"
                                    value={localState.AddressLine1}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("AddressLine1", e.target.value);
                                    }}
                                />
                            </div>

                            <div className="lg:ml-3">

                                <h2 className="heading">Address Line 2</h2>
                                <TextBoxComponent
                                    name="AddressLine2"
                                    placeholder="Enter Address Line 2"
                                    value={localState.AddressLine2}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("AddressLine2", e.target.value);
                                    }}
                                />
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">City</h2>
                                <TextBoxComponent
                                    name="City"
                                    placeholder="Enter City"
                                    value={localState.City}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("City", e.target.value);
                                    }}
                                />
                            </div>

                            <div className="lg:ml-3">
                            <h2 className="heading">State</h2>
                            <DropDownListComponent
                                    name="StateId"
                                    placeholder="Select State"
                                    value={localState.StateId}
                                    dataSource={props.StateDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("StateId", e.target.value);
                                    }}
                                    fields={{
                                        text: "StateName",
                                        value: "Id",
                                    }}
                                />
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">Postal Code</h2>
                                <TextBoxComponent
                                    name="PostalCode"
                                    placeholder="Enter Postal Code"
                                    value={localState.PostalCode}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("PostalCode", e.target.value);
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
export default memo(JurisdictionEditDialog)
