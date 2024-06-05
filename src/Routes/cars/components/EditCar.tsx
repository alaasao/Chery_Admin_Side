import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CarModel } from "./data";
import axios from "axios";
import { CarsProps } from "../Cars";
import Cared from "./Cared";
import toast from "react-hot-toast";
import Loading from "../../../utils/Loading";

const EditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps  >(CarModel);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(import.meta.env.VITE_Main_ENDPOINT+"car/" + id );
      setCar(response.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    update();
  }, [submit]);
    function update() {
      if (car.Images.length === 0) {
        toast.error("Veuillez ajouté au mois un image")
        return
  }
      id && setLoading(true)
     id && axios.put(import.meta.env.VITE_Main_ENDPOINT + "car/" + id, car, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      })
  .then(() => {
        
        toast.success("Automobile mise a jour")
        setTimeout(() => {
          window.location.href = "/produits/cars/"+car._id;
        }, 1000);
      
  }).catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message[0])
      });
  }
  if (loading) {
    return <Loading/>
  }

  return (
    <div>
      <Cared carDefault={car} setCar={setCar}  readOnly={false} submit={submit} setSubmit={setSubmit} />
    </div>
  );
};

export default EditCar;
