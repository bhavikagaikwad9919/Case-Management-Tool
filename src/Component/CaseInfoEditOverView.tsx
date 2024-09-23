import React, { useState, useEffect, memo } from "react";
import { CheckBoxSelection, DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import "../App.css"
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { useNavigate } from "react-router-dom";
import { PositionDataModel } from "@syncfusion/ej2-popups";
import {
  ToastComponent,
  ToastCloseArgs,
} from "@syncfusion/ej2-react-notifications";
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { MultiSelectComponent, Inject } from "@syncfusion/ej2-react-dropdowns";
import GeneralCaseInfoEdit from "./GeneralCaseInfoEdit";
import DispositionInfoEdit from "./DispositionInfoEdit";
import MatterTypeInfoEdit from "./MatterTypeInfoEdit";
import OtherComponentsEdit from "./OtherComponentsEdit";

const { REACT_APP_DATE_FORMAT, REACT_APP_BASE_URL } = process.env;


function CaseInfoEditOverView(props: any) {
  const { rowData, AllegedLiabilityDefectdataFromApi, OutcomedispositiondataFromApi, CausesofActionClaimdataFromApi, outcomedispositionspecificdataFromApi } = props

  var mulObj: MultiSelectComponent;
  let navigate = useNavigate();

  let toastObj: any;
  let position: PositionDataModel = { X: "Right" };


  function showBtnClick() {
    toastObj.show({
      title: "Success!",
      content: "Case info updated successfully.",
      cssClass: "e-toast-success",
      icon: "e-success toast-icons",
    });
  }


  return (
    <div>
      <ToastComponent
        ref={(toast) => {
          toastObj = toast;
        }}
        id="toast_default"
        position={position}
      //created={create}

      ></ToastComponent>


      <GeneralCaseInfoEdit
        rowData={rowData}
        AllegedLiabilityDefectdataFromApi={AllegedLiabilityDefectdataFromApi}
        CausesofActionClaimdataFromApi={CausesofActionClaimdataFromApi}
      />
   
    </div>
  );
}

export default memo(CaseInfoEditOverView)