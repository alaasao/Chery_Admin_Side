import { easeInOut } from "framer-motion";
import React from "react";
import {useState ,useEffect} from "react"
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
export default function BarChartss() {
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
  const result=calculateMonthlyRevenue(data);
  return (
    <BarChart
    className="baba"
      isAnimationActive={true}  
      animationEasing={easeInOut}
      animationDuration={3000}
        width={370}
        height={360}
        data={result}
        margin={{
          top: 20,
          right: 10,
          left: 15,
          bottom: 30,
        }}
      
    >
      <CartesianGrid strokeDasharray="3 3" stroke={false} />
      <XAxis dataKey="month" padding={{}} axisLine={false} tickSize={0}  tickMargin={15} viewBox="0 0 700 700" angle={320}/>
      <YAxis axisLine={false} />
      <legend/>
      <Bar dataKey="price" barSize={10}  fill="#D12621" />
    </BarChart>
   
  );}