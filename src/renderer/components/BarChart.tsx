import { useEffect, useState, useRef } from "react";
import {Bar, Chart, getDatasetAtEvent, getElementsAtEvent, getElementAtEvent} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, elements, ChartData, InteractionItem } from 'chart.js';
import { data } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface daysDataInterface{
  date: string,
  username: string,
  net_time: number
}

interface tempUserData{
  label: string,
  data: number[],
  backgroundColor: string
}

type byUser={
  [username:string]: number[],
}

export default function BarChart({data: daysData, passData: passClickDeets}:{data: daysDataInterface[], passData: any}){
  const [chartData, getChartData] = useState<ChartData<"bar", (number | [number, number] | null)[]>>({labels: [], datasets: []});
  const [userChartData, getUserChartData] = useState<tempUserData[]>([]);
  const [users, obtainUsers] = useState<string[]>([]);
  const byDays:Partial<Record<string, daysDataInterface[]>> = Object.groupBy(daysData, element=>element.date);
  let userDataset:byUser = {};

  const colorStrings = ['#bbe7fe', '#d3b5e5', '#ffd4db', '#eff1db'];

  useEffect(()=>{
    window.api.getUsers().then((data)=>{let vals:string[] = Object.values(data).map((user: any)=>user.username); obtainUsers(vals)}).catch(err=>console.log(err));
  }, []);

  useEffect(()=>{
    if (!daysData) return;

    users.forEach((user)=>{
      userDataset[user] = new Array(Object.keys(byDays).length);
      userDataset[user].fill(0);
    });

    let days = Object.keys(byDays);
    for(let i=0; i<days.length; i++){
      let day = days[i]
      Object.values(byDays[day]).forEach((obj: daysDataInterface)=>{
        userDataset[obj.username][i]=Math.round(obj.net_time/60000)
      })
    }

    let pt_ = 0;
    let finalDataset:tempUserData[] = []
    Object.keys(userDataset).forEach(user=>{
      let dataset = {
        label: user,
        data: userDataset[user],
        backgroundColor: colorStrings[pt_]
      }
      finalDataset = [...finalDataset, dataset];
      pt_+=1
    })
    getUserChartData(finalDataset);
  }, [daysData]);


  let chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(()=>{
    getChartData({
      labels: Object.keys(byDays),
      datasets: userChartData
    });
  }, [userChartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales:
      {
        x: {
          stacked: true,
          grid: {color: 'rgba(168, 167, 167, 0.6)'}
        },
        y: {
          stacked: true,
          grid: {color: 'rgba(168, 167, 167, 0.6)'}
        },
      }
  }

  function printElementsOnClick(element: InteractionItem[]){
    if (element===undefined || element[0]===undefined){
      return 0;
    }

    let {datasetIndex, index} = element[0];
    console.log(chartData.labels?chartData.labels[index]:-1, chartData.datasets[datasetIndex].label , chartData.datasets[datasetIndex].data[index])
    passClickDeets([ chartData.datasets[datasetIndex].label, chartData.labels?chartData.labels[index]:-1]);
  }


  const onChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const {current: chart} = chartRef;
    console.log(chartData)
    console.log(byDays);

    if (!chart){
      return;
    }
    printElementsOnClick(getElementAtEvent(chart, event))
  }

  return (
    <Bar ref={chartRef} onClick={onChartClick} style={{height: "100%"}} data={chartData} options={options}/>
  )
}


