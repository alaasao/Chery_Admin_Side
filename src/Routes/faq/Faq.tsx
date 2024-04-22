import React from "react";

import Main from "../clients/components/Main.tsx";
import data from "./components/data.ts";
const Faq = () => {
  return (
    <div>
      <div className="w-full pl-[4%] text-3xl font-medium mb-[40px] mt-[36px] ">
        Liste des quetions
      </div>
      <Main data={data} />
    </div>
  );
};

export default Faq;

export interface FaqType {
  id: string;
  question: string;
  answer: string;
}
