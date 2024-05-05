// import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";
interface FaqType {
  id: string;
  Question: string;
  Answer: string;
}
const FaqDetails = () => {
  const { id } = useParams();
  const [loading,setLoading]=useState(true)
  const [faq, setFaq] = React.useState<FaqType>({
    Answer: "",
    Question: "",
    id: "",
  });


  useEffect(() => {
    axios.get("https://axeiny.tech:4004/faq/"+id).then((response) => {
      response.data;
      setFaq(response.data);
      setLoading(false)
    });

  }, [id]);
  if (loading) {
    return <div>... Loading</div>
  }
  return (
  <div>     <div className="w-full px-[30px]">
      <div className="my-[50px] text-3xl max-md:text-[16px]">
        Veuillez remplir ces champs concernant la question que vous souhaitez
        ajouter :{" "}
      </div>
      <div className="w-full ">
        <div className="text-3xl mb-[20px] font-medium max-md:text-[16px]">
          Question :{" "}
        </div>
        <textarea
          className="w-full  outline-none border-[0.5px] border-black rounded-lg pl-[10px] "
          readOnly
          value={faq.Question}
        />
      </div>
      <div className="w-full">
        <div className="text-3xl mb-[20px] font-medium max-md:text-[16px]">
          Answer :{" "}
        </div>
        <textarea
          className="w-full  outline-none  border-[0.5px] border-black rounded-lg pl-[10px] min-h-[100px]"
          readOnly
          value={faq.Answer}
        />
      </div>
        </div>
      
        <div className="flex justify-center w-full mt-[50px] gap-[20px] ">
        <DelButt id={id||""} deleteRoute="faq" />
        <EditButt id={id||""} editRoute="/faq/editfaq" />
    </div>
    </div>

  );
};

export default FaqDetails;
