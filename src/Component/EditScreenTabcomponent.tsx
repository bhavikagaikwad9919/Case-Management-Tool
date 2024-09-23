import React, { memo, useState, useEffect, useCallback } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { useDispatch, useSelector } from 'react-redux'
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import CaseInfoEditOverView from './CaseInfoEditOverView';
import queryString from 'query-string';
import { useLocation, useParams } from "react-router-dom";
import InjuredParty from "./InjuredParty";
import { MotionPleading } from "./MotionPleading";
import { CourtInformation } from "./CourtInformation";
import { CaseDeposition } from "./CaseDeposition";
import { CaseInvestigation } from "./CaseInvestigation";
import Discovery from "./Discovery";
import {
  fetchCaseDetails,
  fetchPostureDetails,
  fetchAllegedliabilityDetails,
  fetchCauseofclaimsDetails,
  fetchOutcomedispositionSpecificDetails,
  fetchOutcomedispositionDetails,
  fetchVehiclepurchestype,
  fetchVehicleModeltype
} from "../features/case/editcaseSlice";
import PlaintiffInformation from "./PlaintiffInformation";
import SettlementTracking from "./SettlementTracking";
import Deadlines from "./Deadlines";
import VehicleInformationCase from "./VehicleInformationCase";
import DispositionInfoEdit from "./DispositionInfoEdit";
import Counsel from "./Counsel";
const { REACT_APP_BASE_URL } = process.env;

function EditScreenTabcomponent() {

  const rowData = useSelector((state: any) => state.caseedit.caseDetails)
  const AllegedLiabilityDefectdataFromApi = useSelector((state: any) => state.caseedit.allegedLiabilityDefect)
  const CausesofActionClaimdataFromApi = useSelector((state: any) => state.caseedit.causesofActionClaim)
  const OutcomedispositiondataFromApi = useSelector((state: any) => state.caseedit.outcomedispositionDetails)
  const outcomedispositionspecificdataFromApi = useSelector((state: any) => state.caseedit.outcomedispositionspecific)

  // const posturedataFromApi = useSelector((state: any) => state.caseedit.posture)
  const queryActive = new Query().where("IsActive", "equal", true)

  const params: any = useParams();
  const dispatch = useDispatch()

  const id: any = params.id

  const user: any = localStorage.getItem("user");
  var token = JSON.parse(user)?.accessToken;

  useEffect(() => {

    const data: any = {
      query: {
        '$expand': 'CaseInfoAllegedLiabilityDefects',
        '$filter': `ClientReferenceNumber eq '${id}'`
      },
      token
    }
    const dataforOthers = {
      token
    }
    dispatch(fetchCaseDetails(data))
    dispatch(fetchPostureDetails(dataforOthers))
    dispatch(fetchAllegedliabilityDetails(dataforOthers))
    dispatch(fetchCauseofclaimsDetails(dataforOthers))
    dispatch(fetchOutcomedispositionSpecificDetails(dataforOthers))
    dispatch(fetchOutcomedispositionDetails(dataforOthers))
    dispatch(fetchVehiclepurchestype(data))
    dispatch(fetchVehicleModeltype(data))

  }, [])

  let headerText = [
    { text: "Overview" },
    { text: "Plaintiff" },
    { text: "Procedural History" },
    { text: "Court Information" },
    { text: "Deposition" },
    { text: "Discovery" },
    { text: "Important deadlines" },
    { text: "Settlement Tracking" },
    { text: "Plaintiff Information" },
    { text: "Vehicle Information" },
    { text: "Dispostion Info" },
    { text: "Counsel" }
  ];

  console.log(rowData, "inside edit screen")

  return (
    <TabComponent className="e-fill">
      <TabItemsDirective>
        <TabItemDirective
          header={headerText[0]}
          content={() => {
            return (
              CausesofActionClaimdataFromApi &&
              AllegedLiabilityDefectdataFromApi &&
              rowData.Id &&
              <>
                <CaseInfoEditOverView
                  rowData={rowData}
                  AllegedLiabilityDefectdataFromApi={AllegedLiabilityDefectdataFromApi}
                  CausesofActionClaimdataFromApi={CausesofActionClaimdataFromApi}
                />

              </>
            )
          }}
        />
        <TabItemDirective header={headerText[11]} content={() => {
          return (
            <>
              <Counsel rowData={rowData} />

            </>

          )
        }} />
        <TabItemDirective header={headerText[3]} content={() => {
          return (
            <>
              <CourtInformation rowData={rowData} />

            </>

          )
        }} />
        <TabItemDirective header={headerText[4]} content={() => {
          return (
            <>
              <CaseDeposition rowData={rowData} />

            </>
          )
        }} />

        <TabItemDirective header={headerText[5]} content={() => {
          return (
            <>
              <Discovery rowData={rowData} />

            </>
          )
        }} />
        <TabItemDirective header={headerText[10]} content={() => {
          return (
            <>
              <DispositionInfoEdit OutcomedispositiondataFromApi={OutcomedispositiondataFromApi} outcomedispositionspecificdataFromApi={outcomedispositionspecificdataFromApi} rowData={rowData} />

            </>

          )
        }} />
        <TabItemDirective header={headerText[6]} content={() => {
          return (
            <>
              <Deadlines rowData={rowData} />

            </>
          )
        }} />
        <TabItemDirective header={headerText[1]} content={() => {
          return (
            <>
              <InjuredParty rowData={rowData} />

            </>
          )
        }} />
        {/* <TabItemDirective header={headerText[6]} content={() => {
          return (
            <>
            <CaseInvestigation rowData={rowData} />
            
            </>
          )
        }} /> */}
        <TabItemDirective header={headerText[2]} content={() => {
          return (
            <>
              <MotionPleading rowData={rowData} />

            </>
          )
        }} />
        {/* <TabItemDirective header={headerText[8]} content={() => {
          return (
            <>
              <PlaintiffInformation rowData={rowData} />

            </>
          )
        }} /> */}
        <TabItemDirective header={headerText[7]} content={() => {
          return (
            <>
              <SettlementTracking rowData={rowData} />

            </>
          )
        }} />
        <TabItemDirective header={headerText[9]} content={() => {
          return (
            <>
              <VehicleInformationCase rowData={rowData} />

            </>

          )
        }} />

        {/* <TabItemDirective header={headerText[2]} content={content2} /> */}
      </TabItemsDirective>
    </TabComponent>
  )
}

export default memo(EditScreenTabcomponent)