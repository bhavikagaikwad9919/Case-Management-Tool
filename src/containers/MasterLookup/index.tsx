import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import Posture from "../../Component/Posture";
import CausesofActionClaims from "../../Component/CausesofActionClaims";
import CounselType from "../../Component/CounselType";
import DeponentType from "../../Component/DeponentType";
import MatterType from "../../Component/MatterType";
import OutcomeDisposition from "../../Component/OutcomeDisposition";
import InvestigationType from "../../Component/InvestigationType";
import ClientContactType from "../../Component/ClientContactType";
import OutcomeDispositionSpecifics from "../../Component/OutcomeDispositionSpecifics";
import MotionPleadingType from "../../Component/MotionPleadingType";
import MatterStatus from "../../Component/MatterStatus";
import DiscoveryType from "../../Component/DiscoveryType";
import DepositionStatus from "../../Component/DepositionStatus";
import CounselStatus from "../../Component/CounselStatus";
import AllegedLiabilityDefect from "../../Component/AllegedLiabilityDefect";
import WitnessFor from "../../Component/WitnessFor";
import WitnessType from "../../Component/WitnessType";
import CourtType from "../../Component/CourtType";
import Jurisdication from "../../Component/Jurisdiction";
import ClassSettlement from "../../Component/Auto/ClassSettlement";
import VehicleModel from "../../Component/Auto/VehicleModel";
import VehiclePurchaseType from "../../Component/Auto/VehiclePurchaseType";
import ClassSettlementTypeDetails from "../../Component/Auto/ClassSettlementTypeDetails";
import Gender from "../../Component/Auto/Gender";
import PartyStatuslookup from "../../Component/Auto/PartyStatus";
import PartyStatus from "../../Component/Auto/PartyStatus";
import DeadlineDateType from "../../Component/DeadlineDateType";
import CounselFor from "../../Component/CounselFor";
import CounselRole from "../../Component/CounselRole";
import CounselPartyStatus from "../../Component/CounselPartyStatus";

function MasterLookup() {
  let headertext: any;
  headertext = [
    { text: "Alleged Liability" },
    { text: "Causes of Action Claims" },
    { text: "Client Contact Type" },
    { text: "Counsel Status" },
    { text: "Counsel Type" },
    { text: "Counsel For" },
    { text: "Counsel Party Status" },
    { text: "Counsel Role" },
    { text: "Court Type" },
    { text: "Class Settlement" },
    { text: "Class Settlement Type Detail" },
    { text: "Deadline Date Type" },
    { text: "Deponent Type" },
    { text: "Deposition Status" },
    { text: "Discovery Type" },
    { text: "Gender" },
    { text: "Investigation Type" },
    { text: "Matter Status" },
    { text: "Matter Type" },
    { text: "Motion Pleading Type" },
    { text: "Outcome Disposition" },
    { text: "Outcome Dispostion Specifics" },
    { text: "Party Status" },
    { text: "Posture" },
    { text: "Vehicle Model" },
    { text: "Vehicle Purchase Type" },
    { text: "Witness For" },
    { text: "Witness Type" },
    // { text: "Jurisdication"}

  ];

  return (
    <div className="control-pane cantainer">
      <div className="control-section tab-control-section">
        <div className="bg-white py-3 px-3 drop-shadow-xl">
          <h1 className='ml-3 text-lg'>Master Lookups</h1>
        </div>
        <TabComponent
          id="defaultTab"
          className="e-fill"
        >
          <TabItemsDirective>
            <TabItemDirective header={headertext[0]} content={AllegedLiabilityDefect} />
            <TabItemDirective header={headertext[1]} content={CausesofActionClaims} />
            <TabItemDirective header={headertext[2]} content={ClientContactType} />
            <TabItemDirective header={headertext[3]} content={CounselStatus} />
            <TabItemDirective header={headertext[4]} content={CounselType} />
            <TabItemDirective header={headertext[5]} content={CounselFor} />
            <TabItemDirective header={headertext[6]} content={CounselPartyStatus} />
            <TabItemDirective header={headertext[7]} content={CounselRole} />
            <TabItemDirective header={headertext[8]} content={CourtType} />
            <TabItemDirective header={headertext[9]} content={ClassSettlement} />
            <TabItemDirective header={headertext[10]} content={ClassSettlementTypeDetails} />
            <TabItemDirective header={headertext[11]} content={DeadlineDateType} />
            <TabItemDirective header={headertext[12]} content={DeponentType} />
            <TabItemDirective header={headertext[13]} content={DepositionStatus} />
            <TabItemDirective header={headertext[14]} content={DiscoveryType} />
            <TabItemDirective header={headertext[15]} content={Gender} />
            <TabItemDirective header={headertext[16]} content={InvestigationType} />
            <TabItemDirective header={headertext[17]} content={MatterStatus} />
            <TabItemDirective header={headertext[18]} content={MatterType} />
            <TabItemDirective header={headertext[19]} content={MotionPleadingType} />
            <TabItemDirective header={headertext[20]} content={OutcomeDisposition} />
            <TabItemDirective header={headertext[21]} content={OutcomeDispositionSpecifics} />
            <TabItemDirective header={headertext[22]} content={PartyStatus} />
            <TabItemDirective header={headertext[23]} content={Posture} />
            <TabItemDirective header={headertext[24]} content={VehicleModel} />
            <TabItemDirective header={headertext[25]} content={VehiclePurchaseType} />
            <TabItemDirective header={headertext[26]} content={WitnessFor} />
            <TabItemDirective header={headertext[27]} content={WitnessType} />
            {/* <TabItemDirective header={headertext[18]} content={Jurisdication} /> */}
          </TabItemsDirective>
        </TabComponent>
      </div>
    </div>
  );
}
export default MasterLookup;
