import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from "../containers/Home"
import CaseDetails from '../containers/EditDetailPage/CaseDetails';
import CaseAdd from '../containers/AddDetailsPage/CaseAdd';
import '../App.css'
import '../tailwind.min.css'
import HomeLawFirm from "../containers/Home/TabLayout"
import MasterLookup from "../containers/MasterLookup"
import Court from "../containers/Court";
import MasterLookupAuto from '../containers/Genderlookup';
import ActionOptOut from "../containers/ActionOptOut";
import CaseInformation from "../containers/CaseInformation"
import Cases from '../Component/Cases';
import Genderlookup from '../containers/Genderlookup';
import PartyStatuslookup from '../containers/PartyStatuslookup';
import InjuredPartyEdit from '../Component/InjuredPartyEdit';
import InjuredPartyAdd from '../Component/InjuredPartyAdd';
import HomePage from '../Component/HomePage';
import PlaintiffInformation from '../Component/PlaintiffInformation'
import PlaintiffCounsel from '../Component/CounselInfo';
import Grid from '../Component/TableMaster';
import TableMaster from '../Component/TableMaster';
import CounselInfo from '../Component/CounselInfo';

export default function Navigator() {

  return (

    <Routes>
      <Route
        path={"/"}
        element={<HomePage />}
      />
      <Route
        path={"/casedetails/:id"}
        element={<CaseDetails />}
      />
      <Route
        path={"/casedetails"}
        element={<CaseAdd />}
      />
      <Route
        path={"/Master_Lookups"}
        element={<MasterLookup />}
      />
      <Route
        path={"/Action_opt_out"}
        element={<ActionOptOut />}
      />
      <Route
        path={"/Gender_lookup"}
        element={<Genderlookup />}
      />
      <Route
        path={"/Party_Status_lookup"}
        element={<PartyStatuslookup />}
      />
      <Route
        path={"/Cases"}
        element={<CaseInformation />}
      />
      <Route
        path={"/Courts"}
        element={<Court />}
      />
      <Route
        path={"/Attorneys"}
        element={<Home />}
      />
      <Route
        path={"/injuredpartydetails/:id"}
        element={<InjuredPartyEdit />}
      />
      <Route
        path={"/injuredpartydetails"}
        element={<InjuredPartyAdd />}
      />
      <Route
        path={"/PlaintiffInformation"}
        element={<PlaintiffInformation />}
      />
      <Route
        path={"/HomePage"}
        element={<Home />}
      />
      <Route
        path={"/CounselInfo"}
        element={<CounselInfo />}
      />
       {/* <Route
        path={"/TableMaster"}
        element={<TableMaster />}
      /> */}

    </Routes>

  )
}