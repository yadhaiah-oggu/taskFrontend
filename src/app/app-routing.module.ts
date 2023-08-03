import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NewTaskComponent } from './task/new-task/new-task.component';
import { AllTasksComponent } from './task/all-tasks/all-tasks.component';
import { SessionTimeOutComponent } from './shared/session-time-out/session-time-out.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AllUserTasksComponent } from './task/all-user-tasks/all-user-tasks.component';
import { UnauthorizedErrorComponent } from './shared/unauthorized-error/unauthorized-error.component';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' }, // Default route to redirect to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-tasks' },
      { path: 'all-tasks', component: AllTasksComponent },
      { path: 'new-task', component: NewTaskComponent },
      { path: 'edit-task/:taskid', component: EditTaskComponent },
      { path: 'all-user-tasks', component: AllUserTasksComponent,canActivate:[AdminAuthGuard] },
    ], canActivate:[AuthGuard]
  },
  { path: 'session-timeout', component: SessionTimeOutComponent},
  { path: 'unauthorized-error', component: UnauthorizedErrorComponent},
  { path: '**', redirectTo: '/login' } // Fallback route for any unknown URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
