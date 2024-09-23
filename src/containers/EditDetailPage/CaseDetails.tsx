import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import "../../App.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import EditScreenTabcomponent from "../../Component/EditScreenTabcomponent";
import { fetchMatterStatus, fetchMatterType, fetchPostureDetails } from "../../features/case/editcaseSlice";

const { REACT_APP_BASE_URL } = process.env;

function CaseDetails(props: any) {
  const params: any = useParams();
  const dispatch = useDispatch()
  const id: any = params.id;


  const [localState, setlocalState] = useState<any>({
    ClientNum: "",
    MatterNum: "",
    MatterTypeId: "",
    MatterName: "",
    MatterStatusId: "",
    DateFiled: "",
    DateAssigned: "",
    DateServed: "",
    ClientReferenceNumber: "",
    Id: "",
    PostureId: ""
  });

  useEffect(() => {
    localStorage.removeItem("localState");
    localStorage.removeItem("localStateGeneralContentEdit");
    localStorage.removeItem("localStateDispositionContentEdit");
    localStorage.removeItem("localStateMatterTypeContentEdit");
    localStorage.removeItem("localOtherComponentContentEdit");
  }, [])

  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(localState));
  }, [localState]);

  const [gotAllState, setgotAllState] = useState<any>(false);
  const query = new Query().where("ClientReferenceNumber", "equal", id);
  let navigate = useNavigate();

  const matterStatusData = useSelector((state: any) => state.caseedit.matterStatus)
  const matterTypeData = useSelector((state: any) => state.caseedit.matterType)
  const PostureDetailsData = useSelector((state: any) => state.caseedit.posture)

  const user: any = localStorage.getItem("user");
  var token = JSON.parse(user)?.accessToken;
  const userType = useSelector((state: any) => state.users.userType)

  useEffect(() => {
    new DataManager({
      url: `${REACT_APP_BASE_URL}/caseinformation`,
      adaptor: new ODataV4Adaptor(),
      crossDomain: true,
      headers: [{ Authorization: `Bearer ${token}` }],
    })
      .executeQuery(query)
      .then((e: any) => {
        setTimeout(() => {
          setlocalState({
            ClientNum: e?.result[0] && e?.result[0]?.ClientNum,
            MatterNum: e?.result[0] && e?.result[0]?.MatterNum,
            MatterTypeId: e?.result[0] && e?.result[0]?.MatterTypeId,
            MatterName: e?.result[0] && e?.result[0]?.MatterName,
            MatterStatusId: e?.result[0] && e?.result[0]?.MatterStatusId,
            PostureId: e?.result[0] && e?.result[0]?.PostureId,
            DateFiled: e?.result[0] && e?.result[0]?.DateFiled,
            DateAssigned: e?.result[0] && e?.result[0]?.DateAssigned,
            DateServed: e?.result[0] && e?.result[0]?.DateServed,
            ClientReferenceNumber: e?.result[0] && e?.result[0]?.ClientReferenceNumber,
            Id: e?.result[0] && e?.result[0]?.Id
          });

          setgotAllState(true);
        }, 100);
      })
      .catch((e) => {
        console.log("Error: " + e);
      });

    const data = {
      token
    }
    dispatch(fetchMatterStatus(data))
    dispatch(fetchMatterType(data))
    dispatch(fetchPostureDetails(data))
  }, []);


  const handlelocalStateChange = (name: string, value: any) => {
    setlocalState((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {gotAllState ? (
        <div>
          <div className="flex">
            {/* <div
              className="py-5 ml-3"
              onClick={() => {
                window.close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div> */}

            <div className="py-5 w-full">
              <h1 className="text-center font-bold text-lg">
                Edit Case Information - {localState.MatterName}
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 pl-8 pr-8 sm:grid-cols-1 mt-3">
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Client ID:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    value={localState?.ClientNum}
                    onChange={(e: any) => {
                      handlelocalStateChange("ClientNum", e.target.value);
                    }}
                    placeholder="Enter CClient ID"
                    data-msg-containerid="errroForName"
                  />
                </div>
              </div>
            </div>
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Matter #:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    type="number"
                    value={localState.MatterNum}
                    onChange={(e: any) => {
                      handlelocalStateChange("MatterNum", e.target.value);
                    }}
                    placeholder="Enter Matter #"
                    data-msg-containerid="errroForName"
                  />
                </div>
              </div>
            </div>

            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Client Reference #:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    name="ClientReferenceNumber"
                    id="ddlelement"
                    value={localState.ClientReferenceNumber}
                    onChange={(e: any) => {
                      // let a: any;
                      // a = document.getElementById("errroForMatterType");
                      // a.innerHTML = "";
                      handlelocalStateChange("ClientReferenceNumber", e.target.value);
                    }}
                    placeholder="Enter Client Reference #"
                    data-msg-containerid="errroForMatterType"
                  />
                </div>
              </div>
              {/* <div id="errroForMatterType" className="relative left-36" /> */}
            </div>

            <div className="p-1 lg:col-start-1 lg:col-end-4 md:col-start-1 md:col-end-3 sm:col-start-1 sm:col-end-2">
              <div className="">
                <div className="">
                  <div className="text-sm">Matter Name:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    name="matterName"
                    value={localState.MatterName}
                    onChange={(e: any) => {
                      handlelocalStateChange("MatterName", e.target.value);
                    }}
                    placeholder="Enter Matter Name"
                    data-msg-containerid="errroForMatterName"
                  />
                </div>
              </div>
            </div>

            <div className="p-1">
              {matterTypeData ? (
                <div className="">
                  <div className="">
                    <div className="text-sm">Matter Type:</div>
                  </div>
                  <div className="">
                    <DropDownListComponent
                      id="ddlelement"
                      value={localState.MatterTypeId}
                      dataSource={matterTypeData}
                      onChange={(e: any) => {
                        handlelocalStateChange("MatterTypeId", e.target.value);
                      }}
                      placeholder="Select Matter Type"
                      fields={{
                        text: "Title",
                        value: "Id",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>

            {matterStatusData && (
              <div className="p-1">
                <div className="">
                  <div className="">
                    <div className="text-sm">Matter Status:</div>
                  </div>
                  <div className="">
                    {matterStatusData && (
                      <DropDownListComponent
                        id="ddlelement"
                        value={localState?.MatterStatusId}
                        dataSource={matterStatusData}
                        onChange={(e: any) => {
                          handlelocalStateChange(
                            "MatterStatusId",
                            e.target.value
                          );
                        }}
                        placeholder="Select Matter Status"
                        fields={{
                          text: "Title",
                          value: "Id",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {PostureDetailsData && (
              <div className="p-1">
                <div className="">
                  <div>
                    <div className="text-sm">Posture:</div>
                  </div>
                  <div className="">
                    {PostureDetailsData && (
                      <DropDownListComponent
                        id="ddlelement"
                        dataSource={PostureDetailsData}
                        value={localState?.PostureId}
                        onChange={(e: any) => {
                          handlelocalStateChange("PostureId", e.target.value);
                        }}
                        placeholder="Select Posture"
                        fields={{
                          text: "Title",
                          value: "Id",
                        }}
                      />)}
                  </div>
                </div>
              </div>)}

            
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Date Filed:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    id="datetimepicker"
                    placeholder="Select Date Filed"
                    value={localState.DateFiled}
                    onChange={(e: any) => {
                      handlelocalStateChange("DateFiled", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Date Assigned:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    id="datetimepicker"
                    placeholder="Select Date Assigned"
                    value={localState.DateAssigned}
                    onChange={(e: any) => {
                      handlelocalStateChange("DateAssigned", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Date Served:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    type="Date"
                    id="datetimepicker"
                    placeholder="Select Date Served"
                    value={localState.DateServed}
                    onChange={(e: any) => {
                      handlelocalStateChange("DateServed", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pl-8 pr-8 mt-8">
            <EditScreenTabcomponent
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
export default CaseDetails;
