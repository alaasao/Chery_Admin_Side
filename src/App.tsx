import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Clients from "./Routes/clients/Clinets";
import ClientPage from "./Routes/clients/clientPage/ClientPage";

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
    }
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
