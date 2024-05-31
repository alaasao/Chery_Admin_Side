import React, { FC, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TiUserAddOutline } from "react-icons/ti";
import Pagination from "./Pagination";

import UserCard from "../Routes/clients/components/UserCard";
import { CarsProps } from "../Routes/cars/Cars";
import CarCard from "../Routes/cars/components/CarCard";

import { EventType } from "../Routes/events/Events";
import EventCard from "../Routes/events/components/EventCard";
import { FaqType } from "../Routes/faq/Faq";
import FaqCard from "../Routes/faq/components/FaqCard";
import { Link } from "react-router-dom";
import { RdvType } from "../Routes/Rdv/Rdv";
import RdvCard from "../Routes/Rdv/components/RdvCard";

interface MainProps {
  data: (userType | CarsProps | EventType | FaqType | RdvType)[];
}
const Main: FC<MainProps> = ({ data }: MainProps) => {
  const [searchKey, setSearchKey] = React.useState("");
  const [showList, setShowList] = React.useState<
    (userType | CarsProps | EventType | FaqType | RdvType)[]
  >([]);
  const [usersList, setUsersList] =
    React.useState<(userType | CarsProps | EventType | FaqType | RdvType)[]>(
      data
    );
  useEffect(() => {
    setUsersList(data);
    console.log(data);
  }, [data]);
  const { pathname } = location;
  return (
    <div className="w-full font-poppins">
      <div className="w-full pl-[4%] pr-[11%] max-md:pr-[4%] flex items-center justify-between gap-[10px]">
        <div className="relative w-[370px] max-sm:w-[90%]  h-[45px] rounded-2xl  ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search something here"
            className="h-full flex w-full pl-[8px] text-[#827D7D] rounded-xl  outline-none bg-white drop-shadow-xl"
            onChange={(e) => {
              setSearchKey(e.target.value.toLowerCase());
            }}
          />
          <div className=" absolute right-[10px] top-1/2 -translate-y-1/2 max-sm:right-0 ">
            <CiSearch className="  text-[#827D7D] text-2xl " />
          </div>
        </div>
        <Link
          to={
            pathname.includes("faq")
              ? "/faq/addfaq"
              : pathname.includes("car")
              ? "/produits/AddCar"
              : pathname.toLocaleLowerCase().includes("rdv")
              ? "/rdv/addrdv"
              : pathname.toLocaleLowerCase().includes("event")
              ? "/events/addevent"
              : ""
          }
          className="flex w-[214px] max-sm:w-[50px] justify-center gap-[30px] bg-green-600 text-white items-center rounded-lg py-[6px] font-medium"
        >
          <div className="max-sm:hidden"> Ajouter</div>
          <TiUserAddOutline className="text-3xl" />
        </Link>
      </div>
      <div className="flex flex-col gap-y-[20px] pt-[20px]">
        {showList.map((e, i) => {
          return "Answer" in e ? (
            <FaqCard id={e._id} question={e.Question} key={e._id + 66} />
          ) : "Etat" in e ? (
            <RdvCard
              _id={e._id}
              Date_Choisie={e.Date_Choisie}
              Name={e.Name}
              Etat={e.Etat}
              Phone={e.Phone}
              key={e._id + 66}
            />
          ) : "Modele" in e ? (
            <CarCard
              _id={e._id}
              Modele={e.Modele}
              Disponabilite={e.Disponabilite}
              key={e._id + i}
            />
          ) : "Title" in e ? (
            <EventCard
              Title={e.Title}
              Description={e.Description}
              Event_Date={e.Event_Date}
              id={e._id}
              key={i + e.Title}
            />
          ) : "Name" in e ? (
            <UserCard
              Name={e.Name}
              Email={e.Email}
              searchKey={searchKey}
              id={e.id}
              key={e.id + i}
            />
          ) : null;
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
export interface userType {
  Name: string;
  Phone: string;
  Email: string;
  Model: string;
  Vin: string;
  Prix_Vente: number;
  Adresse: string;
  Data_Achat: string;
  Documents: string[];
  img: string;
  id: string;
}
