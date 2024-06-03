import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {useState, useEffect} from "react"
import axios from "axios";



export default function ModeleCart() {
  const [data, setData] = useState([
    {
      "_id": "66327c657dda6ce4e6067c9b",
      "Date_Achat": "2022-01-01T00:00:00.000Z",
      "Prix_Vente": 1000,
      "Contrat_De_Vente": "Contract X",
      "Garantie": "Warranty X",
      "Facture": "Invoice X",
      "Car": null,
      "Piece": null,
      "Client": null,
      "createdAt": "2024-05-01T17:31:17.966Z",
      "updatedAt": "2024-05-01T17:31:17.966Z",
      "__v": 0
  },]);
  useEffect(() => {
    axios.get(`https://axeiny.tech:4004/bon`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    }     
    ).then((res) => {
      setData(res.data);
    });
  }, []);  
  return (
    <ScatterChart
    className="baba"
      width={900}
      height={400}
      margin={{
        top: 60,
        right: 10,
        bottom: 15,
        left: 15,
      }}
    >
      <CartesianGrid stroke={false}  />
      <XAxis  dataKey="Car.Modele"   tickMargin={15}  angle={340}/>
      <YAxis  type="number" dataKey="Prix_Vente"  />
      <ZAxis type="number" range={[100]} />
      <Scatter
      
        name="A school"
        data={data}
        fill="#D12621"
        line
        strokeWidth={6}
        shape="circle"
      />
    </ScatterChart>
  );
}
