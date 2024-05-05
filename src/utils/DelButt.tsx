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
    axios.delete(import.meta.env.VITE_Main_ENDPOINT + deleteRoute + "/" + id, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ3ODE1MTUsImV4cCI6MTcxNzM3MzUxNX0.oRfHgjt6CNRIakX_ysrd20tvoZYf4RWvCTAbR_uh4bM`,
      }
    
    })
    window.location.href = deleteRoute;
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
