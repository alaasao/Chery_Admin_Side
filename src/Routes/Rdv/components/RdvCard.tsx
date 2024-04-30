import React, { FC } from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';
import { Link } from 'react-router-dom';
interface RdvCardProps { 
    id: string;
    Name: string;
    Adresse: string;
    Phone: string;
    Email: string;
    Date_Choisie: Date;
    Model: string;
    Etat: string;
    Reponse: string;
    
}
const RdvCard: FC<RdvCardProps> = (
    { id, Name, Phone,Date_Choisie }: RdvCardProps
) => {
  return (
    <div
      className={`w-full h-[83px]  items-center text-2xl font-semibold  grid grid-cols-10 gap-[10px] `}
    >
      <div className="col-span-3 truncate max-md:col-span-4" >
        {" "}
        <Link
          to={`/clients/${id}`}
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
        <Link
          to={`/clients/${id}`}
          className="  rounded-full  max-md:w-[100px] max-md:text-[16px] max-md:mx-auto flex justify-center items-center"
        >
          {Date_Choisie.getTimezoneOffset()}
        </Link>
      </div>

      <div className="flex gap-[5px] md:gap-[15px] ">
        <LuPencil className="text-[#494545]" />
        <IoTrashOutline className="text-[#D12621]" />
      </div>
    </div>
  )
}

export default RdvCard
