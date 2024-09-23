import React, { useState, memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import {
  DataManager,
  ODataV4Adaptor,
  Query,
  ReturnOption,
} from "@syncfusion/ej2-data";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useDispatch, useSelector } from 'react-redux'

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function CourtInformatiionEditDilog(props: any) {
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.idFromUrl;


  const [localState, setlocalState] = useState<any>({
    CaseInformationId: idFromUrl,
    CourtCaseNo: props?.CourtCaseNo ?? null,
    CourtStartDate: props?.CourtStartDate ?? null,
    CourtEndDate: props?.CourtEndDate ?? null,
    CurrentCourt: props?.CurrentCourt ?? false,
    CurrentJudge: props?.CurrentJudge ?? null,
    JurisdictionId: props?.JurisdictionId ?? null,
    CurrentMagistrateJudge: props.CurrentMagistrateJudge ?? null,
    CurrentJudgeRulesLink: props.CurrentJudgeRulesLink ?? null,
    CurrentSpecialMaster: props.CurrentSpecialMaster ?? null,
    JudgeArrbitratorAssigned: props.JudgeArrbitratorAssigned ?? false,
    IsActive: props.IsActive ?? false,
  });

  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user)?.accessToken;

  const handlelocalStateChange = (name: string, value: any) => {
    setlocalState((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    console.log("local stetate data", localState);
    // console.log("localstate", localState);
    // axios
    // .patch(`${REACT_APP_BASE_URL}/casecourtinformation/${props.Id}`, localState)
    // .then((response : any) => {
    //   if (response.status === 200) {
    //     // alert("Successfully Saved")
    //     alert("Successfully Saved")
    //   }
    // })
    // .catch((error : any) => {
    //  alert("Something went wrong")
    // });
  };

  // const jurisdictionDataFromApi = new DataManager({
  //   url: `${REACT_APP_BASE_URL}/Jurisdiction`,
  //   adaptor: new ODataV4Adaptor(),
  //   crossDomain: true,
  //   headers: [{ Authorization: `Bearer ${token}` }],
  // });

  return (
    <div>
      <div>
        <div className="">
          <div className="">
            <div className="grid p-2 hidden">
              <div>
                <h2 className="heading">Case Information Id</h2>
                <TextBoxComponent
                  name="CaseInformationId"
                  type="number"
                  disabled={true}
                  value={localState.CaseInformationId}
                  onChange={(e: any) => {
                    handlelocalStateChange("CaseInformationId", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Jurisdiction</h2>
                <DropDownListComponent
                  name="JurisdictionId"
                  placeholder="Select Jurisdiction"
                  value={localState.JurisdictionId}
                  dataSource={props.jurisdictionDataFromApi}
                  onChange={(e: any) => {
                    handlelocalStateChange("JurisdictionId", e.target.value);
                  }}
                  fields={{
                    text: "CourtName",
                    value: "Id",
                  }}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Court Case No</h2>
                <TextBoxComponent
                  name="CourtCaseNo"
                  placeholder="Enter Court Case No"
                  value={localState.CourtCaseNo}
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtCaseNo", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Court Start Date</h2>
                <DatePickerComponent
                  name="CourtStartDate"
                  id="datetimepicker"
                  placeholder="Select Court Start Date"
                  value={localState.CourtStartDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtStartDate", e.target.value);
                  }}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Court End Date</h2>
                <DatePickerComponent
                  name="CourtEndDate"
                  id="datetimepicker"
                  placeholder="Select Court End Date"
                  value={localState.CourtEndDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtEndDate", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Current Judge</h2>
                <TextBoxComponent
                  placeholder="Enter Current Judge"
                  name="CurrentJudge"
                  value={localState.CurrentJudge}
                  onChange={(e: any) => {
                    handlelocalStateChange("CurrentJudge", e.target.value);
                  }}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Current Magistrate Judge</h2>
                <TextBoxComponent
                  placeholder="Enter Current Magistrate Judge"
                  name="CurrentMagistrateJudge"
                  value={localState.CurrentMagistrateJudge}
                  onChange={(e: any) => {
                    handlelocalStateChange(
                      "CurrentMagistrateJudge",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 p-2">
              <div className="">
                <h2 className="heading">Current Special Master</h2>
                <TextBoxComponent
                  placeholder="Enter Current Special Master"
                  name="CurrentSpecialMaster"
                  value={localState.CurrentSpecialMaster}
                  onChange={(e: any) => {
                    handlelocalStateChange(
                      "CurrentSpecialMaster",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 p-2">
              <div className="">
                <h2 className="heading">CurrentJudge Rules Link</h2>
                <TextBoxComponent
                  placeholder="Enter CurrentJudge Rules Link"
                  name="CurrentJudgeRulesLink"
                  value={localState.CurrentJudgeRulesLink}
                  onChange={(e: any) => {
                    handlelocalStateChange(
                      "CurrentJudgeRulesLink",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Current Court</h2>
                <CheckBoxComponent
                  name="CurrentCourt"
                  checked={localState.CurrentCourt}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Judge Arrbitrator Assigned</h2>
                <CheckBoxComponent
                  name="JudgeArrbitratorAssigned"
                  type="boolean"
                  checked={localState.JudgeArrbitratorAssigned}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CourtInformatiionEditDilog
