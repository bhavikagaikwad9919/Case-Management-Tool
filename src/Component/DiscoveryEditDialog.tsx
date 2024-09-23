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

function DiscoveryEditDialog(props: any) {

    const params: any = useParams();
    const id: any = params.id
    const idFromUrl = props.idFromUrl

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        ExpertDiscovery: props.ExpertDiscovery,
        Description: props.Description,
        DateServed: props.DateServed,
        DiscoveryTypeId: props.DiscoveryTypeId,
        DateDue: props.DateDue,
        DateCompleted: props.DateCompleted,
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

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">Discovery Type</h2>
                                <DropDownListComponent
                                    name="DiscoveryTypeId"
                                    placeholder="Select Court Type"
                                    value={localState.DiscoveryTypeId}
                                    dataSource={props.DiscoveryTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DiscoveryTypeId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />

                            </div>

                            <div className="lg:ml-3">
                                <h2 className="heading">Expert Discovery</h2>
                                <CheckBoxComponent
                                    name="ExpertDiscovery"
                                    checked={localState.ExpertDiscovery}
                                />
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">Date Served</h2>
                                <DatePickerComponent
                                    name="DateServed"
                                    id="datetimepicker"
                                    placeholder="Select Date Served"
                                    value={localState.DateServed}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DateServed", e.target.value);
                                    }}
                                />
                            </div>

                            <div className="lg:ml-3">

                                <h2 className="heading">Date Due</h2>
                                <DatePickerComponent
                                    name="DateDue"
                                    id="datetimepicker"
                                    placeholder="Select Date Due"
                                    value={localState.DateDue}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DateDue", e.target.value);
                                    }}
                                />
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-2 p-2">

                            <div>
                                <h2 className="heading">Date Completed</h2>
                                <DatePickerComponent
                                    id="datetimepicker"
                                    name="DateCompleted"
                                    placeholder="Select Date Completed"
                                    value={localState.DateCompleted}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DateCompleted", e.target.value);
                                    }}
                                />
                            </div>


                        </div>

                        <div className="grid lg:grid-cols-18 p-2">

                            <h2 className="heading">Description</h2>
                            <TextBoxComponent
                                placeholder="Enter Description"
                                multiline={true}
                                className="e-multi-line-input"
                                name="Description"
                                id="datetimepicker"
                                value={localState.Description}
                                data-msg-containerid="errroForDateFiled"
                                onChange={(e: any) => {
                                    handlelocalStateChange("Description", e.target.value);
                                }}
                            />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default memo(DiscoveryEditDialog)
