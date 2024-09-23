import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router';
import * as React from 'react';

function SideNav() {

  const [showButton, setShowButton] = useState(true)
  const location = useLocation()
  const userType = useSelector((state: any) => state.users.userType)

  let sidebarObj: any;
  let listObj;
  // let width = '20%';
  let type: any = 'Over';

  function onCreate() {
    sidebarObj.element.style.visibility = '';
  }
  // Toggle(Open/Close) the Sidebar
  function toggleClick() {
    sidebarObj.toggle();
  }
  // Close the Sidebar
  function closeClick() {
    sidebarObj.hide();
  }
  return (
    <div className="control-section">
      {/* Initializing the Sidebar component */}

      <SidebarComponent id="default-sidebar" className='bg-[#000000]'
        ref={Sidebar => sidebarObj = Sidebar}
        // width={width} 
        // style={{ top: '5.8rem', visibility: "hidden"}}
        created={onCreate} type={type}>
        {/* <div id='closebtn'>
                    <ButtonComponent cssClass='e-normal' iconCss='e-icons e-add-icon' onClick={toggleClick}/>
                </div> */}

        <div className="text-gray-300 p-4 space-y-2 font-normal text-sm"
          style={{ display: 'flex', flexDirection: 'column' }}>



          <a
            href='/cases'
            className="flex items-center border-b border-[#141414] text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
          >
            <i className="bi bi-briefcase mr-2"></i>
            <span className="ml-2 ">Cases</span>
          </a>

          <a
            href='/Courts'
            className="flex items-center  text-white h-10 px-3 hover:bg-[#323232] hover:text-white border-b border-[#141414] rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
          >
            <i className="bi bi-briefcase mr-2"></i>
            <span className="ml-2">Court</span>
          </a>

          {userType === "admin" && <a
            href='/Action_opt_out'
            className="flex items-center relative text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg  transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
          >
            <i className="bi bi-briefcase mr-2"></i>
            <span className="ml-2  mr-6">
              Class Action Opt-out
            </span>
          </a>}

          <a
            href='/PlaintiffCounsel'
            className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"
          >
            <i className="bi bi-briefcase mr-2"></i>
            <span className="ml-2">
              Counsel Info
            </span>
          </a>

          {userType === "admin" &&
            <a
              href='/Master_Lookups'
              className="flex items-center relative text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg  transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <i className="bi bi-briefcase mr-2"></i>
              <span className="ml-2  mr-6">
                Master Lookups
              </span>
            </a>
          }

          {/* <a
              href='/HomePage'
              className="flex items-center relative text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg  transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <i className="bi bi-briefcase mr-2"></i>
              <span className="ml-2  mr-6">
                Home
              </span>
            </a> */}

          {/* {userType === "admin" &&
            <a
              href='/Party_Status_lookup'
              className="flex items-center relative text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg  transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <i className="bi bi-briefcase mr-2"></i>
              <span className="ml-2  mr-6">
                Party Status lookup
              </span>
            </a>}  */}

        </div>
      </SidebarComponent>

      <header className="h-19 flex items-center px-6 bg-white">
        {!location.pathname.includes('/casedetails') ? <button
          className="p-2 -ml-2 mr-2 {isCollapsed ? 'buttonMargin' : '' "
          onClick={toggleClick}
        >
          <svg
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-7 w-7 transform"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="6" x2="14" y2="6" />
            <line x1="4" y1="18" x2="14" y2="18" />
            <path d="M4 12h17l-3 -3m0 6l3 -3" />
          </svg>
        </button> : <></>}
        <span className="font-medium"></span>
      </header>
      {/* <div>
            <div className="center-align">
                
                <ButtonComponent onClick={toggleClick} id="toggle" className="e-btn e-info">---</ButtonComponent>
            </div>
        </div> */}
    </div>);
}

export default SideNav;