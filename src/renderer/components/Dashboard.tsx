/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import Leaderboard from "./LeaderBoard";
import Line from "./GanttChart";
import GanttChart from "./GanttChart";
import Donut from "./Doughnut";

export function getHrsMins(millisecs: number, display: null | string){
      let hours = Math.floor(millisecs/3600000);
      let minutes = Math.floor(millisecs/60000);
      if(hours!=0){
        if (display){
          return `${hours} hours ${minutes - hours*60} ${ display } minutes`
        }
        return `${hours} hours ${minutes - hours*60} minutes`
      }
      return `${minutes} ${display} minutes`
  }

export default function Dashboard() {
  const [daysData, getDaysData] = useState([]);
  const [numDays, getNumDays] = useState<number>(1);
  const [userRanks, getRanks] = useState([]);
  const [currentTime, setTime] = useState(new Date());
  const [avgTime, getAvgTime] = useState([]);
  const [totalTime, getTT] = useState([]);
  const [clickDeets, getClickDeets] = useState<string[]>([]);
  const [userBreakData, getUserBreakData] = useState([]);
  const [userTimeUsage, getUserTimeUsage]=useState([]);


  useEffect(()=>{
    window.api.getTimeofDays(numDays).then(data => getDaysData(data)).catch(err => console.log(err));
  },[numDays]);

  useEffect(()=>{
    console.log('in parent');
    console.log(clickDeets);
    clickDeets.length&&window.api.getTimeBreakdown(clickDeets[0], clickDeets[1]).then(data => getUserBreakData(data)).catch(err => console.log(err));
    console.log(userBreakData);
  }, [clickDeets])

  useEffect(()=>{
    const fetchAll = ()=>{
      setTime(new Date());
      window.api.getUserRanks().then(data => getRanks(data)).catch(err => console.log(err));
      window.api.getAvgUserTime().then(data => getAvgTime(data)).catch(err => console.log(err));
      window.api.getTotalTimeTdy().then(data => getTT(data)).catch(err => console.log(err));
    }

    const ttId = setInterval(fetchAll, 1000);
    return ()=>clearInterval(ttId);
  }, []);

  const passClickDeets = (arg: Array<string>) => {
    getClickDeets(arg);
  }

  const passUserTimeUsage = (arg: []) => {
    getUserTimeUsage(arg);
  }


  const changeDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getNumDays(Number(event.target.value));
  }


  useEffect(()=>{
    console.log(userTimeUsage)
  }, [userBreakData]);


  return (
    <div className="dashboard">
      <h1>Dashboard </h1>
      <div className="stats">
        <div className="b"><p>{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</p></div>
        <div className="b">
          <p>{(avgTime[0])&&getHrsMins(avgTime[0]['avg'], 'avg')} today</p>
        </div>
        <div className="b">
          <p>{totalTime[0]&&getHrsMins(totalTime[0]['total'], 'total')} today</p>
          </div>
      </div>
      <div className="b bar-chart">
        <select id = "select-day" onChange={changeDays}>
          <option value={0} disabled={true}>select number of days</option>
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={14}>14</option>
        </select>
        <div className='bar'>
          {daysData&&<BarChart data={daysData} passData = {passClickDeets}/>}
        </div>
      </div>
      <div className="split">
        <div className="b" id="lb">
          <button onClick={()=>{window.open('https://www.crazygames.com/game/papas-freezeria')}}>
            show
          </button>
          <div>
            <Donut userData={userTimeUsage} username={clickDeets[0]}/>
          </div>
        </div>
        <div className="b">{userBreakData.length!=0?<GanttChart breakData = {userBreakData} username={clickDeets[0]} passData = {passUserTimeUsage}/>:<p>click on the bar graph to display user data</p>}</div>
      </div>
    </div>);
}
