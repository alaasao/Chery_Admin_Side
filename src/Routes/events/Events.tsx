import React, { useEffect, useState } from "react";
import Main from "../../utils/Main";


import axios from "axios";
import Loading from "../../utils/Loading";
const Events = () => {
  const [data, setData] = React.useState<EventType[]>([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios.get(import.meta.env.VITE_Main_ENDPOINT+"event").then((response) => {
      setData(response.data);
      setLoading(false)
    })
  }, [])
  if (loading) {
    return <Loading/>
  }
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
