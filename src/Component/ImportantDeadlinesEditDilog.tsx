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

const {
    REACT_APP_DATE_FORMAT,
    REACT_APP_BASE_URL,
    REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function ImportantDeadlinesEditDilog(props: any) {
    const params: any = useParams();
    const id: any = params.id;
    const idFromUrl = parseInt(id);

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        DeadlineDateDesc: props.DeadlineDateDesc ?? null,
        DeadlineDate: props.DeadlineDate ?? null,
        DeadlineDateTypeId: props.DeadlineDateTypeId ?? null,
        IsActive: props.IsActive ?? false,
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

                                <h2 className="heading">Deadline Date Type</h2>
                                <DropDownListComponent
                                    name="DeadlineDateTypeId"
                                    placeholder="Select Deadline Date Type"
                                    value={localState.DeadlineDateTypeId}
                                    dataSource={props.DeadlineDateTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DeadlineDateTypeId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />

                            </div>

                            <div className="ml-3">


                                <h2 className="heading">Deadline Date</h2>
                                <DatePickerComponent
                                    name="DeadlineDate"
                                    id="datetimepicker"
                                    placeholder="Select Deadline Date"
                                    value={localState.DeadlineDate}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DeadlineDate", e.target.value);
                                    }}
                                />

                            </div>
                        </div>

                        <div className="grid lg:grid-cols-15 p-2">


                                <h2 className="heading">Deadline DateDesc</h2>
                                <TextBoxComponent
                                    name="DeadlineDateDesc"
                                    placeholder="Enter Deadline DateDesc"
                                    multiline={true}
                                    value={localState.DeadlineDateDesc}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DeadlineDateDesc", e.target.value);
                                    }}
                                />
                            </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
export default memo(ImportantDeadlinesEditDilog);