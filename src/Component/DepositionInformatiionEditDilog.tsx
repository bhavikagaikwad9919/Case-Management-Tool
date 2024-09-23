import React, { useState, memo } from "react";
import { useParams } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useDispatch, useSelector } from 'react-redux'


function DepositionInformatiionEditDilog(props: any) {
  const params: any = useParams();
  const id: any = params.id;
  const idFromUrl = props.idFromUrl;

  const [localState, setlocalState] = useState<any>({
    CaseInformationId: idFromUrl,
    DeponentTypeId: props.DeponentTypeId ?? null,
    DeponentName: props.DeponentName ?? null,
    DepositionNoticedBy: props.DepositionNoticedBy ?? null,
    DepositionDate: props.DepositionDate ?? false,
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
            <div className="grid lg:grid-cols-2 p-2">
            {props?.DeponentTypeDataFromApi?.dataSource && <div className="">
                <h2 className="heading">Deponent Type</h2>
                <DropDownListComponent
                  placeholder="Select Deponent Type"
                  name="DeponentTypeId"
                  value={localState.DeponentTypeId}
                  dataSource={props.DeponentTypeDataFromApi}
                  onChange={(e: any) => {
                    handlelocalStateChange("DeponentTypeId", e.target.value);
                  }}
                  fields={{
                    text: "Title",
                    value: "Id",
                  }}
                />
              </div>}
              <div className="lg:ml-3">
                <h2 className="heading">Deposition Date</h2>
                <DatePickerComponent
                  name="DepositionDate"
                  id="datetimepicker"
                  placeholder="Select Deposition Date"
                  value={localState.DepositionDate}
                  data-msg-containerid="errroForDateFiled"
                  onChange={(e: any) => {
                    handlelocalStateChange("DepositionDate", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 p-2">
              <div className="">
                <h2 className="heading">Deponent Name</h2>
                <TextBoxComponent
                  name="DeponentName"
                  placeholder="Enter Deponent Name"
                  value={localState.DeponentName}
                  onChange={(e: any) => {
                    handlelocalStateChange("DeponentName", e.target.value);
                  }}
                />
              </div>
              <div className="lg:ml-3">
                <h2 className="heading">Deposition Noticed By</h2>
                <TextBoxComponent
                  name="DepositionNoticedBy"
                  placeholder="Enter Deposition Noticed By"
                  value={localState.DepositionNoticedBy}
                  onChange={(e: any) => {
                    handlelocalStateChange(
                      "DepositionNoticedBy",
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
export default memo(DepositionInformatiionEditDilog);
