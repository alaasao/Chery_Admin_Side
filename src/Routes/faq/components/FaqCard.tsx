import { FC } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import React from "react";

const FaqCard: FC<FaqCardProps> = ({ id, question }: FaqCardProps) => {
  return (
    <div
      className={`w-ful h-max min-h-[56px]  flex items-center text-2xl font-semibold justify-between px-[4%] `}
    >
      <Link to={`/faq/${id}`} className="h-min ">
        {question}
      </Link>

      <div className="flex gap-[5px] md:gap-[15px] ">
        <LuPencil className="text-[#494545]" />
        <IoTrashOutline className="text-[#D12621]" />
      </div>
    </div>
  );
};

export default FaqCard;
interface FaqCardProps {
  id: string;
  question: string;
}
