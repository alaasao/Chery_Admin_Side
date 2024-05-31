import axios from "axios";
import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { EventType } from "../Events";
import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = React.useState<EventType>({
    Title: "",
    Description: "",
    Event_Date: new Date() ,
    _id: "",
    Images: [],
  });
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
      axios.get(`https://axeiny.tech:4004/event/${id}`).then((response) => {

      setEvent(response.data);
      setLoading(false);
    });
  }, [id]);
  if (loading) {
    return <div>... Loading</div>;
  }

  return (
    <div>
         <div className="flex justify-center w-full my-[50px]"><img src={event.Images[0]} alt="" className="md:w-1/3  h-[300px] rounded-lg" /></div>

      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
   
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-md:text-xl">Title</div>
          <input
            type="string"
            placeholder="Nom de modele"
            value={event?.Title}
            readOnly={true}
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                  <div className="text-3xl font-bold max-sm:text-xl">Date</div>
           
          <input
            type={"date"}
            value={event.Event_Date.toString().split("T")[0]}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto col-span-2 ">
                  <div className="text-3xl font-bold max-sm:text-xl"> Description</div>
           
          <textarea
           
            value={event.Description }
            className=" flex outline-none bg-[#F6F7F9]  px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px] h-max"
            readOnly
          />
              </div>
     
              <div className="flex justify-center w-full gap-[20px] col-span-2 ">
        <DelButt id={id || ""} deleteRoute="event" icon={false} back="/events" name="event" />
   
        <EditButt id={id || ""} editRoute="/events/editevent" />
        
    </div>
          </div>
    </div>
  );
};

export default EventDetails;
