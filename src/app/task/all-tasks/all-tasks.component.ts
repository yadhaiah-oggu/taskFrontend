
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort !: MatSort;

  tasks !: any;
  displayedColumns !: any;
  dataSource !: any;

  constructor(
    private router : Router,
    private taskService:TaskService
    ) {}
    datasourceFetched = new MatTableDataSource<any>();
    ngOnInit(){
      this.taskService.getAllTasks().subscribe(
        (result :any) =>{
          this.tasks = result;
          console.log(this.tasks);
          this.datasourceFetched.data = result;
          
        },
        (error: any) =>{
          console.log(error.message);
        }
      );
      
      this.displayedColumns = ['id', 'taskname','status','createdat', 'updatedat', 'actions'];
      this.dataSource = this.datasourceFetched;
    }
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
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  //    {
  //     id:4,
  //     taskname:"API testing",
  //     createdat:Date.now(),
  //     modifiedat:Date.now(),
  //     progress:"InProgress"
  //    },
  // ];

  // displayedColumns = ['id', 'taskname','createdat', 'modifiedat', 'progress','actions'];
  // dataSource = new MatTableDataSource(this.personal);

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.tasks;
    console.log(this.tasks);
    console.log(this.dataSource);
}

  applyFilter(filter : any) {
    let filterValue = filter?.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  deleteTask(taskid:number){
    const message: string = "Are you sure you want to delete?";
    const userConfirmation: boolean = window.confirm(message);

    if (userConfirmation) {
      // User clicked "OK"
      const myObserver = {
        next: (x: any) => {
        console.log(JSON.stringify(x));
        alert(x.message);
        this.ngOnInit();
      },
        error: (err: Error) => {
          console.error(err.message);
          this.ngOnInit();
        }
      };
      this.taskService.deleteTaskById(taskid).subscribe(myObserver);
      
    } else {
      // User clicked "Cancel"
      console.log("You clicked on cancel");
      
    }
  }
  editTask(taskid:number){
    this.router.navigateByUrl('/home/edit-task/' + taskid);
  }
  updateTaskStatus(task: any,status : String){
    task.status = status;

    const myObserver = {
      next: (x: any) => {console.log('updated task' + JSON.stringify(x));
      alert("Updated successfully");
      this.router.navigateByUrl('/home/all-tasks')
    },
      error: (err: Error) => console.error('Observer got an error: ' + err)
    };
    this.taskService.updateTask(task.id,task).subscribe(myObserver);
  }

}
