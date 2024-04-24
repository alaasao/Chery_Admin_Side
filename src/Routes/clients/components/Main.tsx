import React, { FC, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TiUserAddOutline } from "react-icons/ti";
import Pagination from "./Pagination";

import UserCard from "./UserCard";
import { CarsProps } from "../../cars/Cars";
import CarCard from "../../cars/components/CarCard";

import { EventType } from "../../events/Events";
import EventCard from "../../events/components/EventCard";
import { FaqType } from "../../faq/Faq";
import FaqCard from "../../faq/components/FaqCard";
interface MainProps {
  data: (userType | CarsProps | EventType | FaqType)[];
}
const Main: FC<MainProps> = ({ data }: MainProps) => {
  const [searchKey, setSearchKey] = React.useState("");
  const [showList, setShowList] = React.useState<
    (userType | CarsProps | EventType | FaqType)[]
  >([]);
  const [usersList, setUsersList] =
    React.useState<(userType | CarsProps | EventType | FaqType)[]>(data);
  useEffect(() => {
    setUsersList(data);
    console.log(data);
  }, [data]);

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
        <div className="flex w-[214px] max-sm:w-[50px] justify-center gap-[30px] bg-green-600 text-white items-center rounded-lg py-[6px] font-medium">
          <div className="max-sm:hidden"> Ajouter</div>
          <TiUserAddOutline className="text-3xl" />
        </div>
      </div>

      <div>
        {showList.map((e, i) => {
          return "Name" in e ? (
            <UserCard
              Name={e.Name}
              Email={e.Email}
              searchKey={searchKey}
              id={e.id}
              key={e.id + i}
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
              Date={e.Date}
              key={i + e.Title}
            />
          ) : "answer" in e ? (
            <FaqCard id={e.id} question={e.question} />
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
