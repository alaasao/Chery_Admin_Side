
import React, { FC } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
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
      <Link
        to={`/clients/${id}`} className="">{Name}</Link>
      <div className="max-md:hidden">{Email}</div>
      <Link
        to={`/clients/${id}`}
        className="text-white bg-[#494545] rounded-full w-[214px] h-[46px] flex justify-center items-center"
      >
        Informations
      </Link>
      <IoTrashOutline className="text-[#D12621]" />
    </div>
  );
};

export default UserCard;
