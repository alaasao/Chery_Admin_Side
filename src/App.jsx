import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Clients from "./Routes/clients/Client";

import AddClient from "./Routes/clients/components/AddClient";
import Cars from "./Routes/cars/Cars";
import Events from "./Routes/events/Events";
import Faq from "./Routes/faq/Faq";

import AddCar from "./Routes/cars/components/AddCar";
import ShowCar from "./Routes/cars/components/ShowCar";
import EditCar from "./Routes/cars/components/EditCar";
import FaqDetails from "./Routes/faq/components/FaqDetails";
import AddFaq from "./Routes/faq/components/AddFaq";
import EditFaq from "./Routes/faq/components/EditFaq";
import Rdv from "./Routes/Rdv/Rdv";
import RdvDetails from "./Routes/Rdv/components/RdvDetails";
import AddRdv from "./Routes/Rdv/components/AddRdv";
import EditRdv from "./Routes/Rdv/components/EditRdv";
import ClientDetails from "./Routes/clients/components/ClientDetails";
import EditClient from "./Routes/clients/components/EditClient";
import AddEvent from "./Routes/events/components/AddEvent";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/reducers/auth.reducer";
import AuthWrapper from "./config/auth/wrapper";
import EventDetails from "./Routes/events/components/EventDetails";
import EditEvent from "./Routes/events/components/EditEvent";
import { Statistiques } from "./Routes/Statistiques/Statistiques";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
   
      dispatch(getUser());
    }
  }, []);
  const routes = [
    {
      name: "Dashboard",
      link: "/",
      component: Dashboard,

    },
    {
      name: "Clients",
      link: "/clients",
      component: Clients,
    },
    {
      name: "clientPage",
      link: "/clients/:id",
      component: ClientDetails,
    },
    {
      name: "addClient",
      link: "/clients/AddClient",
      component: AddClient,
    },
    {
      name: "addClient",
      link: "/clients/:id",
      component: ClientDetails,
    },
    {
      name: "addClient",
      link: "/clients/editclient/:id",
      component: EditClient,
    },
    {
      name: "cars",
      link: "/produits/cars",
      component: Cars,
    },

    {
      name: "cars",
      link: "/produits/AddCar",
      component: AddCar,
    },
    {
      name: "cars",
      link: "/produits/cars/:id",
      component: ShowCar,
    },
    {
      name: "cars",
      link: "/produits/editcar/:id",
      component: EditCar,
    },
    {
      name: "cars",
      link: "/produits/AddCar",
      component: AddCar,
    },
    {
      name: "events",
      link: "/events",
      component: Events,
    },
    {
      name: "events",
      link: "/events/:id",
      component: EventDetails,
    },
    {
      name: "events",
      link: "/events/addevent",
      component: AddEvent,
    },
    {
      name: "events",
      link: "/events/editevent/:id",
      component: EditEvent,
    },
    {
      name: "rdv",
      link: "/rdv",
      component: Rdv,
    },
    {
      name: "rdv",
      link: "/rdv/:id",
      component: RdvDetails,
    },
    {
      name: "rdv",
      link: "/rdv/addRdv",
      component: AddRdv,
    },
    {
      name: "rdv",
      link: "/rdv/editrdv/:id",
      component: EditRdv,
    },
    {
      name: "faq",
      link: "/faq",
      component: Faq,
    },
    {
      name: "faq",
      link: "/faq/:id",
      component: FaqDetails,
    },
    {
      name: "faq",
      link: "/faq/addfaq",
      component: AddFaq,
    },
    {
      name: "faq",
      link: "/faq/editFaq/:id",
      component: EditFaq,
    },
    {
      name: "Statistiques",
      link: "/Statistiques",
      component: Statistiques,
    },
  ];

  return (
    <>
      <Toaster
        position="bottom_center"
      />
    <AuthWrapper>
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.link} element={<route.component />} key={index} />
        ))}
      </Routes>
      </AuthWrapper>
    </>
  );
}

export default App;
