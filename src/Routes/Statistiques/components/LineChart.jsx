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

  const formattedData = data.map(item => ({
    ...item,
    Date_Achat: new Date(item.Date_Achat).toISOString().slice(0, 7), // YYYY-MM
    Prix_Vente: Number(item.Prix_Vente),
  }));
  
  // Filter data for the last six months
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  const filteredData = formattedData.filter(item => {
    const itemDate = new Date(item.Date_Achat);
    return itemDate >= sixMonthsAgo;
  });
  
  // Calculate the sum of prices per month
  const sumPerMonth = {};
  filteredData.forEach(item => {
    const month = item.Date_Achat;
    sumPerMonth[month] = (sumPerMonth[month] || 0) + item.Prix_Vente;
  });
  const result = Object.keys(sumPerMonth).map(month => ({
    month,
    price: sumPerMonth[month],
  }));
  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  result.map((item)=>{
    item.month = monthNames[new Date(item.month).getMonth()];
  })
  return (
    <ScatterChart
    className="baba"
      width={400}
      height={400}
      margin={{
        top: 60,
        right: 10,
        bottom: 15,
        left: 15,
      }}
    >
      <CartesianGrid stroke={false}  />
      <XAxis  dataKey="month"   tickMargin={15}  angle={340}/>
      <YAxis type="number" dataKey="price"  />
      <ZAxis type="number" range={[100]} />
      <Scatter
      
        name="A school"
        data={result}
        fill="#D12621"
        line
        strokeWidth={6}
        shape="circle"
      />
    </ScatterChart>
  );
}
