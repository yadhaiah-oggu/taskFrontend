import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 ]

  constructor(
    private taskService:TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {

    this.route.params.subscribe((params) => {
      this.taskid = params['taskid'];
    });
  }

  get f() {
    return this.form.controls;
  }  


  ngOnInit(){
    this.task = this.taskService.getTaskById(this.taskid);
    console.log(this.task);
    this.createForm();
  }
  createForm(){
    this.form = this.fb.group({
      taskname:['',Validators.required],
      createdat:[''],
      modifiedat:[''],
      progress:['',Validators.required]
    });
    this.form.patchValue(this.task);

    console.log(this.form.value);

    this.form.get('createdat')?.disable();
    this.form.get('modifiedat')?.disable();
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    
  }
  cancel(){
    this.router.navigate(['/home/all-tasks']);
  }

}
