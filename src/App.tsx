
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from "./authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import axios from 'axios';
import Login from './Component/Login';
import { setToken } from './features/users/usersSlice';
import { Client } from '@microsoft/microsoft-graph-client';
import Navigator from './navigator';
import accountBasedAuth from './helpers/accountBasedAuth';
import { setUserType } from './features/users/usersSlice';
import './App.css'
import Footer from './Component/Footer';

function App() {

  const { REACT_APP_SCOPES } = process.env;

  const dispatch = useDispatch()
  // @ts-ignore
  let scopes = JSON.parse(REACT_APP_SCOPES)
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const getSilentToken = () => {
    instance.acquireTokenSilent({
      account: accounts[0],
      scopes: scopes
    }).then((response: any) => {
      localStorage.setItem("user", JSON.stringify(response));
      dispatch(setUserType(accountBasedAuth(response.idTokenClaims.groups)))
      dispatch(setToken(response?.accessToken))
      axios.defaults.headers.common['Authorization'] = `Bearer ${response?.accessToken}`


      // const client = Client.init({
      //   authProvider: (done) => {
      //     done(null, response.accessToken);
      //   }})
      // client.api('/groups').get().then(result => {
      // }).catch(error => console.log(error,"error"))

    }).catch(error => {
      localStorage.removeItem("user");
      let request: any = loginRequest
      request.loginHint = accounts[0]?.username
      if (error instanceof InteractionRequiredAuthError) {
        return instance.acquireTokenRedirect(request)
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated && inProgress === InteractionStatus.None) {
      getSilentToken()
    }
  }, [inProgress, isAuthenticated, accounts, instance]);
  return (
    <>
      <AuthenticatedTemplate>
        <Navigator />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
     
    </>
  )
};
export default App;