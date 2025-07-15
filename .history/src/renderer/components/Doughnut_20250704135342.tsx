import React from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart, Tooltip, ArcElement, Legend} from "chart.js";

Chart.register(Tooltip, ArcElement, Legend)

export default function Donut({userData: userTimeUsage}:{userData: Array<number>}){
  const options = {
    responsive: true,
    plugins: {
      title:{
        display: true,
        text: 'user time split up'
      }
    }
  }
  const data = {
    labels: ['active', 'inactive'],
    datasets: [{
        label: 'user time split',
        data: userTimeUsage,
        backgroundColor: ['rgb(99, 221, 255)', 'rgb(167, 168, 168)'],
    }],
  }
  return (
    <Doughnut data={data} options={options}/>
  )
}
