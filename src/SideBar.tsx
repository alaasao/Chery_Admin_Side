import { Link, NavLink, useLocation } from "react-router-dom";

import React, { useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";

const pages: Array<{ to: string; title: string; img: string }> = [
  { to: "/dashboard", title: "Tableau de bord", img: "home" },
  { to: "/clients", title: "Clients", img: "users" },
  { to: "/produits/cars", title: "Produits", img: "produit" },
  { to: "/events", title: "Evenements", img: "events" },
  { to: "/offres", title: "Offres", img: "offers" },
  { to: "/faq", title: "FAQ", img: "faq" },
  { to: "/messagerie", title: "Messagerie", img: "message" },
  { to: "/RDV", title: "RDV", img: "rdv" },
  { to: "statistiques", title: "Statistiques", img: "stats" },
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
  console.log(pathname);
  return (
    <div className={`${pathname === "/signin" ? "hidden" : ""}`}>
      {" "}
      <div
        className={`w-[320px] h-full  max-lg:w-screen max-lg:absolute min-h-screen  z-[10] bg-[#1E1E1E] py-[40px] flex flex-col items-center transition-all duration-700 origin-left ${
          open ? "" : "scale-x-0"
        }`}
      >
        <Link
          to="/"
          className="flex flex-col  cursor-pointer items-center mb-[40px]"
        >
          <img src="../assets/logo.png" alt="" className="w-[133px] " />

          <div className="good text-[#D12621] text-xl ">Speed Motors</div>
        </Link>
        <div className="w-[80%] h-[0.5px] bg-[#FFFFFF] mb-[60px] gap-[10px]"></div>
        {pages.map((e, i) => {
          return (
            <div className="w-full " key={i + e.title}>
              <NavLink
                to={e.to}
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
                <div className="flex items-center   pl-[30px]  gap-[15px] h-[63px] w-[300px]">
                  {" "}
                  <img src={`../assets/sideBar/${e.img}.png`} alt="" />
                  <div>{e.title}</div>
                </div>
              </NavLink>
            </div>
          );
        })}
        <div
          className="max-lg:absolute max-lg:w-full max-lg:h-full z-[10] cursor-pointer"
          onClick={() => setOpen(false)}
        ></div>
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
