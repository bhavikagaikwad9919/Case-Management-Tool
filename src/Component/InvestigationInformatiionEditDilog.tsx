import React, { useState, memo } from "react";
import { useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";


function InvestigationInformatiionEditDilog(props: any) {
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.idFromUrl;

  const [localState, setlocalState] = useState<any>({
    CaseInformationId: idFromUrl,
    InvestigationTypeId: props.InvestigationTypeId ?? null,
    Description: props.Description ?? null,
    InvestigationEndDate: props.InvestigationEndDate ?? false,
    InvestigationStartDate: props.InvestigationStartDate ?? false,
    IsActive: props.IsActive ?? false,
  });


  const handlelocalStateChange = (name: string, value: any) => {
    setlocalState((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSave = (e: any) => {
  // e.preventDefault();
  // console.log("local stetate data", localState);
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
  // };

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
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-18 p-2">
              {props?.InvestigationTypeDataFromApi?.dataSource && <div className="">
                <h2 className="heading">Investigation Type</h2>
                <DropDownListComponent
                  placeholder="Select Investigation Type"
                  name="InvestigationTypeId"
                  value={localState.InvestigationTypeId}
                  dataSource={props.InvestigationTypeDataFromApi}
                  onChange={(e: any) => {
                    handlelocalStateChange("InvestigationTypeId", e.target.value);
                  }}
                  fields={{
                    text: "Title",
                    value: "Id",
                  }}
                />
              </div>}
            </div>

            <div className="grid lg:grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Investigation End Date</h2>
                <DatePickerComponent
                  name="InvestigationEndDate"
                  id="datetimepicker"
                  placeholder="Select Investigation EndDate"
                  value={localState.InvestigationEndDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("InvestigationEndDate", e.target.value);
                  }}
                />
              </div>
              <div className="lg:ml-3">
                <h2 className="heading">Investigation Start Date</h2>
                <DatePickerComponent
                  name="InvestigationStartDate"
                  id="datetimepicker"
                  placeholder="Select Investigation StartDate"
                  value={localState.InvestigationStartDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("InvestigationStartDate", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-18 p-2">
              <h2 className="heading">Description</h2>
              <TextBoxComponent
                name="Description"
                multiline={true}
                placeholder="Enter Description"
                value={localState.Description}
                onChange={(e: any) => {
                  handlelocalStateChange("Description", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(InvestigationInformatiionEditDilog);
