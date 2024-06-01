import axios from "axios";
import React, {   useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventType } from "../Events";
import DelButt from "../../../utils/DelButt";

import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { uploadImages } from "../../../config/firebase/Upload_Images";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const[images,setImages]=useState([""])
  const [event, setEvent] = React.useState<EventType>({
    Title: "",
    Description: "",
    Event_Date: new Date() ,
    _id: "",
    Images: [],
  });
  useEffect(() => {
  setImages(event.Images)
},[event])
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
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
  
  await axios.put(
      import.meta.env.VITE_Main_ENDPOINT+"event/"+id,
      {
        Title: event.Title,
        Description: event.Description,
        Event_Date: event.Event_Date ,
        _id: event._id,
        Images: images,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      }
  ).then(() => {
    toast.success("Event Updated Successfully")
  }
  ).catch((err) => {
      
    toast.error(err.response.data.message[0])
    });
    
    window.location.href = "/events/"+id;


  }
  async function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray.map(file => URL.createObjectURL(file)));

      setImages(await uploadImages(filesArray))

    }
  }
  return (
    <div className="w-full">
      <div className="flex justify-center w-full ">
        <div className="flex flex-col gap-[20px] items-center">
          <div className="mx-auto text-xl mt-[50px]">Image</div>
          <input type="file" onChange={handleImages} />
          <div className="flex gap-10">
        {" "}
        {images.map((img) => (
          <img src={img} className="w-[300px] h-[300px] rounded-xl" />
        ))}
      </div>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 max-md:grid-cols-1   gap-x-[9vw] gap-y-[20px] px-[40px] ">
   
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-md:text-xl">Title</div>
          <input
            type="string"
            placeholder="Nom de modele"
            value={event?.Title}
            onChange={(e) => {
              setEvent((prev) => ({ ...prev, Title: e.target.value }));
            }}
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2  ">
                  <div className="text-3xl font-bold max-sm:text-xl">Date</div>
           
          <input
            type={"date"}
            onChange={(e) => {
              setEvent((prev) => ({ ...prev, Event_Date: new Date (e.target.value) }));
            }}
            min={ new Date().toISOString().split('T')[0]}
            value={event.Event_Date.toString().split("T")[0]}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
             
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto col-span-2 ">
                  <div className="text-3xl font-bold max-sm:text-xl"> Description</div>
           
          <textarea
            onChange={(e) => {
              setEvent((prev) => ({ ...prev, Description: e.target.value }));
            }}
            value={event.Description }
            className=" flex outline-none bg-[#F6F7F9]  px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px] h-max"
             
          />
              </div>
          

              <div className="flex items-end justify-center gap-[20px] col-span-2  " >
          <DelButt id={event._id} deleteRoute="event" back="/rdv" name={event.Title} icon={false} />
        <button
       onClick={submit}
        className="w-[140px] cursor-pointer bg-green-600 flex justify-center  items-center h-[50px] text-white  gap-[10px] rounded-xl"
      >
        {" "}
        envoyer
        <FaArrowRight />
      </button>
        </div>
    
          </div>
    </div>
  );
};

export default EventDetails;
