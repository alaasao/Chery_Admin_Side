import axios from "axios";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import Del from "./Del";

interface DelButtProps {
  deleteRoute: string;
  id: string;
  name: string;
  icon: boolean;
  back: string;
}
const DelButt: FC<DelButtProps> = ({
  deleteRoute,
  name,
  icon,
  id,
  back,
}: DelButtProps) => {
  const [show, setShow] = React.useState(false);
  function deleteObj() {
    console.log("deleteObj");
    console.log(import.meta.env.VITE_Main_ENDPOINT + deleteRoute + "/" + id);
    axios
      .delete(import.meta.env.VITE_Main_ENDPOINT + deleteRoute + "/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success(name + "deleted");
        setTimeout(() => {
          window.location.href = back;
        }, 1000);
      
      });
  }
  return (
    <div className="">

      {show && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-screen h-full backdrop-blur-md">
          <div className="flex flex-col items-center w-1/3 min-w-[340px] bg-white h-1/3 justify-center gap-[40px]">
            <h1 className="text-3xl text-red-600 capitalize">Confirm delete</h1>
            <p>do you want to delete {name}</p>
            <div className="flex gap-[20px]">
              <div
                onClick={() => setShow(false)}
                className="bg-green-600 w-[140px] cursor-pointer h-[50px] text-white rounded-lg flex justify-center items-center font-bold"
              >
                <span>Cancel</span>
              </div>
              <div
                onClick={deleteObj}
                className="bg-red-600 w-[140px] cursor-pointer h-[50px] text-white rounded-lg flex justify-center items-center font-bold"
              >
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {icon ? (
        <IoTrashOutline className="text-[#D12621] cursor-pointer "  onClick={() => setShow(true)} />
      ) : (
        <div
        onClick={() => setShow(true)}
          className="bg-red-600 w-[140px] cursor-pointer h-[50px] text-white rounded-lg flex justify-center items-center font-bold "
        >
          <span>Delete</span>
        </div>
      )}
    </div>
  );
};

export default DelButt;
