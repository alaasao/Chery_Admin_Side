import React from "react";
import Title from "../components/Title";

const AddClient = () => {
  return (
    <div>
      <Title title="Ajouter un client" />
      <div className="w-full mt-[60px] text-[#49454] text-2xl pl-[40px]">
        Veuillez remplir ces champs concernant le client que vous souhaitez
        ajouter :{" "}
      </div>
      <form className="w-full px-[75px] grid grid-cols-[1fr_1fr]  gap-x-[15%] mt-[40px]">
        <div className="flex flex-col w-full gap-y-[40px]">
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
            <input
              type="text"
              name="name"
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le nom et prénom du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Num de téléphone*</div>
            <input
              type="text"
              name="name"
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le numéro du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Adresse mail*</div>
            <input
              type="text"
              name="name"
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez l’adresse mail du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
            <input
              type="text"
              name="name"
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le nom et prénom du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
            <input
              type="text"
              name="name"
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le nom et prénom du client"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
