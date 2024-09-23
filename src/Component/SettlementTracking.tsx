
import React, { useEffect, useState } from "react";
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

const { REACT_APP_BASE_URL } = process.env;

function SettlementTracking(props: any) {
  const { rowData } = props

  console.log(rowData, "here is data")
  const userType = useSelector((state: any) => state.users.userType)

  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = rowData.Id;

  const [localStateContent, setlocalStateContent] = useState<any>({
    CurrentSettlementOffer: rowData?.CurrentSettlementOffer ?? "",
    CurrentSettlementOfferDate: rowData?.CurrentSettlementOfferDate ?? "",
    DateSettlementAuthorityReceived: rowData?.DateSettlementAuthorityReceived ?? "",
    DateSettlementAuthorityRequested: rowData?.DateSettlementAuthorityRequested ?? false,
    InitialSettlementDemand: rowData?.InitialSettlementDemand ?? "",
    InitialSettlementOffer: rowData?.InitialSettlementOffer ?? "",
    InitialSettlementOfferDate: rowData?.InitialSettlementOfferDate ?? "",
    SettlementAuthorityRequested: rowData?.SettlementAuthorityRequested ?? "",

    AmountRequested: rowData?.AmountRequested ?? "",
    AmountReceived: rowData?.AmountReceived ?? "",
    DateFinalSettlementAccepted: rowData?.DateFinalSettlementAccepted ?? "",
    FinalSettlementAccepted: rowData?.FinalSettlementAccepted ?? "",
    DateReleaseReceived: rowData?.DateReleaseReceived ?? "",
    CurrentSettlementDemand: rowData?.CurrentSettlementDemand ?? "",
  })


  const handlelocalStateContentChange = (name: string, value: any) => {
    setlocalStateContent((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-5 border-2 rounded">
        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Initial Settlement Demand :</div>
            </div>
            <div className="">
              <TextBoxComponent
                // multiline={true}
                type="number"
                className="e-multi-line-input"
                value={localStateContent.InitialSettlementDemand}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "InitialSettlementDemand",
                    e.target.value
                  );
                }}
                placeholder="Initial Settlement Demand"
                data-msg-containerid="errroForName"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Settlement Authority Requested Y/N:</div>
            </div>
            <div className="">
              <CheckBoxComponent
                checked={localStateContent.SettlementAuthorityRequested}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "SettlementAuthorityRequested",
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
              <div className="text-sm">Settlement Authority Requested Amount:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localStateContent.AmountRequested}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "AmountRequested",
                    e.target.value
                  );
                }}
                placeholder="Enter Settlement Authority Requested"
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Date Authority Requested:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Select Date Authority Requested"
                value={localStateContent.DateSettlementAuthorityRequested}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "DateSettlementAuthorityRequested",
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
              <div className="text-sm">Settlement Authority Received Amount: </div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localStateContent.AmountReceived}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "AmountReceived",
                    e.target.value
                  );
                }}
                placeholder="Enter Settlement Authority Received"
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Date Authority Received:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Date of Initial Settlement"
                value={localStateContent.DateSettlementAuthorityReceived}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "DateSettlementAuthorityReceived",
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
              <div className="text-sm">Initial Settlement Offer:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                placeholder="Initial Settlement Offer"
                value={localStateContent.InitialSettlementOffer}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "InitialSettlementOffer",
                    e.target.value
                  );
                }}
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Date of Initial Settlement Offer:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Date of Initial Settlement"
                value={localStateContent.InitialSettlementOfferDate}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "InitialSettlementOfferDate",
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
              <div className="text-sm">Current Settlement Demand:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localStateContent.CurrentSettlementDemand}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "CurrentSettlementDemand",
                    e.target.value
                  );
                }}
                placeholder="Enter Current Settlement Demand"
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Current Settlement Offer:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localStateContent.CurrentSettlementOffer}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "CurrentSettlementOffer",
                    e.target.value
                  );
                }}
                placeholder="Enter Current Settlement Offer"
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Date of Current Settlement Offer:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Date of Current Settlement"
                value={localStateContent.CurrentSettlementOfferDate}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "CurrentSettlementOfferDate",
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
              <div className="text-sm">Final Settlement Accepted:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localStateContent.FinalSettlementAccepted}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "FinalSettlementAccepted",
                    e.target.value
                  );
                }}
                placeholder="Enter Final Settlement Accepted"
                data-msg-containerid="errroForCivilPenaltiesEstimate"
              />
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="">
            <div>
              <div className="text-sm">Date Final Settlement Accepted:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Select Date Release Received"
                value={localStateContent.DateFinalSettlementAccepted}
                onChange={(e: any) => {
                  handlelocalStateContentChange(
                    "DateFinalSettlementAccepted",
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
              <div className="text-sm">Date of Executed Release:</div>
            </div>
            <div className="">
              <DatePickerComponent
                id="datetimepicker"
                placeholder="Select Date Executed Release"
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

      </div>
      <div className="p-2">
        <div className="flex justify-end">
          {/* <div className="m-2">
            <ButtonComponent onClick={async (e: any) => {
              e.preventDefault();
              setlocalStateContent({
                CurrentSettlementOffer: "",
                CurrentSettlementOfferDate: "",
                DateSettlementAuthorityReceived: "",
                DateSettlementAuthorityRequested: "",
                InitialSettlementDemand: "",
                InitialSettlementOffer: "",
                InitialSettlementOfferDate: "",
                SettlementAuthorityRequested: false,
                // missing key from backend
                SettlementAuthorityRequestedAmount: "",
                SettlementAuthorityReceivedAmount: "",
                FinalSettlementAcceptedDate: "",
                FinalSettlementAccepted: "",
                ExecutedReleaseDate: "",
                CurrentSettlementDemand: ""
              })
            }} className='e-custom'>Clear All</ButtonComponent>
          </div> */}
          <div className="m-2">
            <ButtonComponent onClick={async (e: any) => {
              e.preventDefault();
              let newBody: any = {}

              if (localStateContent.CurrentSettlementOffer) {
                newBody.CurrentSettlementOffer = parseFloat(localStateContent.CurrentSettlementOffer)
              }
              if (localStateContent.CurrentSettlementOfferDate) {
                newBody.CurrentSettlementOfferDate = localStateContent.CurrentSettlementOfferDate
              }
              if (localStateContent.DateSettlementAuthorityReceived) {
                newBody.DateSettlementAuthorityReceived = localStateContent.DateSettlementAuthorityReceived
              }
              if (localStateContent.DateSettlementAuthorityRequested) {
                newBody.DateSettlementAuthorityRequested = localStateContent.DateSettlementAuthorityRequested
              }
              if (localStateContent.InitialSettlementDemand) {
                newBody.InitialSettlementDemand = parseFloat(localStateContent.InitialSettlementDemand)
              }
              if (localStateContent.InitialSettlementOffer) {
                newBody.InitialSettlementOffer = parseFloat(localStateContent.InitialSettlementOffer)
              }
              if (localStateContent.InitialSettlementOfferDate) {
                newBody.InitialSettlementOfferDate = localStateContent.InitialSettlementOfferDate
              }
              if (localStateContent.SettlementAuthorityRequested) {
                newBody.SettlementAuthorityRequested = localStateContent.SettlementAuthorityRequested
              } else {
                newBody.SettlementAuthorityRequested = false
              }

              if (localStateContent.AmountRequested) {
                newBody.AmountRequested = parseFloat(localStateContent.AmountRequested)
              }
              if (localStateContent.AmountReceived) {
                newBody.AmountReceived = parseFloat(localStateContent.AmountReceived)
              }
              if (localStateContent.DateFinalSettlementAccepted) {
                newBody.DateFinalSettlementAccepted = localStateContent.DateFinalSettlementAccepted
              }
              if (localStateContent.FinalSettlementAccepted) {
                newBody.FinalSettlementAccepted = parseFloat(localStateContent.FinalSettlementAccepted)
              }
              if (localStateContent.DateReleaseReceived) {
                newBody.DateReleaseReceived = localStateContent.DateReleaseReceived
              }
              if (localStateContent.CurrentSettlementDemand) {
                newBody.CurrentSettlementDemand = parseFloat(localStateContent.CurrentSettlementDemand)
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
    </div>
  );
}
export default SettlementTracking;
