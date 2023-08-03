import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AllTasksComponent } from './task/all-tasks/all-tasks.component';
import { NewTaskComponent } from './task/new-task/new-task.component';
import { SessionTimeOutComponent } from './shared/session-time-out/session-time-out.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { AllUserTasksComponent } from './task/all-user-tasks/all-user-tasks.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UnauthorizedErrorComponent } from './shared/unauthorized-error/unauthorized-error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AllTasksComponent,
    NewTaskComponent,
    SessionTimeOutComponent,
    EditTaskComponent,
    ConfirmationDialogComponent,
    AllUserTasksComponent,
    UnauthorizedErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
