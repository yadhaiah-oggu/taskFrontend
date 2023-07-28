import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _baseUrl = environment.baseUrl;
  
  // personal = [
  //   {
  //    id:1,
  //    taskname:"meeting with manager",
  //    createdat:Date.now(),
  //    modifiedat:Date.now(),
  //    progress:"Open"
  //   },
  //   {
  //     id:2,
  //     taskname:"fixing frontend Issues",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:3,
  //     taskname:"fixing backend Issues",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"Completed"
  //    },
  //    {
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:5,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:6,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:7,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:8,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:9,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  // ];
  
  
  constructor(private http:HttpClient) { }

  getAllTasks(){
    // const url = 'http://localhost:8080/api/tasks';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get( this._baseUrl + "tasks", { headers });
  }

  getTaskById(taskid: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get( this._baseUrl + "tasks/" + taskid, { headers });
  }

  addTask(taskDto : any) : Observable<any> {
    const url = 'http://localhost:8080/api/tasks' ;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post( this._baseUrl + 'tasks',taskDto, { headers }).pipe(
      tap((response : any) => {
        console.log(response)
      })
    )
  }

  deleteTaskById(taskid : number){
    const token = localStorage.getItem('token');
    console.log(taskid);
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete( this._baseUrl + "tasks/" + taskid, { headers }).pipe(
      tap((response : any) => {
        console.log(response)
      })
    )
  }

  updateTask(taskid : number , taskDto : any) : Observable<any> {
    const url = 'http://localhost:8080/api/tasks/' + taskid ;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this._baseUrl + 'tasks/' + taskid, taskDto , { headers }).pipe(
      tap((response : any) => {
        console.log(response)
      })
    )
  }
}
