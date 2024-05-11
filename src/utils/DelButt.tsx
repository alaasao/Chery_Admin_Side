import axios from "axios";
import React, { FC } from "react";

interface DelButtProps {
  
deleteRoute: string;
  id: string;
}
const DelButt: FC<DelButtProps> = ({

  deleteRoute,
  id,
}: DelButtProps) => {
  function deleteObj() {
    console.log(import.meta.env.VITE_Main_ENDPOINT + deleteRoute + "/" + id)
    axios.delete(import.meta.env.VITE_Main_ENDPOINT + deleteRoute + "/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    
    }).then(() => {
      window.location.href = "/produits/cars";
    
    })
  
  }
  return (
    
      <div
        onClick={deleteObj}
        className="bg-red-600 w-[140px] cursor-pointer h-[50px] text-white rounded-lg flex justify-center items-center font-bold"
      >
        <span>Delete</span>
      </div>

  );
};

export default DelButt;
