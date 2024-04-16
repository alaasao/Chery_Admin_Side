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
import Car from "./Routes/cars/components/Car";
import SignIn from "./Routes/signin/SignIn";

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
      link: "/produits/cars/:id",
      component: Car,
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
