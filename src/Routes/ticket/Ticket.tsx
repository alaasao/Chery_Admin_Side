import axios from 'axios';
import React, { useState } from 'react'
import Main from '../../utils/Main';
export enum TicketEtat {
    OPEN =  "OPEN" ,
    IN_PROGRESS =  "IN_PROGRESS" ,
    CLOSED =  "CLOSED" ,
  }
export interface TicketType {
     _id : string;
     Name : string;
     Subject : string;
     Description : string;
     Phone : string;
     Etat : TicketEtat;
     Reponse : string;
     createdAt : string;
     updatedAt : string;
     __v : number
}

const Ticket = () => {
    const [data, setData] = useState<TicketType[]>([]);
    React.useEffect(() => {
      axios.get(import.meta.env.VITE_Main_ENDPOINT + "ticket",
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
  
  export default Ticket;
  