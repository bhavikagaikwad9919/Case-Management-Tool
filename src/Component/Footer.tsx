import { Http2ServerRequest } from "http2"



export const Footer = () => {

return (
<div className="bg-[#000000] py-7 drop-shadow-xl" >
<div className="w-full flex flex-wrap px-30 text-center m-auto">

<div className="lg:w-1/3">
<div className="text-small text-white pl-3 mt-3">

<span className="inline-block mr-3">&#169; Law Firm</span>
<span className="inline-block"> L.L.P., All rights reserved</span>

</div>

</div>

<div className="md:w-1/4">
<div className="flex items-center justify-between flex-wrap ">
<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center self-auto">
<img className="w-12 m-auto" src={require("../assets/copyright-law-day.avif")} />
</div>
</div>
</div>

<div className="lg:w-1/3">
<div className="text-small text-white mt-3">
<a className="inline-block mr-2 ml-2 text-white">
ABOUT
</a> |
<a className="inline-block mr-2 ml-2 text-white">
CONTACT
</a> |
<a className="inline-block mr- ml-2 text-white">
DISCLAIMER
</a> |
<a className="inline-block mr-2 ml-2 text-white">
PRIVACY
</a>
</div>
</div>

</div>
</div>

)
}



export default Footer
