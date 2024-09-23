import React, { memo, useState, useEffect } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { useDispatch, useSelector } from 'react-redux'
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import CaseInfoAddOverView from './CaseInfoAddOverView';
import {
  fetchVehiclepurchestype,
  fetchVehicleModeltype,
  fetchPostureDetails,
  fetchAllegedliabilityDetails,
  fetchCauseofclaimsDetails,
  fetchOutcomedispositionSpecificDetails,
  fetchOutcomedispositionDetails
} from "../features/case/editcaseSlice"
import { useNavigate } from "react-router-dom";
import DispositionInfoAdd from "./DispositionInfoAdd";

import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import SettlementTrackingAdd from "./SettlementTrackingAdd";

const { REACT_APP_BASE_URL } = process.env;

function AddScreenTabComponent(props : any) {
  const {handleSaveCasedetails} = props;
  const queryIsActive = new Query().where("IsActive", "equal", true)
  // const [rowData, setrowData] = useState<any>([])
  const AllegedLiabilityDefectdataFromApi = useSelector((state: any) => state.caseedit.allegedLiabilityDefect)
  const CausesofActionClaimdataFromApi = useSelector((state: any) => state.caseedit.causesofActionClaim)
  const OutcomedispositiondataFromApi = useSelector((state: any) => state.caseedit.outcomedispositionDetails)
  const outcomedispositionspecificdataFromApi = useSelector((state: any) => state.caseedit.outcomedispositionspecific)
  const user: any = localStorage.getItem("user");
  var token = JSON.parse(user)?.accessToken;



  const dispatch = useDispatch()
  let navigate = useNavigate();

  useEffect(() => {
    const data = {
      token
    }

    dispatch(fetchPostureDetails(data))
    dispatch(fetchAllegedliabilityDetails(data))
    dispatch(fetchCauseofclaimsDetails(data))
    dispatch(fetchOutcomedispositionSpecificDetails(data))
    dispatch(fetchOutcomedispositionDetails(data))
    dispatch(fetchVehiclepurchestype(data))
    dispatch(fetchVehicleModeltype(data))
  }, [])


  let headerText = [
    { text: "Overview" },
    { text: "Disposition Info" },
    { text: "Settlement Tracking" }
  ];

  return (
    <div>
      <TabComponent  className="e-fill">
        <TabItemsDirective>
          <TabItemDirective
            header={headerText[0]}
            content={() => {
              return (
                <>
                  <CaseInfoAddOverView
                    handleSaveCasedetails={handleSaveCasedetails}
                    AllegedLiabilityDefectdataFromApi={AllegedLiabilityDefectdataFromApi}
                    CausesofActionClaimdataFromApi={CausesofActionClaimdataFromApi}
                  />
                </>
              )
            }}
          />
          <TabItemDirective
            header={headerText[1]}
            content={() => {
              return (
                <>
                  <DispositionInfoAdd
                    handleSaveCasedetails={handleSaveCasedetails}
                    OutcomedispositiondataFromApi={OutcomedispositiondataFromApi}
                    outcomedispositionspecificdataFromApi={outcomedispositionspecificdataFromApi}
                  />
                </>
              )
            }}
          />
           <TabItemDirective
            header={headerText[2]}
            content={() => {
              return (
                <>
                  <SettlementTrackingAdd
                    handleSaveCasedetails={handleSaveCasedetails}
                  />
                </>
              )
            }}
          />
        </TabItemsDirective>
      </TabComponent>
    </div>
  )
}

export default memo(AddScreenTabComponent)