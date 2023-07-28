import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  
  taskid !: number;
  task !: any;
  form !: FormGroup;
  editError : string = '';
  submitted : boolean = false;

 progressOptions : string[] = [
  'Open',
  'InProgress',
  'Completed'
 ]

  constructor(
    private taskService:TaskService,
    private fb: FormBuilder,
    private router: Router
    ) 
  {

  }

  get f() {
    return this.form.controls;
  }  


  ngOnInit(){
    this.createForm();
  }
  createForm(){
    this.form = this.fb.group({
      taskname:['',Validators.required],
    });
  }

  onSubmit(){
      this.submitted = true;
      console.log(this.form.value);  
      const myObserver = {
        next: (x: any) => {console.log('added task' + JSON.stringify(x));
        alert("Added successfully")
        this.router.navigate(['/home/all-tasks']);
      },
        error: (err: Error) => console.error('Observer got an error: ' + err)
      };
      this.taskService.addTask(this.form.value).subscribe(myObserver);
    }
}
