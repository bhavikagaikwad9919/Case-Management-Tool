import React, { memo } from "react";
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";
import {
  CheckBoxSelection,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import "../App.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useNavigate } from "react-router-dom";
import { PositionDataModel } from "@syncfusion/ej2-popups";
import { MultiSelectComponent, Inject } from "@syncfusion/ej2-react-dropdowns";
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import {
  ToastComponent,
  ToastCloseArgs,
} from "@syncfusion/ej2-react-notifications";
import GeneralCaseInfoAdd from "./GeneralCaseInfoAdd";
import DispositionInfoAdd from "./DispositionInfoAdd";
import MatterTypeInfoAdd from "./MatterTypeInfoAdd";
import OtherComponentsAdd from "./OtherComponentsAdd";

const { REACT_APP_BASE_URL } = process.env;

function CaseInfoAddOverView(props: any) {
  const {
    handleSaveCasedetails,
    AllegedLiabilityDefectdataFromApi,
    CausesofActionClaimdataFromApi,
  } = props;

  let navigate = useNavigate();
  let mulObj: MultiSelectComponent;
  const user: any = localStorage.getItem("user");


  const getItemChanged = async () => {
    const data: any = await localStorage.getItem("localStateAdd");
    const genInfoData: any = await localStorage.getItem("localStateGeneralContent");
    const disInfoData: any = await localStorage.getItem("localStateDispositionContent");
    const SettlTDataInfo: any = await localStorage.getItem("localStateSettlementTrackingAdd");
    
    const top = await JSON.parse(data);
    const SettlTData = await JSON.parse(SettlTDataInfo)
    const gendata = await JSON.parse(genInfoData);
    const dispos = await JSON.parse(disInfoData)
    const result = { ...top, ...gendata, ...dispos, ...SettlTData }
    return result;
  };

  let toastObj: any;
  let position: PositionDataModel = { X: "Right" };

  function showBtnClick() {
    toastObj.show({
      title: "Success!",
      content: "Case info added successfully.",
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


      <GeneralCaseInfoAdd
        AllegedLiabilityDefectdataFromApi={AllegedLiabilityDefectdataFromApi}
        CausesofActionClaimdataFromApi={CausesofActionClaimdataFromApi}
      />

      <div className="pb-40 p-2">
        <div className="flex justify-end">
          <div className="m-2">
            <ButtonComponent
              onClick={async (e: any) => {
                e.preventDefault();
                const data = await getItemChanged();
                handleSaveCasedetails(data, showBtnClick, navigate);
              }}
              className="e-custom"
            >
              Save
            </ButtonComponent>
          </div>
          <div
            onClick={(e: any) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="m-2"
          >
            <ButtonComponent className="e-custom">Cancel</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CaseInfoAddOverView);
