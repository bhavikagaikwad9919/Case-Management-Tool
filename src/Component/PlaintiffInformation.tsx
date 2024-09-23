import React,{useEffect} from 'react'
import "../App.css";
import {
    ButtonComponent,
    CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { DropDownListComponent,CheckBoxSelection } from "@syncfusion/ej2-react-dropdowns";
import { MultiSelectComponent, Inject } from "@syncfusion/ej2-react-dropdowns";
import { fetchPlaintiffCounselDetails,fetchPlaintiffCounselLocation } from "../features/case/editcaseSlice"


export default function PlaintiffInformation(props : any) {
   const dispatch = useDispatch()
   const user: any = localStorage.getItem("user");
   var token = JSON.parse(user)?.accessToken;
   const PlaintiffCounselDetails = useSelector((state: any) => state.caseedit.PlaintiffCounselDetails)
   const PlaintiffCounselLocation = useSelector((state: any) => state.caseedit.PlaintiffCounselLocation)
   

    useEffect(() => {
        const data = {
            token
          }
        dispatch(fetchPlaintiffCounselLocation(data))
        dispatch(fetchPlaintiffCounselDetails(data))
    }, [])
    
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">
            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">Plaintiff Counsel Name :</div>
                    </div>
                    <div className="">
                        <DropDownListComponent
                            id="ddlelement"
                            // value={localState.GenderId}
                            dataSource={PlaintiffCounselDetails}
                            placeholder="Plaintiff Counsel Name"
                            // onChange={(e: any) => {
                            //     handlelocalStateContentChange('GenderId', e.target.value)
                            // }}
                            fields={{
                                text: "PlaintiffCounselLawFirm",
                                value: "Id",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="p-1">
                <div className="">
                    <div>
                        <div className="text-sm">Location :</div>
                    </div>
                    <div className="">
                        <DropDownListComponent
                            id="ddlelement"
                            // value={localState.GenderId}
                            // dataSource={genderData}
                            placeholder="Select Location"
                            // onChange={(e: any) => {
                            //     handlelocalStateContentChange('GenderId', e.target.value)
                            // }}
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
                        <div className="text-sm">Attorneys :</div>
                    </div>
                    <div className="">
                        <MultiSelectComponent
                            id="checkbox"
                            // ref={(scope: MultiSelectComponent) => {
                            //     mulObj = scope;
                            // }}
                            // value={localStateContent.AllegedLiabilityDefectId}
                            // dataSource={AllegedLiabilityDefectdataFromApi}
                            // fields={fields}
                            // query={queryMatterStatus}
                            placeholder="Select Attorneys"
                            mode="CheckBox"
                            popupHeight="350px"
                            // onChange={handleOnChange}
                        >
                            <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>

        </div>
    )
}
