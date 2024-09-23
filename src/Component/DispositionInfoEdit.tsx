import React, { useState, useEffect, memo } from 'react'
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MultiSelectComponent, Inject } from "@syncfusion/ej2-react-dropdowns";
import {
    CheckBoxSelection,
    DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import {
    ButtonComponent,
    CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const { REACT_APP_BASE_URL } = process.env;

export const DispositionInfoEdit = (props: any) => {
    const { rowData } = props;
    const params: any = useParams();
    const id: any = params.id;
    const idFromUrl = rowData.Id;

    const userType = useSelector((state: any) => state.users.userType)
    const [localStateContent, setlocalStateContent] = useState<any>({
        DispositionDate: rowData.DispositionDate ?? "",
        DispositionSummary: rowData.DispositionSummary ?? "",
        TrialStartDate: rowData.TrialStartDate ?? "",
        TrialVerdictDate: rowData.TrialVerdictDate ?? "",
        TrialVerdictAmount: rowData.TrialVerdictAmount ? rowData.TrialVerdictAmount : "",
        OutcomeDispositionId: rowData.OutcomeDispositionId ? rowData.OutcomeDispositionId : "",
        OutcomeDispositionSpecificId: rowData.OutcomeDispositionSpecificId ? rowData.OutcomeDispositionSpecificId : "",
    });

    useEffect(() => {
        setlocalStateContent({
            DispositionDate: rowData.DispositionDate ?? "",
            DispositionSummary: rowData.DispositionSummary ?? "",
            TrialStartDate: rowData.TrialStartDate ?? "",
            TrialVerdictDate: rowData.TrialVerdictDate ?? "",
            TrialVerdictAmount: rowData.TrialVerdictAmount ? rowData.TrialVerdictAmount : "",
            OutcomeDispositionId: rowData.OutcomeDispositionId ? rowData.OutcomeDispositionId : "",
            OutcomeDispositionSpecificId: rowData.OutcomeDispositionSpecificId ? rowData.OutcomeDispositionSpecificId : "",
        })
    }, [rowData])

    const [filteredOutcomeDispositionSpecificData, setfilteredOutcomeDispositionSpecificData,] = useState([]);

    const handlelocalStateContentChange = (name: string, value: any) => {
        setlocalStateContent((prevState: any, props: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const filterOutcomeDispositionSpecific = (id: any) => {
        setfilteredOutcomeDispositionSpecificData(
            props.outcomedispositionspecificdataFromApi.filter((item: any) => {
                if (id == item?.OutcomeDispositionId) {
                    return true;
                }
            })
        );
    };

    useEffect(() => {
        if (localStateContent?.OutcomeDispositionId) {
            filterOutcomeDispositionSpecific(localStateContent?.OutcomeDispositionId);
        }
    }, [localStateContent?.OutcomeDispositionId]);

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Outcome Disposition:</div>
                        </div>
                        <div className="">
                            <DropDownListComponent
                                id="ddlelement"
                                dataSource={props.OutcomedispositiondataFromApi}
                                value={localStateContent.OutcomeDispositionId}
                                placeholder="Select Outcome Disposition"
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "OutcomeDispositionId",
                                        e.target.value
                                    );
                                }}
                                fields={{
                                    text: "Title",
                                    value: "Id",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Outcome Disposition Specific:</div>
                        </div>
                        <div className="">
                            <DropDownListComponent
                                id="ddlelement"
                                dataSource={filteredOutcomeDispositionSpecificData}
                                value={localStateContent.OutcomeDispositionSpecificId}
                                placeholder="Select Outcome Disposition Specific"
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "OutcomeDispositionSpecificId",
                                        e.target.value
                                    );
                                }}
                                fields={{
                                    text: "Title",
                                    value: "Id",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Disposition Date:</div>
                        </div>
                        <div className="">
                            <DatePickerComponent
                                value={localStateContent.DispositionDate}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "DispositionDate",
                                        e.target.value
                                    );
                                }}
                                id="datetimepicker"
                                placeholder="Select Disposition Date"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Trial Verdict Amount:</div>
                        </div>
                        <div className="">
                            <TextBoxComponent
                                type="number"
                                value={localStateContent.TrialVerdictAmount}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "TrialVerdictAmount",
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter Trial Verdict Amount"
                                data-msg-containerid="errroForName"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Trial Start Date:</div>
                        </div>
                        <div className="">
                            <DatePickerComponent
                                id="datetimepicker"
                                placeholder="Select Trial Start Date"
                                value={localStateContent.TrialStartDate}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "TrialStartDate",
                                        e.target.value
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Trial verdict date:</div>
                        </div>
                        <div className="">
                            <DatePickerComponent
                                id="datetimepicker"
                                placeholder="Select Trial verdict date"
                                value={localStateContent.TrialVerdictDate}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "TrialVerdictDate",
                                        e.target.value
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Disposition Summary:</div>
                        </div>
                        <div className="">
                            <TextBoxComponent
                                multiline={true}
                                className="e-multi-line-input"
                                value={localStateContent.DispositionSummary}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "DispositionSummary",
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter Diposition Summary"
                                data-msg-containerid="errroForName"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="p-2">
                <div className="flex justify-end">
                    <div className="m-2">
                        <ButtonComponent onClick={async (e: any) => {
                            e.preventDefault();
                            let newBody: any = {}

                            if (localStateContent.DispositionDate) {
                                newBody.DispositionDate = localStateContent.DispositionDate
                            }
                            if (localStateContent.DispositionSummary) {
                                newBody.DispositionSummary = localStateContent.DispositionSummary
                            }
                            if (localStateContent.TrialStartDate) {
                                newBody.TrialStartDate = localStateContent.TrialStartDate
                            }
                            if (localStateContent.TrialVerdictDate) {
                                newBody.TrialVerdictDate = localStateContent.TrialVerdictDate
                            }
                            if (localStateContent.TrialVerdictAmount) {
                                newBody.TrialVerdictAmount = parseFloat(localStateContent.TrialVerdictAmount)
                            }
                            if (localStateContent.OutcomeDispositionId) {
                                newBody.OutcomeDispositionId = localStateContent.OutcomeDispositionId
                            }
                            if (localStateContent.OutcomeDispositionSpecificId) {
                                newBody.OutcomeDispositionSpecificId = localStateContent.OutcomeDispositionSpecificId
                            }

                            if (userType === "admin" || "member") {
                                axios
                                    .patch(`${REACT_APP_BASE_URL}/caseinformation/${idFromUrl}`, newBody)
                                    .then((response: any) => {
                                        localStorage.removeItem("localState");
                                        if (response.status === 200) {
                                            alert("Successfully Saved")
                                        }
                                    })
                                    .catch((error: any) => {
                                        alert("Something went wrong")
                                    });
                            } else {
                                alert('only admin can edit details')
                            }
                        }} className='e-custom'>Save</ButtonComponent>
                       
                    </div>
                    <div onClick={() => { }} className="m-2">
                            <ButtonComponent className='e-custom'>Cancel</ButtonComponent>
                        </div>
                </div>
            </div>
        </>
    )
}





export default memo(DispositionInfoEdit)