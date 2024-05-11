import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CarModel } from "./data";
import axios from "axios";
import { CarsProps } from "../Cars";
import Cared from "./Cared";

const EditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps  >(CarModel);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://axeiny.tech:4004/car/${id}`);
      setCar(response.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    update();
  }, [submit]);
    function update() {
   localStorage.setItem("car", JSON.stringify(car));
    axios
      .put(`https://axeiny.tech:4004/car/` +  car._id, car, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      })
      .then(() => {
        window.location.href = "/produits/cars";
      });
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Cared carDefault={car} setCar={setCar}  readOnly={false} submit={submit} setSubmit={setSubmit} />
    </div>
  );
};

export default EditCar;
