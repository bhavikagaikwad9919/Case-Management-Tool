import React, { useState } from 'react'
import Cases from './Cases';

export default function SideNav() {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const datatype = localStorage.getItem("groups")
  // console.log("groups",localStorage.getItem("groups"))

  return (
    <>
      <div className='flex bg-[#EDEDED] '>
        {isCollapsed && <aside className="flex flex-col text-gray-300 bg-[#1c1c1c] transition-all duration-350 ease-in-out">
          <nav className="p-4 space-y-2 font-normal text-sm">
            <a
              href='/cases'
              className="flex items-center border-b border-[#141414] text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <i className="bi bi-briefcase mr-2"></i>
              <span className="ml-2 duration-300 ease-in-out">Cases</span>
            </a>

            <a
              href='/Courts'
              className="flex items-center  text-white h-10 px-3 hover:bg-[#323232] hover:text-white border-b border-[#141414] rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <i className="bi bi-briefcase mr-2"></i>
              <span className="ml-2 duration-300 ease-in-out">Court</span>
            </a>

            {datatype == "61c7f052-b544-44bd-b502-b4697d760051" &&
              <a
                href='/Master_Lookups'
                className="flex items-center relative text-white h-10 px-3 hover:bg-[#323232] hover:text-white rounded-lg  transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
              >
                <i className="bi bi-briefcase mr-2"></i>
                <span className="ml-2 duration-300 mr-6 ease-in-out">
                  Master Lookups
                </span>
              </a>
            }


          </nav>

          <div className="border-t border-gray-700 p-4 font-medium mt-auto">
            <a
              href="#"
              className="flex items-center h-10 px-3 hover:text-gray-100 hover:bg-gray-600 hover:bg-opacity-25 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 flex-shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-2 duration-300 ease-in-out">Settings</span>
            </a>
          </div>

        </aside>}

        <div style={{ width: '70%' }} className="flex-1 flex flex-col">
          <header className="h-20 flex items-center px-6 bg-white">
            <button className="p-2 -ml-2 mr-2" onClick={handleToggle}>
              <svg
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6 transform"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="14" y2="6" />
                <line x1="4" y1="18" x2="14" y2="18" />
                <path d="M4 12h17l-3 -3m0 6l3 -3" />
              </svg>
            </button>
            <span className="font-medium"></span>
          </header>
        </div>

      </div>
    </>
  )
}

