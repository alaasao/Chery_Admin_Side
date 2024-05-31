import React from "react";
import { FC } from "react";

import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import DelButt from "../../../utils/DelButt";
interface EventCardProps {
  Title: string;
  Description: string;
  Event_Date: Date;
  id: string;
}
const EventCard: FC<EventCardProps> = ({ Title, Event_Date,id }) => {


 return (
    <div
      className={`w-full h-[83px]  grid grid-cols-10 items-center text-2xl font-semibold `}
    >
      <Link to={`/events/${id}`} className="col-span-3 truncate max-md:col-span-4 pl-[10px]">
        {Title}
      </Link>
      <div className="col-span-3 truncate max-md:hidden">      {new Date( Event_Date).toISOString().slice(0, 10)}</div>
      <div className="flex justify-center col-span-3 truncate max-md:col-span-4 ">
        <Link
          to={`/clients/`}
          className="text-white bg-[#494545] rounded-full  w-[214px] h-[46px] max-md:w-[100px] max-md:text-[16px] max-md:mx-auto flex justify-center items-center"
        >
          Informations
        </Link>
      </div>
      <div className="flex gap-[5px] md:gap-[15px] ">
      <Link to={`/events/editevent/${id}`}>  <LuPencil className="text-[#494545] cursor-pointer"   /></Link>
      <DelButt id={id || ""} deleteRoute="event" icon={true} back="/events" name="question" />
   
      </div>
    </div>
  );
};

export default EventCard;
