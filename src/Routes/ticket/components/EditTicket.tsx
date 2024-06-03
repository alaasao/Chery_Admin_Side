/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Listbox } from "@headlessui/react";

import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import DelButt from "../../../utils/DelButt";

import toast from "react-hot-toast";
import { TicketEtat, TicketType } from "../Ticket";
import Loading from "../../../utils/Loading";

const EditTicket = () => {
  const [etat, setEtat] = useState(TicketEtat.IN_PROGRESS);
  const { id } = useParams();

  const [etatOpen, setEtatOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState<TicketType>({
    _id: "",
    Name: "",

    Subject: "",
    Description: "",
    Phone: "",
    Etat: TicketEtat.OPEN,
    Reponse: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

    useEffect(() => {
      setLoading(true)
    axios
      .get(import.meta.env.VITE_Main_ENDPOINT + "ticket/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTicket(response.data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setEtat(ticket.Etat);
  }, [ticket]);
  async function submit(e: { preventDefault: () => void }) {
    setLoading(true);
    e.preventDefault();
if (ticket.Name === "" ) {
    toast.error("Veuillez remplir le nom");
    setLoading(false)
      return;
      }
      if (ticket.Description === "" ) {
        toast.error("Veuillez remplir la description");
        setLoading(false);
        return;
    }
    
    if (ticket.Subject === "" ) {
        toast.error("Veuillez remplir le sujet");
        setLoading(false);
        return;
      }
        if (ticket.Phone === "" ) {
            toast.error("Veuillez remplir le numéro de téléphone");
            setLoading(false);
            return;
        }
    await axios
      .put(
        import.meta.env.VITE_Main_ENDPOINT + "ticket/" + id,
        { ...ticket, Etat: etat },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
          toast.success("Ticket mis à jour");
          setTimeout(() => {
             
              window.location.href = "/ticket/" + id;
          }, 1000);

      
      })
        .catch((err) => {
            setTimeout(() => {
             
               setLoading(false)
            }, 1000);
        toast.error(err.response.data.message[0]);
      });
    
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <form
        onSubmit={submit}
        className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] "
      >
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">
            {" "}
            Nom et prénom
          </div>
          <input
            type={"text"}
            placeholder={`Entre le  Nom et le Prénom`}
            value={ticket.Name}
            onChange={(e) =>
              setTicket((prev) => ({ ...prev, Name: e.target.value }))
            }
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">Sujet</div>
          <input
            type={"text"}
            placeholder={`Entre l'dresse de Client `}
            value={ticket.Subject}
            onChange={(e) => {
              setTicket((prev) => ({ ...prev, Subject: e.target.value }));
            }}
            className=" flex outline-none justify-between text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">
            {" "}
            Numero de téléphone
          </div>
          <input
            type={"text"}
            placeholder={`Entre le Numero de téléphone  `}
            value={ticket.Phone}
            onChange={(e) => {
              setTicket((prev) => ({ ...prev, Phone: e.target.value }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>

        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Etat</div>
          <Listbox value={etat} onChange={setEtat}>
            <Listbox.Button
              onClick={() => setEtatOpen((prev) => !prev)}
              className=" flex justify-between outline-none bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]"
            >
              {etat}{" "}
              {etatOpen ? (
                <FaAngleDown className="text-2xl" />
              ) : (
                <FaAngleUp className="text-2xl" />
              )}
            </Listbox.Button>
            <Listbox.Options>
              {ticketEtatList.map((etat) => (
                <Listbox.Option
                  value={etat}
                  key={etat}
                  className="cursor-pointer h-[56px] flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {etat}{" "}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Description</div>

          <textarea
            value={ticket.Description}
            className=" flex outline-none bg-[#F6F7F9]  px-[30px]  max-md:px-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px] h-max"
            onChange={(e) => {
              setTicket((prev) => ({
                ...prev,
                Description: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-end justify-center gap-[20px] col-span-2  mb-[50px]">
          <DelButt
            id={ticket._id}
            deleteRoute="ticket"
            back="/ticket"
            name={"ticket"}
            icon={false}
          />
          <button
            type="submit"
            className="w-[140px] cursor-pointer bg-green-600 flex justify-center  items-center h-[50px] text-white  gap-[10px] rounded-xl"
          >
            {" "}
            envoyer
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;

const ticketEtatList = ["OPEN", "IN_PROGRESS ", "CLOSED"];
