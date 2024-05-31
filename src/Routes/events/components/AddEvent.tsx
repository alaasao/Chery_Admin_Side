import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import axios from "axios";
export interface EventType {
  Images: string[];
  Title: string;
  Description: string;
 Event_Date: Date;
}

const AddEvent = () => {
  const [images, setImages] = useState([""]);
  const [event, setEvent] = useState({
    Images: [""],
    title: "",
   Event_Date: new Date(),
    Description: "",
  });
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const images = await uploadImages(event.Images)
    console.log(images)
    axios.post("https://axeiny.tech:4004/event", {
      Images: images,
      Title: event.title,
     Event_Date: event.Event_Date,
      Description:event.Description
    }).then(res => {
      console.log(res)
    })
    
  }
  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray.map(file => URL.createObjectURL(file)));
    }
  }
  return (
    <div>
      <div className="w-full my-[60px] text-[#49454] text-2xl pl-[40px]">
        Veuillez remplir ces champs concernant le event que vous souhaitez
        ajouter :{" "}
      </div>
      <form
        onSubmit={submit}
        className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px]"
      >
        <div className="flex flex-col w-full ">
          <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
          <input
            type="text"
            value={event.title}
            onChange={(e) => {
              setEvent({ ...event, title: e.target.value });
            }}
            className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
            placeholder="Entrez le nom et prénom du event"
          />
        </div>
        <div className="flex flex-col w-full ">
          <div className="text-xl font-bold pl-[16px]">Date</div>
          <input
            type="date"
            value={event.Event_Date.toISOString().slice(0, 10)}
            onChange={(e) => {
              setEvent({ ...event,Event_Date: new Date(e.target.value) });
            }}
            className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
            placeholder="Entrez le numéro du event"
          />
        </div>
        <div className="flex flex-col w-full ">
          <div className="text-xl font-bold pl-[16px]">Description </div>
          <textarea
            value={event.Description}
            onChange={(e) => {
              setEvent({ ...event, Description: e.target.value });
            }}
            className="w-full flex items-center justify-center border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
            placeholder="Entrez l’adresse mail du event"
          />
        </div>
        <div className="flex flex-col w-full ">
          <div className="text-xl font-bold pl-[16px]">Images </div>
          <input type="file" onChange={handleImages} />
          <div className="flex gap-10">
        {" "}
        {images.map((img) => (
          <img src={img} className="w-[300px] h-[300px]" />
        ))}
      </div>
        </div>

        <button
          type="submit"
          className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
        >
          {" "}
          envoyer
          <FaArrowRight />
        </button>
      </form>
    
    </div>
  );
};

export default AddEvent;
