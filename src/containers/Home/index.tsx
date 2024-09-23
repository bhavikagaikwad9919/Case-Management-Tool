import { useState, useEffect } from "react";
import TopHeader from "../../Component/TopHeader";
import TabLayout from "./TabLayout";
import TabLayout1 from "../MasterLookup"
import TabLayout2 from "./TabLayout2"
import Cases from "../../Component/Cases";
import Jurisdiction from "../../Component/Jurisdiction";
import { useNavigate } from "react-router-dom";
import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
import HomePage from "../../Component/HomePage";

function Home() {


  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTab, setshowTab] = useState("");
  const [subMenu1Open, setSubMenu1Open] = useState(false);
  const [token, settoken] = useState('')
  const [tab, setTab] = useState("");


  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();


  const getSilentToken = () => {
    instance.acquireTokenSilent({
      account: accounts[0],
      scopes: ["api://76f54efd-270c-4430-97e8-c47a82d7cf18/AccessAPI", "User.Read","Group.Read.All"]
    }).then(response => {
      settoken(response.accessToken)
    }).catch(error => {
    })
  }

  useEffect(() => {
    if (isAuthenticated && inProgress === InteractionStatus.None) {
      getSilentToken()
    }
  }, [inProgress, isAuthenticated, accounts, instance]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const ChangeTab = (val: any) => {
    setTab(val);
    setshowTab(val);
  };
  const toggleSubMenu1 = () => {
    setSubMenu1Open(!subMenu1Open);
  };
  return (
    <>
      <div className="bg-[#EDEDED] ">
        {token && <HomePage token={token} />}
      </div>
    </>
  );
}

export default Home;
