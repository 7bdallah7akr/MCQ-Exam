import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { ExamComponent } from './student/component/exam/exam.component';
import { StudentComponent } from './doctor/component/student/student.component';
import { SubjectComponent } from './doctor/component/subject/subject.component';
import { NewExamComponent } from './doctor/component/new-exam/new-exam.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'exam/:id', component: ExamComponent },
    { path: 'students', component: StudentComponent },
    { path: 'subjects', component: SubjectComponent },
    { path: 'new-exam', component: NewExamComponent },
    { path: '**', redirectTo: 'subjects', pathMatch: 'full' }
];

