import { Route, Routes } from "react-router-dom";
import React from "react";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Clients from "./Routes/clients/Client";
import ClientPage from "./Routes/clients/clientPage/ClientPage";
import AddClient from "./Routes/clients/AddClient/AddClient";
import Cars from "./Routes/cars/Cars";
import Events from "./Routes/events/Events";
import Faq from "./Routes/faq/Faq";

import SignIn from "./Routes/signin/SignIn";
import AddCar from "./Routes/cars/components/AddCar";
import ShowCar from "./Routes/cars/components/ShowCar";
import EditCar from "./Routes/cars/components/EditCar";
import FaqDetails from "./Routes/faq/components/FaqDetails";
import AddFaq from "./Routes/faq/components/AddFaq";
import EditFaq from "./Routes/faq/components/EditFaq";

function App() {
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
      component: ClientPage,
    },
    {
      name: "addClient",
      link: "/clients/AddClient",
      component: AddClient,
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
      name: "siginin",
      link: "/signin",
      component: SignIn,
    },
  ];

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.link} element={<route.component />} key={index} />
        ))}
      </Routes>
    </>
  );
}

export default App;
