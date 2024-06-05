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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTU0Mjc0NzIsImV4cCI6MTcxODAxOTQ3Mn0.JFRwofQjkscRSU-Im7_0dH6eUlI9Uq0gHTnDb8VMNis`,
     },
    }     
    ).then((res) => {
      setData(res.data);
    });
  }, []);  
  const calculateRevenueByModel = (data) => {
    const revenueMap = new Map();
  
    data.forEach(item => {
      if (!item.Car) return; // Skip entries without a car model
      const carModel = item.Car.Name;
  
      if (!revenueMap.has(carModel)) {
        revenueMap.set(carModel, 0);
      }
      revenueMap.set(carModel, revenueMap.get(carModel) + item.Prix_Vente);
    });
  
    const revenueArray = [];
    revenueMap.forEach((price, carModel) => {
      revenueArray.push({
        model: carModel,
        price: price
      });
    });
  
    // Sort the array by car model
    revenueArray.sort((a, b) => a.model.localeCompare(b.model));
  
    return revenueArray;
  };

const result =calculateRevenueByModel(data);
console.log(result)

  return (
    <ScatterChart
    className="baba"
      width={700}
      height={400}
      margin={{
        top: 60,
        right: 10,
        bottom: 30,
        left: 60,
      }}
    >
      <CartesianGrid stroke={false}  />
      <XAxis  dataKey="model"   tickMargin={15}  angle={340}/>
      <YAxis  type="number" dataKey="price"  />
      <ZAxis type="number" range={[100]} />
      <Scatter
        data={result}
        fill="#D12621"
        line
        strokeWidth={6}
        shape="circle"
        
      />
    </ScatterChart>
  );
}
