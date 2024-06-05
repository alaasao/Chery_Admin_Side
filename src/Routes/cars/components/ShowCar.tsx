import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {CarModel} from './data';
import axios from 'axios';
import { CarsProps } from '../Cars';
import Cared from './Cared';
import Loading from '../../../utils/Loading';

const ShowCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState<CarsProps>(CarModel);
    const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState(false);
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(import.meta.env.VITE_Main_ENDPOINT + "car/"+id);
          setCar(response.data);
          setLoading(false);
        }
        fetchData();
    }, [id]);
    
    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <Cared carDefault={car} readOnly={true} submit={sub} setSubmit={setSub} setCar={setCar} />
        </div>
    )
}

export default ShowCar