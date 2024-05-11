import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Car from "./Car";
import { CarModel } from "./data";
import axios from "axios";
import { CarsProps } from "../Cars";

const EditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps>(CarModel);
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://axeiny.tech:4004/car/${id}`);
      setCar(response.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    submit();
  }, [sub]);
    function submit() {
   localStorage.setItem("car", JSON.stringify(car));
    axios
      .put(`https://axeiny.tech:4004/car/` + car._id, car, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ3ODE1MTUsImV4cCI6MTcxNzM3MzUxNX0.oRfHgjt6CNRIakX_ysrd20tvoZYf4RWvCTAbR_uh4bM`,
        },
      })
      .then((res) => {
        window.location.href = "/produits/cars";
      });
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Car car={car} setCar={setCar}  readOnly={false} setSub={setSub} />
    </div>
  );
};

export default EditCar;
