import React, { memo, useState, useEffect } from "react";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import moment from "moment";
import queryString from 'query-string';
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useNavigate } from "react-router-dom";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { getGenderDetails, getpartyStatus } from '../features/injuredparty/injuredPartySlice';
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

export function InjuredPartyAdd() {
  let toastObj: any;
  let position: PositionDataModel = { X: "Right" };
  let navigate = useNavigate();
  let location = useLocation()

  const search = queryString.parse(location.search)
  console.log(search.caseId, "kkkkk")
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;
  const params: any = useParams();
  const dispatch = useDispatch();
  const id: any = params.id;
  const idFromUrl = parseInt(id);

  const query = new Query().where("Id", "equal", idFromUrl);

  useEffect(() => {
    const data = {
      token
    }
    dispatch(getpartyStatus(data))
    dispatch(getGenderDetails(data))
  }, [])


  const genderData = useSelector((state: any) => state.injured?.genderDetails)
  const partyData = useSelector((state: any) => state.injured?.partyData)
  
  const [localState, setlocalState] = useState<any>({
    "LastName": "",
    "FirstName": "",
    "MiddleName": "",
    "CaseInformationId": search.caseId,
    "Role": "",
    "PartyStatusId": "",
    "Deceased": false,
    "Ssn": "",
    "Dob": "",
    "Dod": "",
    "Age": "",
    "GenderId": ""
  })

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
    if (search.caseId) {
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
      newBody.CaseInformationId = localState.CaseInformationId
      axios
        .post(`${REACT_APP_BASE_URL}/injuredParty/`, newBody)
        .then((response: any) => {
          if (response.status === 200) {
            toastObj.show({
              title: "Success!",
              content: "Plaintiff party added successfully.",
              cssClass: "e-toast-success",
              icon: "e-success toast-icons",
            });
            setTimeout(() => {
              navigate(`/injuredpartydetails/${response.data.Id}`);
            }, 2000);
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
    } else {
      toastObj.show({
        title: "Warning!",
        content: "No case id provided.",
        cssClass: "e-toast-warning",
        icon: "e-warning toast-icons",
      });
    }
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
        Add Plaintiff
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
                placeholder="Enter Last Name"
                value={localState.LastName}
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
              <DropDownListComponent
                id="ddlelement"
                dataSource={partyData}
                placeholder="Select Party Status"
                onChange={(e: any) => {
                  handlelocalStateContentChange('PartyStatusId', e.target.value)
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
            <div className="">
              <div className="text-sm">Deceased:</div>
            </div>
            <div className="">
              <CheckBoxComponent
                checked={localState.Deceased}
                onChange={(e: any) => {
                  handlelocalStateContentChange('Deceased', e.target.checked)
                }}
              />
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
                placeholder="Enter SSN"
                value={localState.Ssn}
                data-msg-containerid="errroForMiddleName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('Ssn', e.target.value)
                }}
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
                id="datetimepicker"
                value={localState.Dob}
                placeholder="Select DOB"
                onChange={(e: any) => {
                  handlelocalStateContentChange('Dob', e.target.value)
                }}
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
                id="datetimepicker"
                value={localState.Dod}
                placeholder="Select DOD"
                onChange={(e: any) => {
                  handlelocalStateContentChange('Dod', e.target.value)
                }}
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
                placeholder="Enter Age"
                value={localState.Age}
                data-msg-containerid="errroForMiddleName"
                onChange={(e: any) => {
                  handlelocalStateContentChange('Age', e.target.value)
                }}
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
              <DropDownListComponent
                id="ddlelement"
                dataSource={genderData}
                placeholder="Select Gender"
                onChange={(e: any) => {
                  handlelocalStateContentChange('GenderId', e.target.value)
                }}
                fields={{
                  text: "Title",
                  value: "Id",
                }}
              />
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

    </div>
  );
}

export default InjuredPartyAdd;
