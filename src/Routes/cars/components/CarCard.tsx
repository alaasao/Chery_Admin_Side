import { FC } from "react";
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
      className={`w-full h-[83px] flex items-center text-2xl font-semibold justify-around `}
    >
      <Link to={`/clients/${_id}`} className="">
        {Modele}
      </Link>
      <div className="max-sm:hidden">
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
      <Link
        to={`/produits/cars/${_id}`}
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

export default CarCard;
