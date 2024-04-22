import React from "react";
import { FC } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
interface EventCardProps {
  Title: string;
  Description: string;
  Date: Date;
}
const EventCard: FC<EventCardProps> = ({ Title, Description, Date }) => {
  const formattedDate = Date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log("event card", Title, Description);
  return (
    <div
      className={`w-full h-[83px] flex items-center text-2xl font-semibold justify-around `}
    >
      <Link to={`/events/${Title}`} className="">
        {Title}
      </Link>
      <div className="max-md:hidden">{formattedDate}</div>
      <Link
        to={`/events/${Title}`}
        className="text-white bg-[#494545] rounded-full w-[214px] h-[46px] flex justify-center items-center max-sm:text-xl max-sm:w-auto max-sm:px-[10px]"
      >
        Informations
      </Link>
      <div className="flex gap-[5px] md:gap-[15px] ">
        <LuPencil className="text-[#494545]" />
        <IoTrashOutline className="text-[#D12621]" />
      </div>
    </div>
  );
};

export default EventCard;
