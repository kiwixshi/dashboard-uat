/* eslint-disable prettier/prettier */

import sqlite3 from "sqlite3";

export function selectUserTimePerToday(dbPath: string): Promise<any[]>{
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject)=>{
      db.all(
        'select * from sessions where date(intime) = date(current_timestamp);',
        (err, rows)=>{
          if(err) reject(err);
          else resolve(rows)
        }
      )
    });
}

export function selectEachUserTime(dbPath: string){
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject)=>{
      db.all(
        'select username, sum(difference) from sessions group by username;',
        (err, rows)=>{
          if(err) reject(err);
          else resolve(rows)
        }
      )
    });
}
