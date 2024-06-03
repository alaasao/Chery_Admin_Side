import { Link, NavLink, useLocation } from "react-router-dom";

import React, { useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaReceipt } from "react-icons/fa";

const pages: Array<{ to: string; title: string; img: string }> = [

  { to: "/clients", title: "Clients", img: "users" },
  { to: "/produits/cars", title: "Produits", img: "produit" },
  { to: "/events", title: "Evenements", img: "events" },
  { to: "/Statistiques", title: "Statistiques", img: "rdv" },
  { to: "/faq", title: "FAQ", img: "faq" },

  { to: "/RDV", title: "RDV", img: "rdv" },
  { to: "/bon", title: "Bon", img: "bon" },
{ to: "/ticket", title: "Ticket", img: "ticket" },

];
const SideBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = React.useState(
    window.innerWidth > 1024 ? true : false,
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className={`${pathname === "/signin" ? "hidden" : ""}`}>
      {" "}
      <div
        className={`h-full  max-lg:w-screen max-lg:absolute min-h-screen  z-[10] bg-[#1E1E1E] py-[40px] flex flex-col items-center transition-all duration-700 origin-left ${
          open ? "scale-x-1" : "scale-x-0"
        }`}
      >
        <Link
          to=""
          className="flex flex-col  cursor-pointer items-center mb-[40px]"
          onClick={()=>setOpen(false)}
        >
          <img src="../assets/logo.png" alt="" className="" />

          <div className="good text-[#D12621] text-xl ">Speed Motors</div>
        </Link>
        <div className="w-[80%] h-[0.5px] mb-5 bg-[#FFFFFF] gap-[10px]"></div>
        {pages.map((e, i) => {
          return (
            <div className="w-full " key={i + e.title}>
              <NavLink
                to={e.to}
       onClick={()=>setOpen(window.innerWidth > 1024?true:false)}
                // className={`   w-full flex justify-center text-white cursor-pointer  ${
                //   path === e.to
                //     ? "bg-gradient-to-r from-[#1E1E1E] to-[#737373]"
                //     : ""
                //           } `}
                className={({ isActive }) =>
                  [
                    " w-full flex justify-center text-white cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-[#1E1E1E] to-[#737373]"
                      : "",
                  ].join(" ")
                }
              >
                <div className="flex items-center pl-[30px]  gap-[15px] h-[63px] w-[300px]">
                  {" "}
                  {e.img === "bon" ?
                    <FaReceipt className="text-4xl" />
                    : <img src={`../assets/sideBar/${e.img}.png`} alt="" />} 
                  <div>{e.title}</div>
                </div>
              </NavLink>
            </div>
          );
        })}
     
      </div>
      <div
        className={`lg:hidden  absolute top-[35px] left-[10px] text-4xl cursor-pointer text-[#D12621] ${
          open ? "hidden" : ""
        } `}
        onClick={() => setOpen(true)}
      >
        <CiMenuBurger />
      </div>
    </div>
  );
};

export default SideBar;
