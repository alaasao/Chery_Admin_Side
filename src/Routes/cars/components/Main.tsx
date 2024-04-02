import React, { FC } from "react";
import { CiSearch } from "react-icons/ci";
import { TiUserAddOutline } from "react-icons/ti";
import Pagination from "../../clients/components/Pagination";

import UserCard from "./UserCard";
interface MainProps {
  data: CarsProps[]  ;
}
const Main: FC<MainProps> = ({ data }: MainProps) => {
  const [searchKey, setSearchKey] = React.useState("");
  const [showList, setShowList] = React.useState<CarsProps[]>([]);
  const [usersList] = React.useState<CarsProps[]  >(data);

  return (
    <div className="w-full pt-[37px] font-poppins">
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] ">
        Liste des clients
      </div>
      <div className="w-full pl-[4%] pr-[11%] max-md:pr-[4%] flex items-center justify-between gap-[10px]">
        <div className="relative w-[370px] max-sm:w-[90%]  h-[45px] rounded-2xl  ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search something here"
            className="h-full w-full pl-[8px] text-[#827D7D] rounded-xl  outline-none bg-white drop-shadow-xl"
            onChange={(e) => {
              setSearchKey(e.target.value.toLowerCase());
            }}
          />
          <div className=" absolute right-[10px] top-1/2 -translate-y-1/2 max-sm:right-0 ">
            <CiSearch className="  text-[#827D7D] text-2xl " />
          </div>
        </div>
        <div className="flex w-[214px] max-sm:w-[50px] justify-center gap-[30px] bg-green-600 text-white items-center rounded-lg py-[6px] font-medium">
          <div className="max-sm:hidden"> Ajouter</div>
          <TiUserAddOutline className="text-3xl" />
        </div>
      </div>

      <div>
        {showList.map((e, i) => {
          return (
            <div key={i}></div>
            // <UserCard
            //   Name={e.Name}
            //   Email={e.Email}
            //   searchKey={searchKey}
            //   id={e.id}
            //   key={e.id + i}
            // />
          );
        })}
      </div>
      <div className="flex items-center justify-center w-full ">
        {" "}
        <Pagination
          article_per_page={8}
          arr={usersList}
          setShowList={setShowList}
          searchKey={searchKey}
        />
      </div>
    </div>
  );
};

export default Main;
export interface MoteurObj {
  Energie: string;
  Motricite: string;
  Type_Moteur: string;
  Cylidree: number;
  Boite: string;
  Consomation: string;
  Puissance: number;
  Nombre_Cylindres: string;
  Soupapes: number;
  Accelaration: number;
  Puissance_Tr: number;
  Turbo: boolean;
  Nombre_Rapport_Boite: number;
  Vitesse_Max: number;
  Couple: number;
}
export interface SecurityObj {
  Airbag: number;
  Regulateur_Limiteur_de_Vitesse: string;
  Abs: boolean;
  Keyless: string;
  Esp: boolean;
  Détecteur_Angle_Mort: boolean;
  Aide_Demarrage_Cote: boolean;
  Anti_Demarrage: boolean;
  Verrouillage_Centralise: string;
  Alarme: string;
}
export interface LookObj {
  Feux_Anti_Arouillard: string[];
  Feux_Avant: string;
  Peinture_Metalisee: boolean;
  Toit: boolean;
  Vitres_Teintees: boolean;
  Feux_Jour: string;
  Feux_Arriere: string;
  Jantes: number;
  Couleur_Poignees: string;
  Dimension_Pneumatique: string;
}
export interface VehiculeObj {
  Volume_Coffre: number;
  Longueur: number;
  Largeur: number;
  Hauteur: number;
  Empattement: number;
  Suspension_Avant: string;
  Suspension_Arriere: string;
  Nombre_Places: number;
  Nombre_Portes: number;
  Reservoir: number;
}
export interface ConfortObj {
  Climatisation: string;
  Direction: string;
  Ecran: string;
  Accoudoir: string;
  Sieges_Chauffants: boolean;
  Boire_A_Gants_Refrigerante: boolean;
  Ordinateur_De__Bord: boolean;
  Radar_De_Recul: boolean;
  Autoradio: string;
  bluetooth: boolean;
}
export interface CarsProps {
  _id: string;

  Images: { Images: string[]; Color: string }[];
  Modele: string;
  Garentie: string;
  Disponabilite: string;
  Prix_TTC: number;
  Moteur: string;
  PromoObj: {
    IsPromo: boolean;
    Start: string;
    End: string;
    Value: number;
  };
  MoteurObj: MoteurObj;
  ConfortObj: ConfortObj;
  SecurityObj: SecurityObj;
  LookObj: LookObj;
  VehiculeObj: VehiculeObj;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
