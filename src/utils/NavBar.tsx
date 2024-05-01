import React from "react";

import { FaRegBell, FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="w-full h-[103px] flex justify-between items-center px-[37px] shadow-lg max-lg:pl-[50px] ">
      <div className="text-4xl font-good text-[#D12621] max-sm:text-xl"></div>
      <div className="flex gap-[15px] items-center text-2xl text-black">
        <FaRegBell />
        <FaRegUser />
      </div>
    </div>
  );
};

export default NavBar;
