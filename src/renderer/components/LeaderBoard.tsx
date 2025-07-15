import { useState, useEffect } from "react";
import { getHrsMins } from "./Dashboard";

export default function Leaderboard({data: userRanks}:{data: Array<Object>[]}){
  const showRanks  = () => {
    console.log(userRanks);
  }

  return(
    <>
      <h1 style={{marginLeft: '0.4rem'}}>User Leaderboard</h1>
      <table>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Total Time (minutes)</th>
        </tr>
        {userRanks.map((element)=>(<tr>
          <td>{element.rank_no}</td>
          <td>{element.username}</td>
          <td>{getHrsMins(element.total_time, null)}</td>
        </tr>))}
      </table>
    </>
  )
}
