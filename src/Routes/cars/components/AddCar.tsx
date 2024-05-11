import React, { useEffect } from 'react'

import Car from './Car';
import { emptyCarModel} from './data';
import axios from 'axios';
import { CarsProps, EmptyCarModel } from '../Cars';

const AddCar = () => {
  const [car, setCar] = React.useState<EmptyCarModel|CarsProps>(emptyCarModel);
  const [submit, setSubmit] = React.useState(false)
  async function add() {

    axios.post(
      "https://axeiny.tech:4004/car/",
    car,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      }
    ).then((res) => {
console.log(res)
      // window.location.href = "/produits/cars"
    })
  }
  useEffect(() => {
    if (submit) {
      add()
      console.log(JSON.stringify(car))
      setSubmit(
        false
      )
    }
  },[submit])
  return (
    <div>
      <Car carDefault={car} readOnly={false} submit={submit} setSubmit={setSubmit} setCar={setCar} />
    </div>
  )
}

export default AddCar
