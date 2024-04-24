import React from 'react'
import { useParams } from 'react-router-dom';
import Car from './Car';
import {CarModel} from './data';

const AddCar = () => {
    // useEffect(() => {
    //     async function fetchData() {
    //       const response = await axios.get(`https://axeiny.tech:4004/car/${real_id}`);
    //       setCar(response.data);
    //       console.log(response.data);
    //       // ...
    //     }
    //     fetchData();
    //   }, [real_id]);
  return (
    <div>
      <Car carDefault={CarModel} readOnly={false} />
    </div>
  )
}

export default AddCar
