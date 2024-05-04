import React, { FC } from 'react'

import { Link } from 'react-router-dom';
import { Rdv_Type } from '../Rdv';
interface RdvCardProps { 
   _id: string;
    Name: string;

    Phone: string;

    Date_Choisie: Date;

  Etat: string;

    
}
const RdvCard: FC<RdvCardProps> = (
  { _id, Name, Phone, Date_Choisie, Etat,
   
     }: RdvCardProps
) => {
  console.log(Name)
  return (
    <div
      className={`w-full h-[83px]  items-center text-2xl font-semibold  grid grid-cols-10 gap-[10px] `}
    >
      <div className="col-span-3 truncate max-md:col-span-4" >
        {" "}
        <Link
          to={`/rdv/${_id}`}
          className=" pl-[20px]    "
        >
          {Name}
        </Link>
      </div>
      <div className="col-span-3 truncate max-md:hidden">
        {" "}
        <div className="truncate max-md:hidden ">{Phone}</div>
      </div>
      <div className="flex justify-center col-span-3 truncate max-md:col-span-4 ">
        <div
  
          className="  max-md:w-[100px]  max-md:mx-auto flex justify-center items-center"
        >
          {Date_Choisie.toString().split("T")[0]}
        </div>
      </div>

      <div className="flex gap-[5px] md:gap-[15px] ">
        {Etat === "EN_ATTENTE" ? (
       <img src='../../assets/rdv/onHold.png'/> 
        ) : Etat === "CONFIRMER" ? (
        <img src="../../assets/rdv/done.png" alt="" />
          ) : (
              <img src="../../assets/rdv/canceled.png" alt="" />
        )
      }
      </div>
    </div>
  )
}

export default RdvCard
