/* eslint-disable prettier/prettier */

import { renderHook } from "@testing-library/react";
import { resolve } from "path";
import sqlite3 from "sqlite3";

export function selectUsers(dbPath: string): Promise<any[]>{
  // if (!dbPath) return;
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve, reject)=>{
    db.all(
      'select DISTINCT username from sessions order by username asc;',
      (err, rows)=>{
        if (err) reject(err);
        else resolve(rows);
      }
    )
  })
}

export function selectUserRanking(dbPath: string): Promise<any[]>{
    // if (!dbPath) return;
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject)=>{
      db.all(
        'select username, rank() over(order by total_time desc) as rank_no, total_time from ( select session_id, username, sum(difference) as total_time from sessions GROUP by username);',
        (err, rows)=>{
          if(err) reject(err);
          else resolve(rows)
        }
      )
    });
}

export function selectAvgUserTime(dbPath: string):Promise<any[]>{
    // if (!dbPath) return;
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject)=>{
      db.all(
        "select avg(difference) as 'avg' from sessions where date(intime) = date(CURRENT_TIMESTAMP) and outtime is not null;",
        (err, rows)=>{
          if(err) reject(err);
          else resolve(rows)
        }
      )
    });
}

export function selectUserTimePerDays(dbPath: string, days: number): Promise<any[]>{
  // if (!dbPath) return;
  const db = new sqlite3.Database(dbPath);
  return new Promise(
    (resolve, reject) => {
      db.all(`select date(intime) as 'date', username, sum(difference) as net_time from sessions where outtime is not NULL AND datetime(intime) BETWEEN datetime('now', '-${days-1} days', 'start of day', '+30 minutes', 'localtime') and datetime('now', '+1 day', 'start of day', '+29 minutes', 'localtime') GROUP by date(intime), username order by date(intime);`,
      (err, rows)=>{
        if (err) reject(err);
        else resolve(rows)
      })
    });
}

export function selectTotalTimeToday(dbPath: string): Promise<any[]>{
  // if (!dbPath) return;
  const db = new sqlite3.Database(dbPath)
  return new Promise(
    (resolve, reject) => {
      db.all(
        "select sum(difference) as total from sessions where date(intime) = date(CURRENT_TIMESTAMP) and outtime is not null;",
        (err, rows)=>{
          if (err) reject(err);
          else resolve(rows)
        }
      )
  });
}

export function selectUserTimeBreakdown(dbPath: string, username: string, date: string): Promise<any[]>{
  // if (!dbPath) return;
  const db = new sqlite3.Database(dbPath);
  return new Promise(
    (resolve, reject) => {
    db.all(
      `select * from sessions where username = '${username}' and date(intime) BETWEEN datetime(${date}, 'start of day', '+30 minutes', 'localtime') and
        datetime(${date}, '+1 day', 'start of day', '+29 minutes', 'localtime') order by intime asc;`,
        (err, rows)=> {
          if (err) reject(err)
          else resolve(rows)
        }
    )
  });
}
