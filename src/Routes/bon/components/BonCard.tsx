import React, { FC } from 'react'
import { LuPencil } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import DelButt from '../../../utils/DelButt';

interface BonCardProps {
    id: string;
    Name: string;
    object: string;
}
const BonCard: FC<BonCardProps> = ({ id, Name, object }) => {
    console.log(id, Name, object+"dddddddd")
    return (
        <div
          className={`w-full h-[83px]  items-center text-2xl font-semibold  grid grid-cols-10 gap-[10px] `}
        >
          <div className="col-span-3 truncate max-md:col-span-4" >
            {" "}
            <Link
              to={`/bon/${id}`}
              className=" pl-[20px]    "
            >
              {Name}
            </Link>
          </div>
          <div className="col-span-3 truncate max-md:hidden">
            {" "}
            <div className="truncate max-md:hidden ">{object}</div>
          </div>
          <div className="flex justify-center col-span-3 truncate max-md:col-span-4 ">
            <Link
              to={`/bon/${id}`}
              className="text-white bg-[#494545] rounded-full  w-[214px] h-[46px] max-md:w-[100px] max-md:text-[16px] max-md:mx-auto flex justify-center items-center"
            >
              Informations
            </Link>
          </div>
          <div className="flex gap-[5px] md:gap-[15px] ">
          <Link to={`/bon/editbon/${id}`}>  <LuPencil className="text-[#494545] cursor-pointer"   /></Link>
          <DelButt id={id || ""} deleteRoute="bon" icon={true} back="/bon" name="bon" />
       
          </div>
        </div>
      );
}

export default BonCard
