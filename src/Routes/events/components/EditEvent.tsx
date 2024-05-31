import axios from "axios";
import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { EventType } from "../Events";

const EditEvent = () => {
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
        console.log(response.data)
      setEvent(response.data);
      setLoading(false);
    });
  }, [id]);
  if (loading) {
    return <div>... Loading</div>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-md:text-xl">Modele</div>
          <input
            type="string"
            placeholder="Nom de modele"
                      value={event?.Title}
                      onChange={(e) => {
                          setEvent({...event,Title:e.target.value})
                      }}
           
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                  <div className="text-3xl font-bold max-sm:text-xl"> la Date</div>
           
          <input
            type={"date"}
                      value={event.Event_Date.toString().split("T")[0]}
                      onChange={(e) => {
                        setEvent({ ...event, Event_Date: new Date(e.target.value) })
                    }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
             
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                  <div className="text-3xl font-bold max-sm:text-xl"> Description</div>
           
          <textarea
              onChange={(e) => {
                setEvent({...event,Description:e.target.value})
            }}
            value={event.Description }
            className=" flex outline-none bg-[#F6F7F9] h-[90px] pl-[5px] max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
             
          />
              </div>
     
              
          </div>
          <div className="flex justify-center w-full mt-[50px] rounded-2xl"><img src={event.Images[0]} alt="" className="w-1/3 rounded-2xl h-1/3" /></div>
    </div>
  );
};

export default EditEvent;
