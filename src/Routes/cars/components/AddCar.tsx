import React from 'react'

import Car from './Car';
import { emptyCarModel} from './data';

const AddCar = () => {
  const [car, setCar] = React.useState(emptyCarModel);
const [submit,setSubmit]=React.useState(false)
  return (
    <div>
      <Car carDefault={car} readOnly={false} submit={submit} setSubmit={setSubmit} setCar={setCar} />
    </div>
  )
}

export default AddCar
