import { FC } from "react";

import { IoTrashOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";
import React from "react";

interface UserCardProps {
  Name: string;
  Email: string;
  searchKey: string;
  id: string;
}
const UserCard: FC<UserCardProps> = ({
  Name,
  Email,

  id,
}: UserCardProps) => {
  return (
    <div
      className={`w-full h-[83px] flex items-center text-2xl font-semibold justify-around `}
    >
      <Link to={`/clients/${id}`} className="">
        {Name}
      </Link>
      <div className="max-md:hidden">{Email}</div>
      <Link
        to={`/clients/${id}`}
        className="text-white bg-[#494545] rounded-full w-[214px] h-[46px] flex justify-center items-center"
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

export default UserCard;
