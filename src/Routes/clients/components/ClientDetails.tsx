import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { userType } from "./AddClient";
import axios from "axios";
import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";
import Loading from "../../../utils/Loading";

const ClientDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<userType>({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    Contrat_De_Vente: "",
    Facture: "",
    Garantie: "",
    Car: "",
    Piece: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_Main_ENDPOINT + "client/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .then((data) => setClient(data));
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <form className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] mt-[50px]">
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Nom et prénom</div>
          <input
            type="text"
            value={client.Name}
            onChange={(e) => {
              setClient({ ...client, Name: e.target.value });
            }}
            readOnly
            placeholder="Not provided"
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Num de téléphone</div>
          <input
            type="text"
            value={client.Phone}
            onChange={(e) => {
              setClient({ ...client, Phone: e.target.value });
            }}
            readOnly
            placeholder="Not provided"
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Address </div>
          <input
            type="text"
            value={client.Address}
            onChange={(e) => {
              setClient({ ...client, Address: e.target.value });
            }}
            readOnly
            placeholder="Not provided"
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Id</div>
          <input
            type="string"
            value={client._id}
            onChange={(e) => {
              setClient({ ...client, Email: e.target.value });
            }}
            readOnly
            placeholder="Not provided"
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Email</div>
          <input
            type="email"
            value={client.Email}
            onChange={(e) => {
              setClient({ ...client, Email: e.target.value });
            }}
            readOnly
            placeholder="Not provided"
            className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex justify-center w-full my-[50px] gap-[20px] col-span-2 ">
          <DelButt
            id={id || ""}
            deleteRoute="client"
            icon={false}
            back="/clients"
            name="client"
          />

          <EditButt id={id || ""} editRoute="/clients/editclient" />
        </div>
      </form>
    </div>
  );
};

export default ClientDetails;
