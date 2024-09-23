import React, { memo, useState, useEffect, useCallback } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { useDispatch, useSelector } from 'react-redux'
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import queryString from 'query-string';
import { useLocation, useParams } from "react-router-dom";
import { InjuryDeposition } from "./InjuryDeposition";
import Discovery from "./Discovery";
import { fetchCaseDetails, 
        fetchPostureDetails,
        fetchAllegedliabilityDetails,
        fetchCauseofclaimsDetails,
        fetchOutcomedispositionSpecificDetails,
        fetchOutcomedispositionDetails } from "../features/case/editcaseSlice";
const { REACT_APP_BASE_URL } = process.env;

function InjuredPartyEditTabComponent({ }: any) {
//   const rowData = useSelector((state: any) => state.caseedit.caseDetails)
//   const posturedataFromApi = useSelector((state: any) => state.caseedit.posture)
//   const AllegedLiabilityDefectdataFromApi = useSelector((state: any) => state.caseedit.allegedLiabilityDefect)
//   const CausesofActionClaimdataFromApi = useSelector((state: any) => state.caseedit.causesofActionClaim)
//   const OutcomedispositiondataFromApi = useSelector((state: any) => state.caseedit.outcomedispositionDetails)
//   const outcomedispositionspecificdataFromApi =  useSelector((state: any) => state.caseedit.outcomedispositionspecific)
    
   

  const params: any = useParams();
  const dispatch = useDispatch()
  
  const id: any = params.id
  const idFromUrl = parseInt(id)

  const user: any = localStorage.getItem("user");
  var token = JSON.parse(user)?.accessToken;

//   useEffect(() => {

//     const data: any = {
//       query: {
//         '$expand': 'CaseInfoAllegedLiabilityDefects'
//       },
//       id: idFromUrl
//     }
//     const dataforOthers = {
//       token
//     }
//     dispatch(fetchCaseDetails(data))
//     dispatch(fetchPostureDetails(dataforOthers))
//     dispatch(fetchAllegedliabilityDetails(dataforOthers))
//     dispatch(fetchCauseofclaimsDetails(dataforOthers))
//     dispatch(fetchOutcomedispositionSpecificDetails(dataforOthers))
//     dispatch(fetchOutcomedispositionDetails(dataforOthers))
//   }, [])
  

  let headerText = [
    { text: "Plaintiff Deposition" },
  ];


  return (
    <TabComponent className="e-fill">
      <TabItemsDirective>
      <TabItemDirective header={headerText[0]} content={() => {
          return (
            <InjuryDeposition />
          )
        }} />
      </TabItemsDirective>
    </TabComponent>
  )
}

export default memo(InjuredPartyEditTabComponent)