import React, { FC } from "react";
import { Link } from "react-router-dom";
interface EditButtProps {
  editRoute: string;
  id: string;
}
const EditButt: FC<EditButtProps> = ({ editRoute, id }) => {
  return (
    <Link
      to={editRoute + "/" + id}
      className="bg-[#494545] text-white w-[140px] h-[50px] rounded-lg flex justify-center items-center font-bold"
    >
      <span>Edit</span>
    </Link>
  );
};

export default EditButt;
