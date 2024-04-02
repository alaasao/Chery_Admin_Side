
import { useEffect, useState } from "react";
import Main from "./components/Main";
import Title from "../clients/components/Title";
import { CarsProps } from "./components/Main";
import axios from "axios";


const Cars = () => {
    const [data, setData] = useState<CarsProps[]  >([])
    useEffect(() => {
        axios.get("https://axeiny.tech:4004/car/")
            .then((response) => response.data)
            .then((json) => setData(json));
        console.log(data)
    },[])
  return (
    <div className="w-full ">
          <Title title="produits" />
      
      <Main data={data} />
    </div>
  );
};

export default Cars;
