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
      className={`w-full h-[83px]  grid grid-cols-10 items-center text-2xl font-semibold `}
    >
      <Link to={`/events/${Title}`} className="col-span-3 truncate max-md:col-span-4 pl-[10px]">
        {Title}
      </Link>
      <div className="col-span-3 truncate max-md:hidden">{formattedDate}</div>
      <div className="flex justify-center col-span-3 truncate max-md:col-span-4 ">
        <Link
          to={`/clients/`}
          className="text-white bg-[#494545] rounded-full  w-[214px] h-[46px] max-md:w-[100px] max-md:text-[16px] max-md:mx-auto flex justify-center items-center"
        >
          Informations
        </Link>
      </div>
      <div className="flex gap-[5px] md:gap-[15px] ">
        <LuPencil className="text-[#494545]" />
        <IoTrashOutline className="text-[#D12621]" />
      </div>
    </div>
  );
};

export default EventCard;
