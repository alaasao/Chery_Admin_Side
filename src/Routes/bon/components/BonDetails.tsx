import React, { useEffect, useState } from "react";



import {Link, useParams } from "react-router-dom";
import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";
import axios from "axios";

const BonDetails = () => {
  const [bon, setbon] = useState({
    Date_Achat: "",
    Prix_Vente: 0,
    Garentie: "",
    Facture: "",
    Contrat_De_Vente: "",
    Car: { __id: "", Name: "", Garentie: "" },
    Piece: { __id: "", Name: "" },
      Client: { __id: "", Name: "", Phone: "" },
    
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        import.meta.env.VITE_Main_ENDPOINT + "bon/" + id
      );
      setbon(response.data);
      setLoading(false);
      }

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  
    
  return (
    <form  className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
   
          
   <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
            <div className="text-xl font-bold pl-[16px]">Client </div>
            <input
              type="text"
             
            value={bon.Client.Name}
          readOnly placeholder="Not provided"
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
          
            />
          </div>
          {bon.Car ?
            ( <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
             <div className="text-xl font-bold pl-[16px]">Modele </div>
             <input
               type="text"
              
             value={bon.Car.Name}
           readOnly placeholder="Not provided"
             className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
           
             />
        </div>) :
 (       <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
            <div className="text-xl font-bold pl-[16px]">Nom de Piece </div>
            <input
              type="text"
             
            value={bon.Piece.Name}
          readOnly placeholder="Not provided"
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
          
            />
          </div>)}

          <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
              
          <div className="text-xl font-bold max-sm:text-xl"> la Date</div>
          <input
            type={"date"}
            min={new Date().toISOString().split('T')[0]}
            placeholder={`  `}
         value={bon.Date_Achat.split('T')[0]}
            onChange={(e) => {
              setbon((prev) => ({
                ...prev,
                Date_Achat: e.target.value,
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-lg border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
          <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold max-sm:text-xl"> Prix</div>
          <input
            type={"number"}
            min={0}
            placeholder={`Prix final`}
         value={bon.Prix_Vente}
            onChange={(e) => {
              setbon((prev) => ({
                ...prev,
                Prix_Vente: Number( e.target.value),
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-lg border border-black text-2xl max-sm:text-[16px]"
          />
          </div>
          <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px] ">Contrat De Vente</div>
              <div className="flex items-center justify-center w-full gap-[20px]">
                <a href={bon.Contrat_De_Vente} download={true} className="flex items-center justify-center font-bold underline rounded-lg">click to download</a>
                  <a href={bon.Contrat_De_Vente} target="_blanck" className="font-bold ">click to see</a>
         </div>
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Facture</div>
          <div className="flex items-center justify-center gap-[20px]">
          <Link to={bon.Facture} download={bon.Facture} target="_blank" className="flex items-center justify-center font-bold underline rounded-lg">click to download</Link>
                  <a href={bon.Facture} target="_blanck" className="font-bold ">click to see</a>  </div>
          </div>
          <div className="flex justify-center w-full my-[50px] gap-[20px] col-span-2 ">
        <DelButt id={id || ""} deleteRoute="bon" icon={false} back="/bon" name="bon" />
   
        <EditButt id={id || ""} editRoute="/bon/editbon" />
        
    </div>
    </form>
  );
};

export default BonDetails;
