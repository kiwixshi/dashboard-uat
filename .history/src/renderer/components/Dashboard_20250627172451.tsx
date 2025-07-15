/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [dayData, getDayData] = useState(null);

  useEffect(() => {
    window.api.getTimeToday().then(data => getDayData(data)).catch(err => console.log(err));
  }, []);

  return (<div className="b dashboard">
      <h1>Dashboard </h1>
      <div className="b stats">
        <div className="b"><p>1</p></div>
        <div className="b"><p>2</p></div>
        <div className="b"><p>3</p></div>
      </div>
      <div className="b bar-chart">
        <p>bar chart</p>
      </div>
      <div className="b split">
        <div className="b"><p>1</p></div>
        <div className="b"><p>2</p></div>
      </div>
    </div>);
}
