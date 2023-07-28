import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  taskid !: number;
  task !: any;
  form !: FormGroup;
  editError : string = '';
  submitted : boolean = false;
 progressOptions : string[] = [
  'Open',
  'InProgress',
  'Completed'
 ];

  constructor(
    private taskService:TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {
    this.route.params.subscribe((params) => {
      this.taskid = params['taskid'];
    });
    this.form = fb.group({
      taskname : FormControl ,
      status : FormControl
    })

  }

  get f() {
    return this.form.controls;
  }  

  ngOnInit(){
    const myObserver = {
      next: (x: any) => {
      console.log('fetched task' + JSON.stringify(x));
      this.task = x;
      this.createForm();
    },
      error: (err: Error) => console.error('Observer got an error: ' + err)
    };
    this.taskService.getTaskById(this.taskid).subscribe(myObserver);
    console.log(this.task);
  }
  createForm(){
    this.form = this.fb.group({
      taskname:['',Validators.required],
      status:['',Validators.required]
    });

    console.log("added task elements ", JSON.stringify(this.task))
    this.form.patchValue(this.task);
    console.log(this.form.value);
  }

  onSubmit(){
      this.submitted = true;
      console.log(this.form.value);
      const myObserver = {
        next: (x: any) => {console.log('updated task' + JSON.stringify(x));
        alert("Updated successfully");
        this.router.navigateByUrl('/home/all-tasks')
      },
        error: (err: Error) => console.error('Observer got an error: ' + err)
      };
      this.taskService.updateTask(this.taskid ,this.form.value ).subscribe(myObserver);
  }

  cancel(){
    this.router.navigate(['/home/all-tasks']);
  }
}