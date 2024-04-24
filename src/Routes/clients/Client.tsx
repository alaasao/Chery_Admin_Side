import Main from "./components/Main";
import React from "react";

import data from "./components/data";
const Clients = () => {
  return (
    <div className="w-full ">
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
        Liste des clients
      </div>
      <Main data={data} />
    </div>
  );
};

export default Clients;
