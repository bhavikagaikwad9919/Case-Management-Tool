import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import CounselStatus from "../../Component/CounselStatus";
import { useNavigate } from "react-router-dom";

import { ActionClaims, ContactType, CounselTypee, DeponentTypee, DepositionStatuss, DiscoveryTypee, InvestigationTypee, liabilityDefect, MatterStatuss, MatterTypee, MotionPleadingTypee, OutcomeDispositionn, OutcomeDispositionSpecificss, Posturee } from "../../constComponent/constFunction";
import WitnessType from "../../Component/WitnessType";
import WitnessFor from "../../Component/WitnessFor";

function Home(props: any) {


  let headertext: any;
  headertext = [
    { text: "Alleged Liability" },
    { text: "Causes of Action Claims" },
    { text: "Client Contact Type" },
    { text: "Counsel Status" },
    { text: "Counsel Type" },
    { text: "Deponent Type" },
    { text: "Deposition Status" },
    { text: "Discovery Type" },
    { text: "Investigation Type" },
    { text: "Matter Status" },
    { text: "Matter Type" },
    { text: "Motion Pleading Type" },
    { text: "Outcome Disposition" },
    { text: "Outcome Dispostion Specifics" },
    { text: "Posture" },
    // { text: "Witness For"},
    // { text: "Witness Type"},

  ];



  return (
    <div className="control-pane">
      <div className="control-section tab-control-section">
        <TabComponent
          id="defaultTab"
          className="e-fill"
        >

          <TabItemsDirective>
            <TabItemDirective header={headertext[0]} content={() => liabilityDefect(props)} />
            <TabItemDirective header={headertext[1]} content={() => ActionClaims(props)} />
            <TabItemDirective header={headertext[2]} content={() => ContactType(props)} />
            <TabItemDirective header={headertext[3]} content={() => CounselStatus(props)} />
            <TabItemDirective header={headertext[4]} content={() => CounselTypee(props)} />
            <TabItemDirective header={headertext[5]} content={() => DeponentTypee(props)} />
            <TabItemDirective header={headertext[6]} content={() => DepositionStatuss(props)} />
            <TabItemDirective header={headertext[7]} content={() => DiscoveryTypee(props)} />
            <TabItemDirective header={headertext[8]} content={() => InvestigationTypee(props)} />
            <TabItemDirective header={headertext[9]} content={() => MatterStatuss(props)} />
            <TabItemDirective header={headertext[10]} content={() => MatterTypee(props)} />
            <TabItemDirective header={headertext[11]} content={() => MotionPleadingTypee(props)} />
            <TabItemDirective header={headertext[12]} content={() => OutcomeDispositionn(props)} />
            <TabItemDirective header={headertext[13]} content={() => OutcomeDispositionSpecificss(props)} />
            <TabItemDirective header={headertext[14]} content={() => Posturee(props)} />
            {/* <TabItemDirective header={headertext[15]} content={() => WitnessFor(props)} />
            <TabItemDirective header={headertext[16]} content={() => WitnessType(props)} /> */}
          </TabItemsDirective>
        </TabComponent>
      </div>
    </div>
  );
}
export default Home;
