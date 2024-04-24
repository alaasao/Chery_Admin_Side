import { Route, Routes } from "react-router-dom";

import "./App.css";
import React from "react";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Clients from "./Routes/clients/Clinets";
import ClientPage from "./Routes/clients/clientPage/ClientPage";
import AddClient from "./Routes/clients/AddClient/AddClient";
import Cars from "./Routes/cars/Cars";
import Events from "./Routes/events/Events";
import Faq from "./Routes/faq/Faq";

import SignIn from "./Routes/signin/SignIn";
import AddCar from "./Routes/cars/components/AddCar";
import ShowCar from "./Routes/cars/components/ShowCar";
import EditCar from "./Routes/cars/components/EditCar";

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
      link: "/produits/car/:id",
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
