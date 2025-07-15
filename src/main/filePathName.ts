import eventEmitter from 'node:events';

export const emitter = new eventEmitter();

let dbPath = "C:\\Users\\shiva\\OneDrive\\Documents\\test\\jsotest.db";

export function getFilePath(){
  return dbPath;
}

export function setFilePath(newPath: string|undefined){
  if (!newPath){
    return;
  }
  dbPath = newPath;
  console.log('new dbPath is ', dbPath)
  emitter.emit('db-alter');
}

