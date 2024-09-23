import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import Jurisdication from "../../Component/Jurisdiction";

function Home() {
  let headertext: any;
  headertext = [
   
    { text: "Jurisdication"},

  ];

  return (
    <div className="control-pane">
      <div className="control-section tab-control-section">
        <TabComponent
          id="defaultTab"
          className="e-fill"
        >
          <TabItemsDirective>
           
            <TabItemDirective header={headertext[0]} content={Jurisdication} />

          </TabItemsDirective>
        </TabComponent>
      </div>
    </div>
  );
}
export default Home;
