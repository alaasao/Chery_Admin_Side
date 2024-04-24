import React from 'react'

import Car from './Car';
import {CarModel} from './data';

const AddCar = () => {

  return (
    <div>
      <Car carDefault={CarModel} readOnly={false} />
    </div>
  )
}

export default AddCar
