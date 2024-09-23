import React, { memo, useEffect, useState } from "react";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import moment from "moment";
import InjuredPartyEditTabComponent from "./InjuredPartyEditTabComponent";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import axios from 'axios';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getInjuryPartyData, getGenderDetails, getpartyStatus } from "../features/injuredparty/injuredPartySlice";
import {
  ToastComponent,
  ToastCloseArgs,
} from "@syncfusion/ej2-react-notifications";
import { PositionDataModel } from "@syncfusion/ej2-popups";

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

export function InjuredPartyEdit() {
  let toastObj: any;
  let position: PositionDataModel = { X: "Right" };
  let navigate = useNavigate();
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const params: any = useParams();
  const dispatch = useDispatch();

  const id: any = params.id;
  const idFromUrl = parseInt(id);
  const editPartyDetails = useSelector((state: any) => state.injured?.eidtpartyData)
  const genderData = useSelector((state: any) => state.injured?.genderDetails)
  const partyData = useSelector((state: any) => state.injured?.partyData)

  const [localState, setlocalState] = useState<any>({
    "LastName": "",
    "FirstName": "",
    "MiddleName": "",
    "Role": "",
    "PartyStatusId": "",
    "Deceased": false,
    "Ssn": "",
    "Dob": "",
    "Dod": "",
    "Age": "",
    "GenderId": ""
  })


  useEffect(() => {
    const data = {
      token,
      query: {
        "$filter": `Id eq ${idFromUrl}`
      }
    }
    dispatch(getInjuryPartyData(data))
    const dataforOther = {
      token
    }
    dispatch(getpartyStatus(dataforOther))
    dispatch(getGenderDetails(dataforOther))
  }, [])

  useEffect(() => {
    setlocalState({
      "LastName": editPartyDetails?.LastName ?? "",
      "FirstName": editPartyDetails?.FirstName ?? "",
      "MiddleName": editPartyDetails?.MiddleName ?? "",
      "Role": editPartyDetails?.Role ?? "",
      "PartyStatusId": editPartyDetails?.PartyStatusId ?? "",
      "Deceased": editPartyDetails?.Deceased ?? "",
      "Ssn": editPartyDetails?.Ssn ?? "",
      "Dob": editPartyDetails?.Dob ?? "",
      "Dod": editPartyDetails?.Dod ?? "",
      "Age": editPartyDetails?.Age ?? "",
      "GenderId": editPartyDetails?.GenderId ?? ""
    })
  }, [editPartyDetails])


  const handlelocalStateContentChange = (name: string, value: any) => {
    setlocalState((prevState: any, props: any) => (
      {
        ...prevState,
        [name]: value
      }
    ))
  }

  const handleSave = async (e: any) => {
    e.preventDefault();
    let newBody: any = {};
      if (localState.FirstName && localState.FirstName !== "") {
        newBody.FirstName = localState.FirstName;
      }
      if (localState.MiddleName && localState.MiddleName !== "") {
        newBody.MiddleName = localState.MiddleName;
      }
      if (localState.LastName && localState.LastName !== "") {
        newBody.LastName = localState.LastName;
      }
      if (localState.Role && localState.Role !== "") {
        newBody.Role = localState.Role;
      }
      if (localState.PartyStatusId && localState.PartyStatusId !== "") {
        newBody.PartyStatusId = localState.PartyStatusId;
      }
      if (localState.Deceased) {
        newBody.Deceased = localState.Deceased;
      } else {
        newBody.Deceased = false
      }
      if (localState.Ssn && localState.Ssn !== "") {
        newBody.Ssn = localState.Ssn;
      }
      if (localState.Dob && localState.Dob !== "") {
        newBody.Dob = localState.Dob;
      }
      if (localState.Dod && localState.Dod !== "") {
        newBody.Dod = localState.Dod;
      }
      if (localState.Age && localState.Age !== "") {
        newBody.Age = localState.Age;
      }
      if (localState.GenderId && localState.GenderId !== "") {
        newBody.GenderId = localState.GenderId;
      }
    axios
    .patch(`${REACT_APP_BASE_URL}/injuredParty/${idFromUrl}`, newBody)
    .then((response: any) => {
      if (response.status === 200) {
        toastObj.show({
          title: "Success!",
          content: "Plaintiff updated successfully.",
          cssClass: "e-toast-success",
          icon: "e-success toast-icons",
        });
        setTimeout(() => { 
          window.close();
        },2000)
      }
    })
    .catch((error: any) => {
      toastObj.show({
        title: "Error!",
        content: "Something went wrong.",
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    });
  }


  return (
    <div>
      <ToastComponent
        ref={(toast) => {
          toastObj = toast;
        }}
        id="toast_default"
        position={position}
        //created={create}
      ></ToastComponent>
      <h1 className="text-center font-bold text-lg">
      Plaintiff Details
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 pl-8 pr-8 sm:grid-cols-1 mt-3">
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">First Name:</div>
            </div>
            <div className="">
              <TextBoxComponent
                placeholder="Enter First Name"
                value={localState.FirstName}
                data-msg-containerid="errroForFirstName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('FirstName', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Middle Name:</div>
            </div>
            <div className="">
              <TextBoxComponent
                placeholder="Enter Middle Name"
                value={localState.MiddleName}
                data-msg-containerid="errroForMiddleName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('MiddleName', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Last Name:</div>
            </div>
            <div className="">
              <TextBoxComponent
                value={localState.LastName}
                placeholder="Enter Last Name"
                data-msg-containerid="errroForLastName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('LastName', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Role:</div>
            </div>
            <div className="">
              <TextBoxComponent
                placeholder="Enter Role"
                value={localState.Role}
                data-msg-containerid="errroForFirstName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('Role', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Party Status:</div>
            </div>
            <div className="">
             {partyData && <DropDownListComponent
                id="ddlelement"
                value={localState.PartyStatusId}
                dataSource={partyData}
                placeholder="Select Party Status"
                onChange={(e: any) => {
                  handlelocalStateContentChange('PartyStatusId', e.target.value)
                }}
                fields={{
                  text: "Title",
                  value: "Id",
                }}
              /> }
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Deceased:</div>
            </div>
            <div className="">
              <CheckBoxComponent
                checked={localState.Deceased}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Deceased', e.target.checked)
                }} />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">SSN:</div>
            </div>
            <div className="">
              <TextBoxComponent
                value={localState.Ssn}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Ssn', e.target.value)
                }}
                placeholder="Enter SSN"
                data-msg-containerid="errroForMiddleName"
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">DOB:</div>
            </div>
            <div className="">
              <DatePickerComponent
                value={localState.Dob}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Dob', e.target.value)
                }}
                id="datetimepicker"
                placeholder="Select DOB"
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">DOD:</div>
            </div>
            <div className="">
              <DatePickerComponent
                value={localState.Dod}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Dod', e.target.value)
                }}
                id="datetimepicker"
                placeholder="Select DOD"
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Age:</div>
            </div>
            <div className="">
              <TextBoxComponent
                type="number"
                value={localState.Age}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Age', e.target.value)
                }}
                placeholder="Enter Age"
                data-msg-containerid="errroForMiddleName"
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="">
            <div className="">
              <div className="text-sm">Gender:</div>
            </div>
            <div className="">
              <div className="">
             { genderData && <DropDownListComponent
                  id="ddlelement"
                  value={localState.GenderId}
                  dataSource={genderData}
                  placeholder="Select Gender"
                  onChange={(e: any) => {
                    handlelocalStateContentChange('GenderId', e.target.value)
                  }}
                  fields={{
                    text: "Title",
                    value: "Id",
                  }}
                /> }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-8 pr-8">
        <div className="flex justify-end mt-12">
          <div className="m-2">
            <ButtonComponent
              onClick={handleSave}
              className="e-custom"
            >
              Save
            </ButtonComponent>
          </div>
          {/* <div className="m-2">
                <ButtonComponent cssClass='e-custom'>Save & Add New</ButtonComponent>
              </div> */}
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

      <div className="pl-8 pr-8 mt-8">
        <InjuredPartyEditTabComponent />
      </div>


    </div>
  );
}

export default InjuredPartyEdit;
