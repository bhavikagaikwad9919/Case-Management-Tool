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
import { useNavigate } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { PositionDataModel } from "@syncfusion/ej2-popups";


export const DispositionInfoAdd = (props: any) => {
    const { handleSaveCasedetails } = props;
    let navigate = useNavigate();
    let mulObj: MultiSelectComponent;
    const user: any = localStorage.getItem("user");

    const [localStateContent, setlocalStateContent] = useState<any>({
        DispositionDate: "",
        DispositionSummary: "",
        TrialStartDate: "",
        TrialVerdictDate: "",
        TrialVerdictAmount: "",
        OutcomeDispositionId: "",
        OutcomeDispositionSpecificId: ""
    });

    const getItemChanged = async () => {
        const data: any = await localStorage.getItem("localStateAdd");
        const genInfoData: any = await localStorage.getItem("localStateGeneralContent");
        const disInfoData: any = await localStorage.getItem("localStateDispositionContent");
        const SettlTDataInfo: any = await localStorage.getItem("localStateSettlementTrackingAdd");
        
        const top = await JSON.parse(data);
        const SettlTData = await JSON.parse(SettlTDataInfo)
        const gendata = await JSON.parse(genInfoData);
        const dispos = await JSON.parse(disInfoData)
        const result = { ...top, ...gendata, ...dispos, ...SettlTData }
        return result;
      };

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
        localStorage.setItem("localStateDispositionContent", JSON.stringify(localStateContent));
    }, [localStateContent]);

    useEffect(() => {
        if (localStateContent.OutcomeDispositionId) {
            filterOutcomeDispositionSpecific(localStateContent.OutcomeDispositionId);
        }
    }, [localStateContent?.OutcomeDispositionId]);

    let toastObj: any;
    let position: PositionDataModel = { X: "Right" };


    function showBtnClick() {
        toastObj.show({
            title: "Success!",
            content: "Case info added successfully.",
            cssClass: "e-toast-success",
            icon: "e-success toast-icons",
        });
    }


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
            <div className="pb-40 p-2">
            <div className="flex justify-end">
                <div className="m-2">
                    <ButtonComponent
                        onClick={async (e: any) => {
                            e.preventDefault();
                            const data = await getItemChanged();
                            handleSaveCasedetails(data, showBtnClick, navigate);
                        }}
                        className="e-custom"
                    >
                        Save
                    </ButtonComponent>
                </div>
                <div
                    onClick={(e: any) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                    className="m-2"
                >
                    <ButtonComponent className="e-custom">Cancel</ButtonComponent>
                </div>
            </div>
        </div>
        </>

    )
}





export default memo(DispositionInfoAdd)