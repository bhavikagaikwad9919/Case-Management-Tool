import React, { useState, useEffect, useCallback } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import "../../App.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useNavigate } from "react-router-dom";
import AddScreenTabComponent from "../../Component/AddScreenTabComponent";
import { useDispatch, useSelector } from 'react-redux'
import { fetchMatterStatus, fetchMatterType ,fetchPostureDetails} from "../../features/case/editcaseSlice";

const { REACT_APP_DATE_FORMAT, REACT_APP_BASE_URL } = process.env;

function CaseAdd() {
  let formObject: any;
  const clientNumRef = React.useRef(null);
  const matterNumberRef = React.useRef(null);

  const matterTypeRef = React.useRef(null);
  const matterNameRef = React.useRef(null);

  const matterStatusRef = React.useRef(null);
  const dateFiledref = React.useRef(null);

  const dateAssignedRef = React.useRef(null);
  const dateServedRef = React.useRef(null);

  let navigate = useNavigate();
  const dispatch = useDispatch()
  const matterStatusData = useSelector((state: any) => state.caseedit.matterStatus)
  const matterTypeData = useSelector((state: any) => state.caseedit.matterType)
  const posturedataFromApi = useSelector((state: any) => state.caseedit.posture)
  const token = useSelector((state: any) => state.users.token)

  useEffect(() => {
    if (token) {
      const data = {
        token
      }
      dispatch(fetchMatterStatus(data))
      dispatch(fetchMatterType(data))
      dispatch(fetchPostureDetails(data))
    }
  }, [token]);

  useEffect(() => {
    localStorage.removeItem("localStateAdd");
    localStorage.removeItem("localStateGeneralContent");
    localStorage.removeItem("localStateDispositionContent");
  }, [])



  const [localState, setlocalState] = useState<any>({
    ClientNum: "",
    MatterNum: "",
    MatterType: "",
    MatterTypeId: "",
    MatterName: "",
    MatterStatus: "",
    MatterStatusId: "",
    DateFiled: "",
    DateAssigned: "",
    DateServed: "",
    ClientReferenceNumber: "",
    PostureId: ""
  });

  useEffect(() => {
    localStorage.setItem("localStateAdd", JSON.stringify(localState));
  }, [localState]);

  const handleSaveCasedetails = useCallback(
    (updatedObject: any, showBtnClick: any) => {
      let newBody: any = {};
  
      if (updatedObject.ClientNum && updatedObject.ClientNum !== "") {
        newBody.ClientNum = updatedObject.ClientNum;
      }
      if (updatedObject?.ClientReferenceNumber && updatedObject.ClientReferenceNumber !== "") {
        newBody.ClientReferenceNumber = updatedObject?.ClientReferenceNumber;
      }
      // if (updatedObject.PurchaseDate && updatedObject.PurchaseDate !== "") {
      //   newBody.PurchaseDate = updatedObject.PurchaseDate;
      // }
      // if (updatedObject.VehiclePurchaseTypeId && updatedObject.VehiclePurchaseTypeId !== "") {
      //   newBody.VehiclePurchaseTypeId = updatedObject.VehiclePurchaseTypeId;
      // }
      // if (updatedObject.OtherVehicleSalesInfo && updatedObject.OtherVehicleSalesInfo !== "") {
      //   newBody.OtherVehicleSalesInfo = updatedObject.OtherVehicleSalesInfo;
      // }
      // if (updatedObject.DaysOutOfService && updatedObject.DaysOutOfService !== "") {
      //   newBody.DaysOutOfService = updatedObject.DaysOutOfService;
      // }
      // if (updatedObject.RISCSalesLeaseContract) {
      //   newBody.RISCSalesLeaseContract =
      //     updatedObject.RISCSalesLeaseContract;
      // } else {
      //   newBody.RISCSalesLeaseContract = false;
      // }
      // if (updatedObject.CABuyBackRequestFlag) {
      //   newBody.CABuyBackRequestFlag =
      //     updatedObject.CABuyBackRequestFlag;
      // } else {
      //   newBody.CABuyBackRequestFlag = false;
      // }
      // if (updatedObject.PriorClassSettlementFlag) {
      //   newBody.PriorClassSettlementFlag =
      //     updatedObject.PriorClassSettlementFlag;
      // } else {
      //   newBody.PriorClassSettlementFlag = false;
      // }

        if (updatedObject.SettlementAuthorityRequested) {
        newBody.SettlementAuthorityRequested =
          updatedObject.SettlementAuthorityRequested;
      } else {
        newBody.SettlementAuthorityRequested = false;
      }

      if (updatedObject.MatterNum && updatedObject.MatterNum !== "") {
        newBody.MatterNum = updatedObject.MatterNum;
      }
      if (updatedObject.MatterTypeId && updatedObject.MatterTypeId !== "") {
        newBody.MatterTypeId = updatedObject.MatterTypeId;
      }
      if (updatedObject.MatterName && updatedObject.MatterName !== "") {
        newBody.MatterName = updatedObject.MatterName;
      }
      if (updatedObject.MatterStatusId && updatedObject.MatterStatusId !== "") {
        newBody.MatterStatusId = updatedObject.MatterStatusId;
      }
      if (updatedObject.DateFiled && updatedObject.DateFiled !== "") {
        newBody.DateFiled = updatedObject.DateFiled;
      }
      if (updatedObject.DateAssigned && updatedObject.DateAssigned !== "") {
        newBody.DateAssigned = updatedObject.DateAssigned;
      }
      if (updatedObject.DateServed && updatedObject.DateServed !== "") {
        newBody.DateServed = updatedObject.DateServed;
      }
      if (
        updatedObject.CaseInfoAllegedLiabilityDefects.length > 0
      ) {
        newBody.CaseInfoAllegedLiabilityDefects =
          updatedObject.CaseInfoAllegedLiabilityDefects;
      } else {
        newBody.CaseInfoAllegedLiabilityDefects = []
      }
      if (updatedObject.AmountReceived && updatedObject.AmountReceived !== "") {
        newBody.AmountReceived = parseFloat(updatedObject.AmountReceived);
      }
      if (updatedObject.CurrentSettlementDemand && updatedObject.CurrentSettlementDemand !== "") {
        newBody.CurrentSettlementDemand = parseFloat(updatedObject.CurrentSettlementDemand);
      }
      if (updatedObject.CurrentSettlementOffer && updatedObject.CurrentSettlementOffer !== "") {
        newBody.CurrentSettlementOffer = parseFloat(updatedObject.CurrentSettlementOffer);
      }
      if (
        updatedObject.AmountRequested &&
        updatedObject.AmountRequested !== ""
      ) {
        newBody.AmountRequested = parseFloat(updatedObject.AmountRequested);
      }
      if (
        updatedObject.FinalSettlementAccepted &&
        updatedObject.FinalSettlementAccepted !== ""
      ) {
        newBody.FinalSettlementAccepted = parseFloat(updatedObject.FinalSettlementAccepted);
      }
      if (
        updatedObject.CausesofActionClaimsId &&
        updatedObject.CausesofActionClaimsId !== ""
      ) {
        newBody.CausesofActionClaimsId = parseFloat(
          updatedObject.CausesofActionClaimsId
        );
      }
  
      if (
        updatedObject.DateAnswerFiled &&
        updatedObject.DateAnswerFiled !== ""
      ) {
        newBody.DateAnswerFiled = updatedObject.DateAnswerFiled;
      }
      if (
        updatedObject.CurrentSettlementOfferDate &&
        updatedObject.CurrentSettlementOfferDate !== ""
      ) {
        newBody.CurrentSettlementOfferDate = updatedObject.CurrentSettlementOfferDate;
      }

      if (
        updatedObject.DateFinalSettlementAccepted &&
        updatedObject.DateFinalSettlementAccepted !== ""
      ) {
        newBody.DateFinalSettlementAccepted = updatedObject.DateFinalSettlementAccepted;
      }
      
      if (
        updatedObject.DateClaimSubmitted &&
        updatedObject.DateClaimSubmitted !== ""
      ) {
        newBody.DateClaimSubmitted = updatedObject.DateClaimSubmitted;
      }
      if (
        updatedObject.DateOffirstNotice &&
        updatedObject.DateOffirstNotice !== ""
      ) {
        newBody.DateOffirstNotice = updatedObject.DateOffirstNotice;
      }
      if (
        updatedObject.DateReleaseReceived &&
        updatedObject.DateReleaseReceived !== ""
      ) {
        newBody.DateReleaseReceived = updatedObject.DateReleaseReceived;
      }
      if (
        updatedObject.DateRemovalFiled &&
        updatedObject.DateRemovalFiled !== ""
      ) {
        newBody.DateRemovalFiled = updatedObject.DateRemovalFiled;
      }
      if (
        updatedObject.DateSettlementAuthorityReceived &&
        updatedObject.DateSettlementAuthorityReceived !== ""
      ) {
        newBody.DateSettlementAuthorityReceived =
          updatedObject.DateSettlementAuthorityReceived;
      }
      if (updatedObject.AttorneysFeesandCostsRequested) {
        newBody.AttorneysFeesandCostsRequested =
          updatedObject.AttorneysFeesandCostsRequested;
      } else {
        newBody.AttorneysFeesandCostsRequested = false;
      }
      if (updatedObject.PunitiveDamagesRequested) {
        newBody.PunitiveDamagesRequested =
          updatedObject.PunitiveDamagesRequested;
      } else {
        newBody.PunitiveDamagesRequested = false;
      }

      if (
        updatedObject.DateSettlementAuthorityRequested &&
        updatedObject.DateSettlementAuthorityRequested !== ""
      ) {
        newBody.DateSettlementAuthorityRequested =
          updatedObject.DateSettlementAuthorityRequested;
      }
      if (
        updatedObject.DismissalFiledDate &&
        updatedObject.DismissalFiledDate !== ""
      ) {
        newBody.DismissalFiledDate = updatedObject.DismissalFiledDate;
      }
      if (
        updatedObject.DispositionDate &&
        updatedObject.DispositionDate !== ""
      ) {
        newBody.DispositionDate = updatedObject.DispositionDate;
      }
      if (
        updatedObject.DispositionSummary &&
        updatedObject.DispositionSummary !== ""
      ) {
        newBody.DispositionSummary = updatedObject.DispositionSummary;
      }
      if (
        updatedObject.ExpertDiscoveryCloseDate &&
        updatedObject.ExpertDiscoveryCloseDate !== ""
      ) {
        newBody.ExpertDiscoveryCloseDate =
          updatedObject.ExpertDiscoveryCloseDate;
      }
      if (
        updatedObject.FactDiscoveryCloseDate &&
        updatedObject.FactDiscoveryCloseDate !== ""
      ) {
        newBody.FactDiscoveryCloseDate = updatedObject.FactDiscoveryCloseDate;
      }
      if (updatedObject.Facts && updatedObject.Facts !== "") {
        newBody.Facts = updatedObject.Facts;
      }
      if (
        updatedObject.Generaldamagesdescription &&
        updatedObject.Generaldamagesdescription !== ""
      ) {
        newBody.Generaldamagesdescription =
          updatedObject.Generaldamagesdescription;
      }
      if (
        updatedObject.InitialSettlementDemand &&
        updatedObject.InitialSettlementDemand !== ""
      ) {
        newBody.InitialSettlementDemand = parseFloat(
          updatedObject.InitialSettlementDemand
        );
      }
      if (
        updatedObject.InitialSettlementOffer &&
        updatedObject.InitialSettlementOffer !== ""
      ) {
        newBody.InitialSettlementOffer = parseFloat(
          updatedObject.InitialSettlementOffer
        );
      }
      if (
        updatedObject.InitialSettlementOfferDate &&
        updatedObject.InitialSettlementOfferDate !== ""
      ) {
        newBody.InitialSettlementOfferDate =
          updatedObject.InitialSettlementOfferDate;
      }
      if (
        updatedObject.OutcomeDispositionId &&
        updatedObject.OutcomeDispositionId !== ""
      ) {
        newBody.OutcomeDispositionId = updatedObject.OutcomeDispositionId;
      }
      if (
        updatedObject.OutcomeDispositionSpecificId &&
        updatedObject.OutcomeDispositionSpecificId !== ""
      ) {
        newBody.OutcomeDispositionSpecificId =
          updatedObject.OutcomeDispositionSpecificId;
      }
      if (updatedObject.PostureId && updatedObject.PostureId !== "") {
        newBody.PostureId = updatedObject.PostureId;
      }
      if (
        updatedObject.SettlementAmount &&
        updatedObject.SettlementAmount !== ""
      ) {
        newBody.SettlementAmount = parseFloat(updatedObject.SettlementAmount);
      }
      if (
        updatedObject.SettlementAmountClientContribution &&
        updatedObject.SettlementAmountClientContribution !== ""
      ) {
        newBody.SettlementAmountClientContribution = parseFloat(
          updatedObject.SettlementAmountClientContribution
        );
      }
      if (updatedObject.TrialDate && updatedObject.TrialDate !== "") {
        newBody.TrialDate = updatedObject.TrialDate;
      }
      if (updatedObject.TrialStartDate && updatedObject.TrialStartDate !== "") {
        newBody.TrialStartDate = updatedObject.TrialStartDate;
      }
      if (
        updatedObject.TrialVerdictAmount &&
        updatedObject.TrialVerdictAmount !== ""
      ) {
        newBody.TrialVerdictAmount = parseFloat(
          updatedObject.TrialVerdictAmount
        );
      }
      if (
        updatedObject.TrialVerdictDate &&
        updatedObject.TrialVerdictDate !== ""
      ) {
        newBody.TrialVerdictDate = updatedObject.TrialVerdictDate;
      }

      if (updatedObject.DealerName && updatedObject.DealerName !== "") {
        newBody.DealerName = updatedObject.DealerName;
      }
      if (updatedObject.DateOfTender && updatedObject.DateOfTender !== "") {
        newBody.DateOfTender = updatedObject.DateOfTender;
      }
      if (updatedObject.DateOfResponse && updatedObject.DateOfResponse !== "") {
        newBody.DateOfResponse = updatedObject.DateOfResponse;
      }
      if (updatedObject.DateOfAgreementExecuted && updatedObject.DateOfAgreementExecuted !== "") {
        newBody.DateOfAgreementExecuted = updatedObject.DateOfAgreementExecuted;
      }
      if (updatedObject.CivilPenaltiesEstimate && updatedObject.CivilPenaltiesEstimate !== "") {
        newBody.CivilPenaltiesEstimate = parseFloat(updatedObject.CivilPenaltiesEstimate);
      }
      if (updatedObject.FraudClaimsFlag) {
        newBody.FraudClaimsFlag =
          updatedObject.FraudClaimsFlag;
      } else {
        newBody.FraudClaimsFlag = false;
      }
      if (updatedObject.CivilPenaltiesFlag) {
        newBody.CivilPenaltiesFlag =
          updatedObject.CivilPenaltiesFlag;
      } else {
        newBody.CivilPenaltiesFlag = false;
      }

      axios
        .post(`${REACT_APP_BASE_URL}/caseinformation`, newBody)
        .then((response: any) => {
          console.log(response,"here is some response")
          if (response.status === 200) {
            // showBtnClick();
            setTimeout(() => {
              navigate(`/casedetails/${response?.data?.ClientReferenceNumber}`);
            }, 1500);
          }
        })
        .catch((error: any) => {
          console.log(error,"error here")
           alert("Something went wrong")
        });
      // dm.executeQuery(new Query()).then((e: ReturnOption) => {
      //   localStorage.removeItem("localStateAdd");
      //   showBtnClick();
      //   setTimeout(() => {
      //     navigate(-1);
      //   }, 2000);
      // });
      // } else {
      //   window.scrollTo({ top: 0, behavior: "smooth" });
      // }
    },
    [navigate]
  );

  const handlelocalStateChange = (name: string, value: any) => {
    setlocalState((prevState: any, props: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //F78A3C
  return (
    <div>
      <div>
        <div className="flex">
          <div className="py-5 ml-3" onClick={() => navigate(-1)}>
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
          </div>

          <div className="py-5 w-full">
            <h1 className="text-center font-bold text-lg">
              Add Case Information
            </h1>
          </div>
        </div>

        <form id="form1">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 pl-8 pr-8 sm:grid-cols-1 mt-3">
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Client ID:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    name="clientNum"
                    ref={clientNumRef}
                    value={localState.ClientNum}
                    onChange={(e: any) => {
                      handlelocalStateChange("ClientNum", e.target.value);
                    }}
                    placeholder="Enter Client ID"
                    data-msg-containerid="errroForClientNum"
                  />
                </div>
              </div>
              {/* <div id="errroForClientNum" className="relative left-36" /> */}
            </div>
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Matter #:</div>
                </div>
                <div className="">
                  <TextBoxComponent
                    name="matterNumber"
                    ref={matterNumberRef}
                    type="number"
                    value={localState.MatterNum}
                    onChange={(e: any) => {
                      handlelocalStateChange("MatterNum", e.target.value);
                    }}
                    placeholder="Enter Matter #"
                    data-msg-containerid="errroForMatterNumber"
                  />
                </div>
              </div>
              {/* <div id="errroForMatterNumber" className="relative left-36" /> */}
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
                    ref={matterNameRef}
                    value={localState.MatterName}
                    onChange={(e: any) => {
                      handlelocalStateChange("MatterName", e.target.value);
                    }}
                    placeholder="Enter Matter Name"
                    data-msg-containerid="errroForMatterName"
                  />
                </div>
              </div>
              {/* <div id="errroForMatterName" className="relative left-36" /> */}
            </div>

            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Matter Type:</div>
                </div>
                {matterTypeData && <div className="">
                  <DropDownListComponent
                    name="matterType"
                    ref={matterTypeRef}
                    id="ddlelement"
                    value={localState.MatterTypeId}
                    dataSource={matterTypeData}
                    onChange={(e: any) => {
                      // let a: any;
                      // a = document.getElementById("errroForMatterType");
                      // a.innerHTML = "";
                      handlelocalStateChange("MatterTypeId", e.target.value);
                    }}
                    placeholder="Select Matter Type"
                    fields={{
                      text: "Title",
                      value: "Id",
                    }}
                    data-msg-containerid="errroForMatterType"
                  />
                </div>}
              </div>
              {/* <div id="errroForMatterType" className="relative left-36" /> */}
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
                        name="matterStatus"
                        ref={matterStatusRef}
                        id="ddlelement"
                        value={localState?.MatterStatusId}
                        dataSource={matterStatusData}
                        onChange={(e: any) => {
                          // let a: any;
                          // a = document.getElementById("errroForMatterStatus");
                          // a.innerHTML = "";
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
                        data-msg-containerid="errroForMatterStatus"
                      />
                    )}
                  </div>
                </div>
                {/* <div id="errroForMatterStatus" className="relative left-36" /> */}
              </div>
            )}
            <div className="p-1">
              <div className="">
                <div>
                  <div className="text-sm">Posture:</div>
                </div>
                <div className="">
                  <DropDownListComponent
                    id="ddlelement"
                    dataSource={posturedataFromApi}
                    value={localState.PostureId}
                    onChange={(e: any) => {
                      handlelocalStateChange("PostureId", e.target.value);
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
                <div className="">
                  <div className="text-sm">Date Filed:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    name="dateFiled"
                    ref={dateFiledref}
                    id="datetimepicker"
                    placeholder="Select Date Filed"
                    value={localState.DateFiled}
                    onChange={(e: any) => {
                      // let a: any;
                      // a = document.getElementById("errroForDateFiled");
                      // a.innerHTML = "";
                      handlelocalStateChange("DateFiled", e.target.value);
                    }}
                    data-msg-containerid="errroForDateFiled"
                  />
                </div>
              </div>
              {/* <div id="errroForDateFiled" className="relative left-36" /> */}
            </div>

            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Date Assigned:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    name="DateAssigned"
                    ref={dateAssignedRef}
                    id="datetimepicker"
                    placeholder="Select Date Assigned"
                    value={localState.DateAssigned}
                    onChange={(e: any) => {
                      // let a: any;
                      // a = document.getElementById("errroForDateAssigned");
                      // a.innerHTML = "";
                      handlelocalStateChange("DateAssigned", e.target.value);
                    }}
                    data-msg-containerid="errroForDateAssigned"
                  />
                </div>
              </div>
              {/* <div id="errroForDateAssigned" className="relative left-36" /> */}
            </div>
            <div className="p-1">
              <div className="">
                <div className="">
                  <div className="text-sm">Date Served:</div>
                </div>
                <div className="">
                  <DatePickerComponent
                    name="dateServed"
                    ref={dateServedRef}
                    type="Date"
                    id="datetimepicker"
                    placeholder="Select Date Served"
                    value={localState.DateServed}
                    onChange={(e: any) => {
                      // let a: any;
                      // a = document.getElementById("errroForDateServed");
                      // a.innerHTML = "";
                      handlelocalStateChange("DateServed", e.target.value);
                    }}
                    data-msg-containerid="errroForDateServed"
                  />
                </div>
              </div>
              {/* <div id="errroForDateServed" className="relative left-36" /> */}
            </div>
          </div>

          <div className="marginBottom pl-8 pr-8 mt-8">
            <AddScreenTabComponent
            handleSaveCasedetails={handleSaveCasedetails}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default CaseAdd;
