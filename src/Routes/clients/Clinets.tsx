import React from "react";
import Title from "./components/Title";
import Main from "./components/Main";

import data from "./components/data";
const Clients = () => {
  return (
    <div className="w-full ">
      <Title title="Clients" />
      <Main data={data} />
    </div>
  );
};

export default Clients;
