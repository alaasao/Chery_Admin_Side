import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Car from './Car';
import {CarModel} from './data';
import axios from 'axios';

const EditCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState(CarModel);
    const [loading, setLoading] = useState(true);

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
            <Car carDefault={car} readOnly={false} />
        </div>
    )
}

export default EditCar