import React from 'react';

import Title from "../clients/components/Title";
import Main from "../clients/components/Main";

import data from "./components/data";
const Events = () => {
  return (
    <div className="w-full ">
      
      <Title title="Clients" />
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
        Liste des Evenements
      </div>
      <Main data={data} />
    </div>
  );
};

export default Events;

export interface EventType{
    Images: string[];
    Title: string;
    Description: string;
    Date: Date;
  }