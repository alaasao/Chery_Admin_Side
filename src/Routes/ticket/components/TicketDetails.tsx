import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";



import { TicketType } from "../Ticket";
import { TicketEtat } from "../Ticket";

import axios from "axios";

import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";
import Loading from "../../../utils/Loading";

const TicketDetails = () => {
  const [loading,setLoading]=useState(true)
    const { id } = useParams();

  const [ticket, setTicket] = useState<TicketType>({
    _id: "",
      Name: "",

      Subject: "",
      Description: "",
      Phone: "",
      Etat: TicketEtat.OPEN,
      Reponse: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
        
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_Main_ENDPOINT + "ticket/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
    }).then((response) => { 
      
      setTicket(response.data)
      setLoading(false)
    })
  }, []);
  if (loading) {
    return <Loading/>
  }
  return (
    <div>
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <form className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Nom et prénom</div>
          <input
            type={"text"}
            placeholder={`Entre le  Nom et le Prénom`}
            value={ticket.Name}
          
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
      
                      readOnly
                  />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">Subject </div>
          <input
            type={"text"}
            placeholder={`Entre l'dresse de Client `}
            value={ticket.Subject}
         
                className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
   readOnly       />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Numero de téléphone</div>
          <input
            type={"text"}
            placeholder={`Entre le Numero de téléphone  `}
            value={ticket.Phone}
         
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly    />
        </div>
       

  
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Etat</div>
          <input  type={"text"}
            placeholder={`Entre l'email  `}
            value={ticket.Etat}
         className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly   />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto col-span-2 ">
                  <div className="text-3xl font-bold max-sm:text-xl"> Description</div>
           
          <textarea
            value={ticket.Description }
            className=" flex outline-none bg-[#F6F7F9]  px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px] h-max"
            readOnly
          />
              </div>
   
        <div className="flex justify-center w-full mt-[50px] gap-[20px]  col-span-2 my-[50px]">
        <DelButt id={ticket._id} deleteRoute="ticket" back="/ticket" name="ticket" icon={false} />
        <EditButt id={ticket._id} editRoute="/ticket/editticket" />
    </div>
      </form>
      <div ></div>
     
    </div>
  );
};

export default TicketDetails;

