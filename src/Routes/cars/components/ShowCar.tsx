import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {CarModel} from './data';
import axios from 'axios';
import { CarsProps } from '../Cars';
import Cared from './Cared';

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
            <Cared carDefault={car} readOnly={true} submit={sub} setSubmit={setSub} setCar={setCar} />
        </div>
    )
}

export default ShowCar