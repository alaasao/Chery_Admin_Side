import { FC } from "react";

import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import React from "react";

const FaqCard: FC<FaqCardProps> = ({ id, question }: FaqCardProps) => {
  console.log(id);  
  return (
    <div
      className={`w-ful h-max min-h-[56px]  flex items-center text-2xl font-semibold justify-between px-[4%] `}
    >
      <Link to={`/faq/${id}`} className="h-min ">
        {question}
      </Link>

      <div className="flex gap-[5px] md:gap-[15px] ">
      <Link to={`/faq/editfaq/${id}`}>  <LuPencil className="text-[#494545] cursor-pointer"   /></Link>

      </div>
    </div>
  );
};

export default FaqCard;
interface FaqCardProps {
  id: string;
  question: string;
}
