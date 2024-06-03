import React, { useEffect, useState } from "react";

import Main from "../../utils/Main.tsx";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Piece = () => {
  const [data, setData] = useState([])
  const path = useLocation().pathname;
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT+"piece")
    res.then((response) => {
      setData(response.data)
      setLoading(false)
    })
  },[])
  return (
      <div>
           <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] grid grid-cols-2 ">
        <Link
          to="/produits/cars"
          className={`${
            path === "/produits/cars" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px]`}
        >
          Véhicules
        </Link>
        <Link
          to="/produits/pieces"
          className={`${
            path === "/produits/pieces" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] `}
        >
          Pièces
        </Link>
      </div>
      <div className="w-full pl-[4%] text-3xl font-medium mb-[40px] mt-[36px] ">
        Liste des quetions
      </div>
      {loading ?
        <div>... Loading</div> :
        <Main data={data} />
    }
     
    </div>
  );
};

export default Piece;

export interface PieceType {
    _id: string;
    Name: string;
    Description: string;
    Price: number;
    Quantity: number;
    Image: { color: string, images: string[] }[];
    IsPromo: boolean;
    createdAt: string;
    updatedAt: string;
    __v:number
}
