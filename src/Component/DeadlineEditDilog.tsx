import React, { useState, memo } from "react";
import { useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";


function DeadlineEditDilog(props: any) {
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.idFromUrl;

  const [localState, setlocalState] = useState<any>({
    CaseInformationId: idFromUrl,
    DeadlineDate: props.DeadlineDate ?? null,
    DescriptionOfEvent: props.DescriptionOfEvent ?? null,
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
              <div className="">
                <h2 className="heading">Deadline Date</h2>
                <DatePickerComponent
                  name="DeadlineDate"
                  id="datetimepicker"
                  placeholder="Select Deadline Date"
                  value={localState.DeadlineDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("DeadlineDate", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-18 p-2">
              <h2 className="heading">Description</h2>
              <TextBoxComponent
                name="DescriptionOfEvent"
                multiline={true}
                placeholder="Enter Description Of Event"
                value={localState.DescriptionOfEvent}
                onChange={(e: any) => {
                  handlelocalStateChange("DescriptionOfEvent", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(DeadlineEditDilog);
