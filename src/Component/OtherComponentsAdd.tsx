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


function OtherComponentsAdd(props : any) {
  const [localStateContent, setlocalStateContent] = useState<any>({
    PostureId: "",
    DateReleaseReceived: "",
    DealerName: "",
    CivilPenaltiesEstimate: "",
    VehicleYear: "",
    DaysOutOfService: "",
    AttorneysFeesandCostsRequested: false,
    TenderOfDefenseFromDealerFlag: false,
    CivilPenaltiesFlag: false,
  });

  useEffect(() => {
    localStorage.setItem("localOtherComponentContent", JSON.stringify(localStateContent));
  }, [localStateContent]);

  const handlelocalStateContentChange = (name: string, value: any) => {
    setlocalStateContent((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">
    {/* <div className="p-1">
      <div className="">
        <div>
          <div className="text-sm">Posture:</div>
        </div>
        <div className="">
          <DropDownListComponent
            id="ddlelement"
            dataSource={props.posturedataFromApi}
            value={localStateContent.PostureId}
            onChange={(e: any) => {
              handlelocalStateContentChange("PostureId", e.target.value);
            }}
            placeholder="Select Posture"
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
          <div className="text-sm">Date Release Received:</div>
        </div>
        <div className="">
          <DatePickerComponent
            id="datetimepicker"
            placeholder="Select Date Release Received"
            value={localStateContent.DateReleaseReceived}
            onChange={(e: any) => {
              handlelocalStateContentChange(
                "DateReleaseReceived",
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
          <div className="text-sm">Dealer Name:</div>
        </div>
        <div className="">
          <TextBoxComponent
            value={localStateContent.DealerName}
            onChange={(e: any) => {
              handlelocalStateContentChange(
                "DealerName",
                e.target.value
              );
            }}
            placeholder="Enter Dealer Name"
            data-msg-containerid="errroForDealerName"
          />
        </div>
      </div>
    </div> */}
    {/* <div className="p-1">
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
    </div> */}
    {/*  */}
  
    {/* <div className="p-1">
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
    </div> */}
    {/* <div className="p-1">
      <div className="">
        <div>
          <div className="text-sm">Tender Of Defense From Dealer Flag:</div>
        </div>
        <div className="">
          <CheckBoxComponent
            value={localStateContent.TenderOfDefenseFromDealerFlag}
            onChange={(e: any) => {
              handlelocalStateContentChange(
                "TenderOfDefenseFromDealerFlag",
                e.target.checked
              );
            }}
            checked={localStateContent.TenderOfDefenseFromDealerFlag}
          />
        </div>
      </div>
    </div> */}
    {/* <div className="p-1">
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
    </div> */}
  </div>
  )
}

export default memo(OtherComponentsAdd)