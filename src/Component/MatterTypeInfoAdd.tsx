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

function MatterTypeInfoAdd(props: any) {

    const [localStateContent, setlocalStateContent] = useState<any>({
        VehicleModelId: "",
        VehicleVinNo :"",
        PurchaseDate: "",
        VehiclePurchaseTypeId: "",
        OtherVehicleSalesInfo: "",
        RISCSalesLeaseContract: false,
        CABuyBackRequestFlag: false,
    });

    useEffect(() => {
        localStorage.setItem("localStateMatterTypeContent", JSON.stringify(localStateContent));
      }, [localStateContent]);

    const handlelocalStateContentChange = (name: string, value: any) => {
        setlocalStateContent((prevState: any, props: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">

            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">VIN :</div>
                    </div>
                    <div className="">
                        <TextBoxComponent
                            type="string"
                            value={localStateContent.VehicleVinNo}
                            onChange={(e: any) => {
                                handlelocalStateContentChange(
                                    "VehicleVinNo",
                                    e.target.value
                                );
                            }}
                            placeholder="Enter VIN"
                            data-msg-containerid="errroForDealerName"
                        />
                    </div>
                </div>
            </div>
            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">Model :</div>
                    </div>
                    <div className="">
                        <DropDownListComponent
                            id="ddlelement"
                            dataSource={props.vehicleModelType}
                            value={localStateContent.VehicleModelId}
                            onChange={(e: any) => {
                                handlelocalStateContentChange("VehicleModelId", e.target.value);
                            }}
                            placeholder="Select Model"
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
                        <div className="text-sm">Purchase Date :</div>
                    </div>
                    <div className="">
                        <DatePickerComponent
                            id="datetimepicker"
                            placeholder="Select Date Of Agreement Executed"
                            value={localStateContent.PurchaseDate}
                            onChange={(e: any) => {
                                handlelocalStateContentChange(
                                    "PurchaseDate",
                                    e.target.value
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <div>
                    <div className="text-sm">Vehicle Purchase Type:</div>
                </div>
                <div className="">
                    <DropDownListComponent
                        id="ddlelement"
                        dataSource={props.vehiclePurchesTypedata}
                        value={localStateContent.VehiclePurchaseTypeId}
                        placeholder="Vehicle Purchase Type"
                        onChange={(e: any) => {
                            handlelocalStateContentChange(
                                "VehiclePurchaseTypeId",
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
            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">CA Buy Back Request Flag:</div>
                    </div>
                    <div className="">
                        <CheckBoxComponent
                            value={localStateContent.CABuyBackRequestFlag}
                            onChange={(e: any) => {
                                handlelocalStateContentChange('CABuyBackRequestFlag', e.target.checked)
                            }}
                            checked={localStateContent.CABuyBackRequestFlag}
                        />
                    </div>
                </div>
            </div>
           
            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">RISC Sales Lease Contract :</div>
                    </div>
                    <div className="">
                        <CheckBoxComponent
                            value={localStateContent.RISCSalesLeaseContract}
                            onChange={(e: any) => {
                                handlelocalStateContentChange(
                                    "RISCSalesLeaseContract",
                                    e.target.checked
                                );
                            }}
                            checked={localStateContent.RISCSalesLeaseContract}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <div>
                    <div className="text-sm">Other Vehicle Sales Info:</div>
                </div>
                <div className="">
                    <TextBoxComponent
                        multiline={true}
                        className="e-multi-line-input"
                        value={localStateContent.OtherVehicleSalesInfo}
                        onChange={(e: any) => {
                            handlelocalStateContentChange(
                                "OtherVehicleSalesInfo",
                                e.target.value
                            );
                        }}
                        placeholder="Enter Other Vehicle Sales Info"
                        data-msg-containerid="errroForName"
                    />
                </div>
            </div>
           
        </div>
    )
}

export default memo(MatterTypeInfoAdd)