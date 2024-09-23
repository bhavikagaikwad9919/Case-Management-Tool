import links from "./links";
import axios from "axios";
import ObjectHelper from "./ObjectHelper";


const getLocation = (location : string) => {
  return links + location;
};


async function status(response : any) {

  if (response.status >= 200 && response.status < 300) {
    // alert('Working fine ')
  }
  if (response.status >= 401 && response.status <= 403) {
   
  }
  if (response.status == 400 || (response.status >= 404 && response.status < 500)) {

  }
  if (response.status >= 500) {
    // alert(`Server error, we are working on it please wait for sometime\nError code : ${response?.status} `)
  }
}

export const doPost = async (thunk :  any, location : string, query : any, body : any, token : any) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  const config : any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }

  const response : any = await axios.post(url, config);

  status(response)
  console.log(response, url, body,".............")
  return await response.json();
};


export const doGet = async (thunk :  any, location : string, query : any, token : string) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config : any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const response : any = await axios.get(url, config);
  status(response)
  return await response;
};