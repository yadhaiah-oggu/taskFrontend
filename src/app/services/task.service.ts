import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  personal = [
    {
     id:1,
     taskname:"meeting with manager",
     createdat:Date.now(),
     modifiedat:Date.now(),
     progress:"Open"
    },
    {
      id:2,
      taskname:"fixing frontend Issues",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:3,
      taskname:"fixing backend Issues",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"Completed"
     },
     {
      id:4,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:5,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:6,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:7,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:8,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
     {
      id:9,
      taskname:"API testing",
      createdat:Date.now(),
      modifiedat:Date.now(),
      progress:"InProgress"
     },
  ];
  constructor() { }

  getAllTasks(){
    return this.personal;
  }

  getTaskById(taskid: number){
    let task = null;
    this.personal.forEach((element) => {
      if(element.id == taskid){
        task = element;
      }
    });
    return task;
  }
}
