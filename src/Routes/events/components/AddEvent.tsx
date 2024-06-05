import React, {   useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";
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
    Title: "",
   Event_Date: new Date(),
    Description: "",
  });
  const [loading,setLoading]=useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (event.Title === "") {
      toast.error("Veuillez entrer le titre")
      return
    }
    if (event.Description === "") {
      toast.error("Veuillez entrer la description")
      return
    }
    if (images[0]==="") {
      toast.error("Veuillez entrer un image")
      return
    }
    setLoading(true)
    axios.post(import.meta.env.VITEim_Main_ENDPOINT+"event", {
      Images: images,
      Title: event.Title,
     Event_Date: event.Event_Date,
      Description:event.Description
    },  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    }).then(() => {
      toast.success("event ajouté")
      setTimeout(() => {
        window.location.href = "/events"
      }, 1000);
    
    }).catch((err) => {
      setLoading(false)
      toast.error(err.response.data.message[0])
    })
    
  }
  async function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray.map(file => URL.createObjectURL(file)));

      setImages(await uploadImages(filesArray))

    }
  }
  if (loading) {
   return <Loading/>
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
        <div className="flex flex-col w-full max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Title</div>
          <input
            type="text"
            value={event.Title}
            onChange={(e) => {
              setEvent({ ...event, Title: e.target.value });
            }}
            className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
            placeholder="Entrez le nom et prénom du event"
          />
        </div>
        <div className="flex flex-col w-full max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Date</div>
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={event.Event_Date.toISOString().slice(0, 10)}
            onChange={(e) => {
              setEvent({ ...event,Event_Date: new Date(e.target.value) });
            }}
            className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
            placeholder="Entrez le numéro du event"
          />
        </div>
        <div className="flex flex-col w-full max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Description </div>
          <textarea
            value={event.Description}
            onChange={(e) => {
              setEvent({ ...event, Description: e.target.value });
            }}
            className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px]  "
            placeholder="Entrez l’adresse mail du event"
          />
        </div>
        <div className="flex flex-col items-center max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Images </div>
          <input type="file" onChange={handleImages} />
          <div className="flex gap-10">
        {" "}
        {images.map((img) => (
          <img src={img} className="w-[300px] h-[300px]" />
        ))}
      </div>
        </div>
<div className="flex justify-center col-span-2">        <button
        type="submit"
        className="w-[180px] col-span-2 cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end rounded-xl"
      >
        {" "}
        envoyer
        <FaArrowRight />
      </button></div>

      </form>
    
    </div>
  );
};

export default AddEvent;
