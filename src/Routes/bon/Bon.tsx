import Main from "../../utils/Main";
import React, { useState } from "react";

import axios from "axios";

export interface BonType{
    _id: string;
    Date_Achat: string;
    Contrat_De_Vente: string;
    Prix_Vente: number;
    Facture: string;
    Garentie: string;
    createdAt: string;
    updatedAt: string;
    Car: { __id: string, name: string, Garentie: string } | null;
    Piece: { __id: string, Name: string } | null
    Client: { __id: string, Name: string, Phone: string};
    __v: number;
    
}
const Bon = () => {
  const [data, setData] = useState<BonType[]>([]);
  React.useEffect(() => {
    axios.get(import.meta.env.VITE_Main_ENDPOINT + "bon",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
        .then((response) =>
        {
            console.log(response.data)
            return response.data
        }
           )
      .then((data) => setData(data));
  }, []);
  return (
    <div className="w-full ">
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
        Liste des clients
      </div>
      <Main data={data} />
    </div>
  );
};

export default Bon;
