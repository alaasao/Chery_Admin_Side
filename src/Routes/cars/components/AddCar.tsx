import React, { useEffect } from 'react'

import Car from './Car';
import { emptyCarModel} from './data';
import axios from 'axios';
import { CarsProps, EmptyCarModel } from '../Cars';

import toast from 'react-hot-toast';

const AddCar = () => {
  const [car, setCar] = React.useState<EmptyCarModel|CarsProps>(emptyCarModel);
  const [submit, setSubmit] = React.useState(false)
  async function add() {

    axios.post(
      import.meta.env.VITE_Main_ENDPOINT+"car",
      car,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(() => {
toast.success("Automobile Ajouté")
      // window.location.href = "/produits/cars"
    }).catch((err) => { 
 
      toast.error(err.response.data.message[0])
    })
  }
  useEffect(() => {
    if (submit) {
      add()
   
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
