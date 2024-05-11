import { FC } from "react";
import React from "react";

import { IoClose, IoTrashOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
interface CarCardProps {
  _id: string;
  Modele: string;
  Disponabilite: string;
}
const CarCard: FC<CarCardProps> = ({
  _id,
  Modele,
  Disponabilite,
}: CarCardProps) => {
  return (
    <div
      className={`w-full h-[83px] grid grid-cols-10 text-2xl font-semibold items-center `}
    >
      <div className="col-span-3 truncate max-sm:col-span-4" >
        <Link to={`/produits/cars/${_id}`} className="pl-[10px] ">
   {Modele}
      </Link></div>
      <div className="flex items-center col-span-3 max-sm:hidden">
        {Disponabilite ? (
          <div className="text-[#39A63D] flex items-center gap-[20px] max-md:gap-[5px] ">
            <div className="rounded-full flex w-[30px] h-[30px] max-md:w-[15px] max-md:h-[15px] justify-center items-center border-2 border-[#39A63D] ">
              <MdDone className="text-[20px] max-md:text-[10px]" />
            </div>
            <span className=" max-md:text-[14px] ">Disponible</span>
          </div>
        ) : (
          <div className="text-[#DB2719] flex items-center gap-[20px] max-md:gap-[5px]">
            <div className="rounded-full flex w-[30px] h-[30px]  max-md:w-[15px] max-md:h-[15px] justify-center items-center border-2 border-[#DB2719] ">
              <IoClose className="text-[20px] max-md:text-[10px]" />
            </div>
            <span className=" max-md:text-[14px]">InDisponible</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center col-span-3 max-sm:col-span-4">
      <Link
        to={`/produits/ cars/${_id}`}
        className="text-white  bg-[#494545] rounded-full w-[214px] h-[46px] flex justify-center items-center max-sm:text-xl max-sm:w-auto max-sm:px-[10px]"
      >
        Informations
      </Link></div>
      <div className="flex gap-[5px] md:gap-[15px] col-span-1 max-sm:col-span-2 items-center ">
      <Link to={`/produits/editcar/${_id}`}> <LuPencil className="text-[#494545]"  /></Link> 
        <IoTrashOutline className="text-[#D12621]" />
      </div>
    </div>
  );
};

export default CarCard;
