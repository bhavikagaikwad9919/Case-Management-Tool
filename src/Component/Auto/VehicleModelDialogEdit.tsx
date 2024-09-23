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

function VehicleModelDialogEdit(props: any) {

    const params: any = useParams();
    const id: any = params.id
    const idFromUrl = parseInt(id)

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        Title: props.Title,
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
                <div className="mt-1 ml-6">
                    <div className="container">

                        <div className="grid lg:grid-cols-1 p-2">

                            <h2 className="heading">Title</h2>
                            <TextBoxComponent
                                placeholder="Enter Court Description"
                                multiline={true}
                                className="e-multi-line-input"
                                name="Title"
                                id="datetimepicker"
                                value={localState.Title}
                                data-msg-containerid="errroForDateFiled"
                                onChange={(e: any) => {
                                    handlelocalStateChange("Title", e.target.value);
                                }}
                            />
                            <div className="mt-3">
                                <h2 className="heading">Status</h2>
                                <CheckBoxComponent
                                    name="IsActive"
                                    checked={localState.IsActive}
                                />
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}
export default memo(VehicleModelDialogEdit)
