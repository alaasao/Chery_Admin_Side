import { useParams } from "react-router-dom";
import Title from "../components/Title";
import data from "../components/data";
const ClientPage = () => {
  const { id } = useParams()
  const client = data.find((e) => e.id == id);
  return (
    <div>
      <Title title="Informations" />
      <div className="w-full flex justify-between  pt-[20px] pb-[50px] border-b-[1.5px] border-[#494545] max-md:flex-col max-md:items-center">
        <img
          src={client?.img}
          alt=""
          className="rounded-full w-[142px]  h-[142px] md:order-2 max-md:mb-[50px] mr-[40px]"
        />
        <div className="md:order-1 text-3xl max-sm:text-xl max-md:w-full px-[5%] max-sm:px-[10px]">
          <div className="text-3xl text-[#878181] underline mb-[12px]">
            Coordonnées du client :
          </div>
          <div className="pl-[11%] max-sm:pl-[20px] flex flex-col gap-[10px]">
            <div>
              Nom et prénom :{" "}
              <span className="text-[#878181]">{client?.Name}</span>
            </div>
            <div>
              Numéro de téléphone :{" "}
              <span className="text-[#878181]">{client?.Phone}</span>
            </div>
            <div>
              Adresse mail :{" "}
              <span className="text-[#878181]">{client?.Email}</span>
            </div>
            <div>
              Identificateur :{" "}
              <span className="text-[#878181]">{client?.id}</span>
            </div>
            <div>
              Nom et prénom :{" "}
              <span className="text-[#878181]">{client?.Name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:order-1 text-3xl max-sm:text-xl mt-[40px] pb-[50px] border-b-[1.5px] border-[#494545]">
        <div className="text-3xl text-[#878181] underline mb-[12px] px-[5%] max-sm:px-[10px]">
          Détails du véhicule acheté :
        </div>
        <div className="pl-[10%] max-sm:pl-[20px] flex flex-col gap-[10px]">
          <div>
            Modèle : <span className="text-[#878181]">{client?.Model}</span>
          </div>
          <div>
            Numéro d'identification du véhicule (VIN) :
            <span className="text-[#878181]">{client?.Vin}</span>
          </div>
          <div>
            Prix de vente du véhicule :
            <span className="text-[#878181]">{client?.Prix_Vente}</span>
          </div>
        </div>
      </div>
      <div className="md:order-1 text-3xl max-sm:text-xl mt-[40px]">
        <div className="text-3xl text-[#878181] underline mb-[12px] px-[5%] max-sm:px-[10px]">
          Informations sur la garantie :
        </div>
        <div className="pl-[10%] max-sm:pl-[20px] flex flex-col gap-[10px]">
          <div>
            Durée de la garantie : <span className="text-[#878181]">000</span>
          </div>
          <div>
            Date d’achat :
            <span className="text-[#878181]">{client?.Data_Achat}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
