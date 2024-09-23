import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import "../App.css";
import { useSelector } from 'react-redux'


function TopHeader() {
  const userType = useSelector((state: any) => state.users.userType)

  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<any>()
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (accounts && accounts[0]) {
      setUser(accounts[0])
    }
  }, [accounts])

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  }


  return (
    <>
      <div className="bg-[#000000] py-3 drop-shadow-xl topheader">
        <div className="container-fluid  mx-auto">

          <div className="grid grid-cols-12 gap-2">
            <div className="">
              <img className="w-16 ml-3" src={require("../assets/logo.png")} />
            </div>

            <div className="col-span-8 text-center">
              <h1 className="text-3xl text-[#f28b00] font-bold mb-4 text-center">
                Case Management Portal
              </h1>
              <nav className="flex items-center justify-between text-center">
                <div className="block lg:hidden">
                  <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                  </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                  <div className="text-sm lg:flex-grow">
                    <a
                      href='/'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"          >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2 ">Home</span>
                    </a>
                    <a
                      href='/cases'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"          >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2 ">Cases</span>
                    </a>

                    <a
                      href='/Courts'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"          >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2">Court</span>
                    </a>
                    <a
                      href='/CounselInfo'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"
                    >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2">
                      Counsel Info
                      </span>
                    </a>

                    {/* <a
                      href='/TableMaster'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"          >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2">Grid</span>
                    </a> */}
                    
                    {userType === "admin" && <a
                      href='/Action_opt_out'
                      className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"          >
                      <i className="bi bi-briefcase mr-2"></i>
                      <span className="ml-2">
                        Class Action Opt-out
                      </span>
                    </a>}
                  

                    {userType === "admin" &&
                      <a
                        href='/Master_Lookups'
                        className="bg-black inline-block text-white border-b border-black  hover:border-white mr-4 ml-4"            >
                        <i className="bi bi-briefcase mr-2"></i>
                        <span className="ml-2">
                          Master Lookups
                        </span>
                      </a>
                    }
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-span-3 text-right">

              <img className="w-14 mt-2 mr-3 inline-block" src={require("../assets/copyright-law-day.avif")} />

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex text-md text-white mr-3 pt-3">
                    <h2 className="text-md text-white mr-3 py-2 font-bold leading-3 text-right">
                      Welcome
                      <span className="text-sm text-white font-normal  ml-3 pt-1 block">
                        {" "}
                        {user?.name ?? 'Guest User'}
                      </span>
                    </h2>

                    <img
                      className="w-12 h-12 rounded-full drop-shadow-lg"
                      src={require("../assets/profilePic.jpg")}
                    />

                    {/* <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" aria-hidden="true" /> */}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {isAuthenticated ?
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-blcak text-[#f78a3c]"
                                : "text-gray-600",
                              "block px-4 py-2 text-sm font-normal border-b border-[#fbe1d9]"
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item> */}
                        <div onClick={() => handleLogout()}>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-blcak text-[#f78a3c]"
                                    : "text-gray-600",
                                  "block px-4 py-2 text-sm font-normal"
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items> :
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div onClick={() => {
                        handleLogin()
                      }} className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-blcak text-[#f78a3c]"
                                  : "text-gray-600",
                                "block px-4 py-2 text-sm font-normal"
                              )}
                            >
                              Login
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  }
                </Transition>
              </Menu>
            </div>
          </div>

          {/* <div className="w-full flex flex-wrap">
            <div className="md:w-1/2 lg:w-1/5">
            </div>
            <div className="lg:w-1/2">
             

            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <div className="flex justify-end">
                
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default TopHeader