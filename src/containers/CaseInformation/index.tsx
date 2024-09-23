import { useState, useEffect } from "react";
import Cases from "../../Component/Cases";
import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';



function Index() {
  const { REACT_APP_SCOPES } = process.env;
  const [token, settoken] = useState('')
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  // @ts-ignore
  let scopes = JSON.parse(REACT_APP_SCOPES)

  const getSilentToken = () => {
    instance.acquireTokenSilent({
      account: accounts[0],
      scopes: scopes
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


  return (
    <>
      <div className="bg-[#EDEDED] ">
        {token && <Cases token={token} />}
      </div>
    </>
  );
}

export default Index;
