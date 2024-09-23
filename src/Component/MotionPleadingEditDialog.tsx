import React, { useState, memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const {
    REACT_APP_DATE_FORMAT,
    REACT_APP_BASE_URL,
    REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function MotionPleadingEditDialog(props: any) {
    const params: any = useParams();
    const id: any = params.id;
    const idFromUrl = props.idFromUrl;

    const [localState, setlocalState] = useState<any>({
        CaseInformationId: idFromUrl,
        FilingParty: props.FilingParty ?? null,
        Outcome: props.Outcome ?? null,
        DateDecided: props.DateDecided ?? null,
        CurrentCourt: props.CurrentCourt ?? false,
        DateFiled: props.DateFiled ?? null,
        MotionPleadingTypeId: props.MotionPleadingTypeId ?? null,
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
                            <h2 className="heading">Date Filed</h2>
                                <DatePickerComponent
                                    placeholder="Select Date Filed"
                                    name="DateFiled"
                                    value={localState.DateFiled}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DateFiled", e.target.value);
                                    }}
                                />

                                
                            </div>

                            <div className="ml-3">

                            <h2 className="heading">Date Decided</h2>
                                <DatePickerComponent
                                    name="DateDecided"
                                    id="datetimepicker"
                                    placeholder="Select Date Decided"
                                    value={localState.DateDecided}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("DateDecided", e.target.value);
                                    }}
                                />
                               
                            </div>
                        </div>

                        <div className="grid grid-cols-2 p-2">
                            <div className="">

                            <h2 className="heading">Motion Pleading Type</h2>
                                <DropDownListComponent
                                    name="MotionPleadingTypeId"
                                    placeholder="Select Motion Pleading Type"
                                    value={localState.MotionPleadingTypeId}
                                    dataSource={props.motionPleadingTypeDataFromApi}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("MotionPleadingTypeId", e.target.value);
                                    }}
                                    fields={{
                                        text: "Title",
                                        value: "Id",
                                    }}
                                />
                                
                            </div>
                            <div className="ml-3">
                            <h2 className="heading">Filing Party</h2>
                                <TextBoxComponent
                                    name="FilingParty"
                                    placeholder="Enter Filing Party"
                                    value={localState.FilingParty}
                                    onChange={(e: any) => {
                                        handlelocalStateChange("FilingParty", e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-15 p-2">
                            <div className="">
                            <h2 className="heading">OutCome</h2>
                                <TextBoxComponent
                                    name="Outcome"
                                    id="datetimepicker"
                                    placeholder="Enter OutCome"
                                    multiline={true}
                                    className="e-multi-line-input"
                                    value={localState.Outcome}
                                    data-msg-containerid="errroForDateFiled"
                                    onChange={(e: any) => {
                                        handlelocalStateChange("Outcome", e.target.value);
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
export default memo(MotionPleadingEditDialog);
