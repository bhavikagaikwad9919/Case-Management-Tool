import { Fragment,useEffect,useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import "../App.css";
const { REACT_APP_BASE_URL,REACT_APP_DATE_FORMAT } = process.env;



function HomePage(props: any) {

  const user: any = localStorage.getItem('user')
  const token = JSON.parse(user)?.accessToken
  const [userName, setUserName] = useState<any>()
  const { instance,accounts } = useMsal();


  useEffect(() => {
    if(accounts && accounts[0]){
      setUserName(accounts[0])
    }
  }, [accounts])

  return (
    <div className="bg-[#EDEDED] ">
    <div className="bg-white py-3 px-3 drop-shadow-xl">
      <h1 className='ml-3 text-lg'>Home</h1>
    </div>
    <h2 className="text-2xl pt-20 font-bold text-center">
    Welcome
    <span className="text-2xl font-bold ">
      {" "}
     { userName?.name ?? 'Guest User'}
    </span>
  </h2>
  </div>
  );
}

export default HomePage;
