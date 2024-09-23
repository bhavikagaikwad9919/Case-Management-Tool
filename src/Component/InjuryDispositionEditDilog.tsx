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

const {
  REACT_APP_DATE_FORMAT,
  REACT_APP_BASE_URL,
  REACT_APP_DATE_FORMAT_NO_TIME,
} = process.env;

function InjuryDispositionEditDilog(props: any) {
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = parseInt(id);

  const [localState, setlocalState] = useState<any>({
    InjuredPartyId: idFromUrl,
    DepositionStatusId: props.DepositionStatusId ?? null,
    DepositionDate: props.DepositionDate ?? null,
    CourtReporterFirstName: props.CourtReporterFirstName ?? null,
    CourtReporterMiddleName: props.CourtReporterMiddleName ?? null,
    CourtReporterLastName: props.CourtReporterLastName ?? null,
    DepositionTrascriptLink: props.DepositionTrascriptLink ?? null,
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
                  name="InjuredPartyId"
                  type="number"
                  disabled={true}
                  value={localState.InjuredPartyId}
                  onChange={(e: any) => {
                    handlelocalStateChange("InjuredPartyId", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Deposition Status</h2>
                <DropDownListComponent
                  name="DepositionStatusId"
                  placeholder="Select Deposition Status"
                  value={localState.DepositionStatusId}
                  dataSource={props.depositionStatusDataFromApi}
                  onChange={(e: any) => {
                    handlelocalStateChange("DepositionStatusId", e.target.value);
                  }}
                  fields={{
                    text: "Title",
                    value: "Id",
                  }}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Deposition Date</h2>
                <DatePickerComponent
                  name="DepositionDate"
                  id="datetimepicker"
                  placeholder="Select Deposition Date"
                  value={localState.DepositionDate}
                  onChange={(e: any) => {
                    handlelocalStateChange("DepositionDate", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Court Reporter First Name</h2>
                <TextBoxComponent
                  name="CourtReporterFirstName"
                  placeholder="Enter Court Reporter First Name"
                  value={localState.CourtReporterFirstName}
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtReporterFirstName", e.target.value);
                  }}
                /> 
              </div>
              <div className="ml-3">
                <h2 className="heading">Court Reporter Middle Namee</h2>
                <TextBoxComponent
                  name="CourtReporterMiddleName"
                  placeholder="Enter Court Reporter Middle Name"
                  value={localState.CourtReporterMiddleName}
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtReporterMiddleName", e.target.value);
                  }}
                /> 
              </div>
            </div>

            <div className="grid grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Court Reporter Last Name</h2>
                <TextBoxComponent
                  placeholder="Enter Court Reporter Last Name"
                  name="CourtReporterLastName"
                  value={localState.CourtReporterLastName}
                  onChange={(e: any) => {
                    handlelocalStateChange("CourtReporterLastName", e.target.value);
                  }}
                />
              </div>
              <div className="ml-3">
                <h2 className="heading">Deposition Trascript Link</h2>
                <TextBoxComponent
                  placeholder="Enter Deposition Trascript Link"
                  name="DepositionTrascriptLink"
                  value={localState.DepositionTrascriptLink}
                  onChange={(e: any) => {
                    handlelocalStateChange(
                      "DepositionTrascriptLink",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(InjuryDispositionEditDilog);
