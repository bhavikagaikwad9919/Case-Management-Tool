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

export const GeneralCaseInfo = (props: any) => {

    const { AllegedLiabilityDefectdataFromApi, CausesofActionClaimdataFromApi } = props;
    const [localStateContent, setlocalStateContent] = useState<any>({
        Facts: "",
        AllegedLiabilityDefectId: "",
        CaseInfoAllegedLiabilityDefects: [],
        CausesofActionClaimsId: "",
        Generaldamagesdescription: "",
        PunitiveDamagesRequested: false,
        FraudClaimsFlag: false,
        CivilPenaltiesEstimate : "",
        CivilPenaltiesFlag : "",
        AttorneysFeesandCostsRequested : ""
    });

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
        localStorage.setItem("localStateGeneralContent", JSON.stringify(localStateContent));
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
                            value={localStateContent.PunitiveDamagesRequested}
                            onChange={(e: any) => {
                                handlelocalStateContentChange(
                                    "PunitiveDamagesRequested",
                                    e.target.checked
                                );
                            }}
                            checked={localStateContent.PunitiveDamagesRequested}
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
                            value={localStateContent.FraudClaimsFlag}
                            onChange={(e: any) => {
                                handlelocalStateContentChange(
                                    "FraudClaimsFlag",
                                    e.target.checked
                                );
                            }}
                            checked={localStateContent.FraudClaimsFlag}
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
    )
}


export default memo(GeneralCaseInfo)