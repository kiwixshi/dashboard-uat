import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface breakDataInterface{
  difference: number,
  intime: string,
  outtime: string,
  session_id: number,
  username: string,
}

export default function GanttChart({breakData: userBreakData, passData: passUserTimeUsage}:{breakData: breakDataInterface[], passData:any}) {
  const [usageData, getUsageData] = useState<Array<Array<number[]>>>([])
  const [active, getActive] = useState<Array<number[]>>([]);
  const [idle, getIdle] = useState<Array<number[]>>([]);
  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x :{
        min: 360,
        max: 1800,
        ticks:{
          stepSize: 60,
          callback: function(value: number, index: number, ticks: number){
            return String(Math.floor(value/60)%24).padStart(2, '0') + ":00"
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };



  const labels = Object.keys(userBreakData).map((val)=>Number(val)+1);

  useEffect(()=>{
    const data1 = userBreakData.map((element)=>[Number(element.intime.substring(11, 13))*60, Number(element.outtime.substring(11, 13))*60]).sort((a, b)=>{if(a[0]==b[0]){return 0}return (a[0]>b[0])?1:-1});
    getActive(data1);
    let data2 = [];
    for(let i=0; i<data1.length-1; i++){
      data2.push([data1[i][1], data1[i+1][0]]);
    }
    getIdle(data2)
    let a = 0
    let i = 0
    data1.forEach((time)=>{
      a += Math.abs(time[1]-time[0])
    })
    data2.forEach((time)=>{
      i+= Math.abs(time[1]-time[0])
    })
    passUserTimeUsage([a, i])
  }, [userBreakData]);


  useEffect(()=>{
    let a = 0
    let i = 0
    active.forEach((time)=>{
      a += Math.abs(time[1]-time[0])
    })
    idle.forEach((time)=>{
      i+= Math.abs(time[1]-time[0])
    })
    passUserTimeUsage([a, i])
  }, [active, idle]);



  const data = {
    labels,
    datasets: [
      {
        label: 'active time',
        data: active,
        borderColor: 'rgb(99, 221, 255)',
        backgroundColor: 'rgb(99, 221, 255)',
      },
      {
        label: 'idle time',
        data: idle,
        borderColor: 'rgb(167, 168, 168)',
        backgroundColor: 'rgb(167, 168, 168)',
      },
    ],
  };

  return <Bar style={{width: "100%"}} options={options} data={data} />;
}
