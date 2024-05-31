import React, { useEffect } from "react";
import Main from "../../utils/Main";


import axios from "axios";
const Events = () => {
  const [data, setData] = React.useState<EventType[]>([]);
  useEffect(() => {
    axios.get("https://axeiny.tech:4004/event").then((response) => {
      setData(response.data);
    })
  },[])
  return (
    <div className="w-full ">
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
        Liste des Evenements
      </div>
      <Main data={data} />
    </div>
  );
};

export default Events;

export interface EventType {
  Images: string[];
  Title: string;
  Description: string;
  Event_Date: Date;
  _id: string;
}
