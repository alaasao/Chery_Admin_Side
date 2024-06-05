import React, { useEffect, useState } from "react";

import Car from "./Car";
import { emptyCarModel } from "./data";
import axios from "axios";
import { CarsProps, EmptyCarModel } from "../Cars";

import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";

const AddCar = () => {
  const [car, setCar] = React.useState<EmptyCarModel | CarsProps>(
    emptyCarModel
  );
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = React.useState(false);
  async function add() {
    if (car.Images.length === 0) {
      toast.error("entrer une image au minimum");
      return;
    }
    setLoading(true);
    axios
      .post(import.meta.env.VITE_Main_ENDPOINT + "car", car, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Automobile Ajouté");

        setTimeout(() => {
          window.location.href = "/produits/cars";
        }, 1000);
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message[0]);
      });
  }
  useEffect(() => {
    if (submit) {
      add();

      setSubmit(false);
    }
  }, [submit]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Car
        carDefault={car}
        readOnly={false}
        submit={submit}
        setSubmit={setSubmit}
        setCar={setCar}
      />
    </div>
  );
};

export default AddCar;
