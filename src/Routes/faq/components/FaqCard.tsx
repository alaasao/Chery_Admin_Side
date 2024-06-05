import { FC } from "react";

import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import React from "react";
import DelButt from "../../../utils/DelButt";

const FaqCard: FC<FaqCardProps> = ({ id, question }: FaqCardProps) => {
  console.log(id);  
  return (
    <div
      className={`w-ful h-max min-h-[56px]   items-center text-2xl font-semibold justify-between px-[4%] grid grid-cols-10`}
    >
      <Link to={`/faq/${id}`} className="col-span-8 overflow-hidden truncate h-min">
        {question}
      </Link>

      <div className="flex gap-[5px] md:gap-[15px] col-span-2 justify-end ">
      <Link to={`/faq/editfaq/${id}`}>  <LuPencil className="text-[#494545] cursor-pointer"   /></Link>
      <DelButt id={id || ""} deleteRoute="faq" icon={true} back="/faq" name="question" />
   
      </div>
    </div>
  );
};

export default FaqCard;
interface FaqCardProps {
  id: string;
  question: string;
}
