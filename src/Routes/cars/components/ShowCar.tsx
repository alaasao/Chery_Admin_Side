import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Car from './Car';
import {CarModel} from './data';
import axios from 'axios';
import { CarsProps } from '../Cars';

const ShowCar = () => {
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
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
              <Car carDefault={car} readOnly={true}/>
        </div>
    )
}

export default ShowCar