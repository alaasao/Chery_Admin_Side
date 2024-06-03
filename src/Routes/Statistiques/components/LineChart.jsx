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
export default function LineChart() {
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

  const getMonthNameInFrench = (monthNumber) => {
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return monthNames[monthNumber];
  };
  
  // Function to calculate monthly revenue
  const calculateMonthlyRevenue = (data) => {
    const revenueMap = new Map();
  
    data.forEach(item => {
      const date = new Date(item.Date_Achat);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0 is January, 11 is December
      const key = `${year}-${month}`;
  
      if (!revenueMap.has(key)) {
        revenueMap.set(key, 0);
      }
      revenueMap.set(key, revenueMap.get(key) + item.Prix_Vente);
    });
  
    const revenueArray = [];
    revenueMap.forEach((price, key) => {
      const [year, month] = key.split('-');
      revenueArray.push({
        month: getMonthNameInFrench(parseInt(month)), // Only month name
        price: price
      });
    });
  
    // Sort the array by year and month
    revenueArray.sort((a, b) => {
      const aMonth = a.month;
      const bMonth = b.month;
      const aYear = a.year;
      const bYear = b.year;
      
      const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
      const aMonthIndex = monthNames.indexOf(aMonth);
      const bMonthIndex = monthNames.indexOf(bMonth);
  
      if (aYear === bYear) {
        return aMonthIndex - bMonthIndex;
      }
      return aYear - bYear;
    });
  
    return revenueArray;
  };
  
  const resultArray=calculateMonthlyRevenue(data);
  return (
    <ScatterChart
    className="baba"
      width={360}
      height={360}
      margin={{
        top: 20,
        right: 15,
        bottom: 30,
        left: 15,
      }}
    >
      <CartesianGrid stroke={false}  />
      <XAxis  className="text-xs" axisLine={false} padding={{ top:10 }} tickSize={10} dataKey="month"   tickMargin={15}  angle={320}/>
      <YAxis type="number" axisLine={false} dataKey="price"  />
      <ZAxis type="number" range={[100]} />
      <Scatter
      
        name="A school"
        data={resultArray}
        fill="#D12621"
        line
        strokeWidth={6}
        shape="circle"
      />
    </ScatterChart>
  );
}
