import React, { useEffect, useState } from "react";

import Main from "../../utils/Main.tsx";
import axios from "axios";

const Faq = () => {
  const [data, setData] = useState([])
  console.log(import.meta.env.VITE_KEY)
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT+"faq")
    res.then((response) => {
      setData(response.data)
      setLoading(false)
    })
  },[])
  return (
    <div>
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

export default Faq;

export interface FaqType {
  _id: string;
  Question: string;
  Answer: string;
}
