import  { FC } from "react";
import React from 'react';

import { FaRegBell, FaRegUser } from "react-icons/fa";
interface TitleProps {
  title: string;
}
const Title: FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <div className="w-full h-[103px] flex justify-between items-center px-[37px] shadow-lg max-lg:pl-[50px]">
      <div className="text-4xl good text-[#D12621] max-sm:text-xl">{title}</div>
      <div className="flex gap-[15px] items-center text-2xl text-black">
        <FaRegBell />
        <FaRegUser />
      </div>
    </div>
  );
};

export default Title;
