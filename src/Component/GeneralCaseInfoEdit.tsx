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
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const { REACT_APP_BASE_URL } = process.env;

export const GeneralCaseInfoEdit = (props: any) => {

    const params: any = useParams();
    const id: any = params.id;
    const idFromUrl = props.rowData.Id;

    const userType = useSelector((state: any) => state.users.userType)

    const { AllegedLiabilityDefectdataFromApi, CausesofActionClaimdataFromApi, rowData } = props;
    const [localStateContent, setlocalStateContent] = useState<any>({
        Facts: rowData.Facts ?? "",
        CaseInfoAllegedLiabilityDefects: rowData.CaseInfoAllegedLiabilityDefects ? rowData.CaseInfoAllegedLiabilityDefects.map((item: any) => {
            return { AllegedLiabilityDefectId: item.AllegedLiabilityDefectId }
        }) : [],
        AllegedLiabilityDefectId: rowData.CaseInfoAllegedLiabilityDefects ? rowData.CaseInfoAllegedLiabilityDefects.map((item: any) => {
            return item.AllegedLiabilityDefectId
        }) : [],
        CausesofActionClaimsId: rowData.CausesofActionClaimsId ?? "",
        Generaldamagesdescription: rowData.Generaldamagesdescription ?? "",
        PunitiveDamagesRequested: rowData.PunitiveDamagesRequested ?? false,
        FraudClaimsFlag: rowData.FraudClaimsFlag ?? false,
        CivilPenaltiesEstimate: rowData.CivilPenaltiesEstimate ?? null,
        CivilPenaltiesFlag: rowData.CivilPenaltiesFlag ?? null,
        AttorneysFeesandCostsRequested: rowData.AttorneysFeesandCostsRequested ?? null
    });

    console.log(rowData, "lmnop")
    const fields = { text: "Title", value: "Id" };
    const queryMatterStatus = new Query().where("IsActive", "equal", true);
    let mulObj: MultiSelectComponent;

    const handlelocalStateContentChange = (name: string, value: any) => {
        setlocalStateContent((prevState: any, props: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        localStorage.setItem("localStateGeneralContentEdit", JSON.stringify(localStateContent));
    }, [localStateContent]);

    function handleOnChange(e: any) {
        var newData = e.target?.value.map((item: any) => {
            return {
                AllegedLiabilityDefectId: item,
            };
        });
        setlocalStateContent({
            ...localStateContent,
            CaseInfoAllegedLiabilityDefects: newData,
        });
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Facts:</div>
                        </div>
                        <div className="">
                            <TextBoxComponent
                                multiline={true}
                                className="e-multi-line-input"
                                value={localStateContent.Facts}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange("Facts", e.target.value);
                                }}
                                placeholder="Enter Facts"
                                data-msg-containerid="errroForName"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">General Damages Description:</div>
                        </div>
                        <div className="">
                            <TextBoxComponent
                                multiline={true}
                                className="e-multi-line-input"
                                value={localStateContent.Generaldamagesdescription}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "Generaldamagesdescription",
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter General Damages Description"
                                data-msg-containerid="errroForName"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Causes of Action Claims:</div>
                        </div>
                        <div className="">
                            <DropDownListComponent
                                id="ddlelement"
                                dataSource={CausesofActionClaimdataFromApi}
                                value={localStateContent.CausesofActionClaimsId}
                                placeholder="Select Causes of Action Claims"
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "CausesofActionClaimsId",
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
                            <div className="text-sm">Alleged Liability Defect:</div>
                        </div>
                        <div className="">
                            <MultiSelectComponent
                                id="checkbox"
                                ref={(scope: MultiSelectComponent) => {
                                    mulObj = scope;
                                }}
                                value={localStateContent.AllegedLiabilityDefectId}
                                dataSource={AllegedLiabilityDefectdataFromApi}
                                fields={fields}
                                query={queryMatterStatus}
                                placeholder="Select Alleged Liability Defect"
                                mode="CheckBox"
                                popupHeight="350px"
                                onChange={handleOnChange}
                            >
                                <Inject services={[CheckBoxSelection]} />
                            </MultiSelectComponent>
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Punitive Damages Requested:</div>
                        </div>
                        <div className="">
                            <CheckBoxComponent
                                checked={localStateContent.PunitiveDamagesRequested}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "PunitiveDamagesRequested",
                                        e.target.checked
                                    );
                                }}

                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Fraud Claims Flag:</div>
                        </div>
                        <div className="">
                            <CheckBoxComponent
                                checked={localStateContent.FraudClaimsFlag}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "FraudClaimsFlag",
                                        e.target.checked
                                    );
                                }}

                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Civil Penalties Estimate:</div>
                        </div>
                        <div className="">
                            <TextBoxComponent
                                type="number"
                                value={localStateContent.CivilPenaltiesEstimate}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "CivilPenaltiesEstimate",
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter Civil Penalties Estimate"
                                data-msg-containerid="errroForCivilPenaltiesEstimate"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Civil Penalties Flag:</div>
                        </div>
                        <div className="">
                            <CheckBoxComponent
                                value={localStateContent.CivilPenaltiesFlag}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "CivilPenaltiesFlag",
                                        e.target.checked
                                    );
                                }}
                                checked={localStateContent.CivilPenaltiesFlag}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-1">
                    <div className="">
                        <div>
                            <div className="text-sm">Attorneys Fees and Costs Requested:</div>
                        </div>
                        <div className="">
                            <CheckBoxComponent
                                value={localStateContent.AttorneysFeesandCostsRequested}
                                onChange={(e: any) => {
                                    handlelocalStateContentChange(
                                        "AttorneysFeesandCostsRequested",
                                        e.target.checked
                                    );
                                }}
                                checked={localStateContent.AttorneysFeesandCostsRequested}
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
                            
                            if (localStateContent.Facts) {
                                newBody.Facts = localStateContent.Facts
                            }
                            if (localStateContent.CaseInfoAllegedLiabilityDefects) {
                                newBody.CaseInfoAllegedLiabilityDefects = localStateContent.CaseInfoAllegedLiabilityDefects
                            }
                            if (localStateContent.CausesofActionClaimsId) {
                                newBody.CausesofActionClaimsId = localStateContent.CausesofActionClaimsId
                            }
                            if (localStateContent.Generaldamagesdescription) {
                                newBody.Generaldamagesdescription = localStateContent.Generaldamagesdescription
                            }
                            if (localStateContent.PunitiveDamagesRequested) {
                                newBody.PunitiveDamagesRequested = localStateContent.PunitiveDamagesRequested
                            }else {
                                newBody.PunitiveDamagesRequested = false
                            }
                            if (localStateContent.FraudClaimsFlag) {
                                newBody.FraudClaimsFlag = localStateContent.FraudClaimsFlag
                            }else {
                                newBody.FraudClaimsFlag = false
                            }
                            if (localStateContent.CivilPenaltiesFlag) {
                                newBody.CivilPenaltiesFlag = localStateContent.CivilPenaltiesFlag
                            }else {
                                newBody.CivilPenaltiesFlag = false
                            }
                            if (localStateContent.AttorneysFeesandCostsRequested) {
                                newBody.AttorneysFeesandCostsRequested = localStateContent.AttorneysFeesandCostsRequested
                            }else {
                                newBody.AttorneysFeesandCostsRequested = false
                            }
                            if (localStateContent.CivilPenaltiesEstimate) {
                                newBody.CivilPenaltiesEstimate = parseFloat(localStateContent.CivilPenaltiesEstimate)
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


export default memo(GeneralCaseInfoEdit)