import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router';
import "../App.css";


function TopNavBar() {
    const userType = useSelector((state: any) => state.users.userType)


    return (
     <></>
    );
}

export default TopNavBar