
import Title from "../clients/components/Title";
import Main from "../clients/components/Main";

import data from "./components/data";
const Events = () => {
  return (
    <div className="w-full ">
      <Title title="Clients" />
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