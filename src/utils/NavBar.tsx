
import React from "react";


import { useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;
let path=pathname.split("/")
console.log(path)
  return (
    <div className="w-full h-[103px] flex justify-between items-center px-[37px] shadow-lg max-lg:pl-[50px] ">
      <div className="text-4xl font-good text-[#D12621] max-sm:text-xl uppercase ">

        {path[1].toLowerCase().includes("produits")?path[2]:path[1]}
      </div>
      <div className="flex gap-[15px] items-center text-2xl cursor-pointer border bg-red-600 px-4 py-2 rounded-xl text-white" onClick={()=>{
        localStorage.removeItem("token")
        window.location.href = "/";
      }}>
LOGOUT
      </div>
    </div>
  );
};

export default NavBar;
