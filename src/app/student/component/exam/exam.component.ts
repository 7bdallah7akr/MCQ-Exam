import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../doctor/service/doctor.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {

  subject : any ;
  userRole : any;
  subjectName :string = '';
  id : any;
  total : number = 0;
  showResult :boolean = false;
  studenInfo : any;
  studentSubject : any;
  valideExam : boolean = true;

  private service = inject(DoctorService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.getLogedUser();
    
  }
  getSubject(){
  this.service.getSubject(this.id).subscribe((res: any) => {
      this.subject = res;
    });
  }
  getLogedUser(){
      this.authService.getRole().subscribe((res:any)=>{
        this.userRole = res;
        this.getStudentData();
      });
  }

  
  getStudentData(){
    if(this.userRole?.role == 'students'){
      this.service.geteStuden(this.userRole.userID).subscribe((res:any)=>{
        this.studenInfo = res;
        this.studentSubject = res?.subject ?  res?.subject : [];
        this.cheackValideExam();
      });
    }
  }

  cheackValideExam(){
    this.studentSubject.forEach((x: any) => {
      if(x.id == this.id){
        this.valideExam = false;
        this.total = x.degree;
        Swal.fire({
          title: 'warning!',
          text: 'You have already completed this .',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        }
      });
  }

  getAnswer(index : number , value : string){
    this.subject.questions[index].studentAnswer = value;
  }

  onDelete(index: number) {
    this.subject?.questions.splice(index, 1);
      const model = {
        name: this.subject?.name,
        questions: this.subject?.questions
      };
      this.service.updateSubject(model, this.id).subscribe(res => {
        Swal.fire({
          title: 'Success!',
          text: 'The question has been successfully deleted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
  }

  getResult(){
    this.total = 0;
    this.subject.questions.forEach((question: any) => {
      if(question.studentAnswer == question.correctAnswer){
        this.total++;
      }
    });
    this.showResult = true;
    this.studentSubject.push({
      name : this.subject.name,
      id : this.id,
      degree : this.total
    });
    const model ={
      username: this.studenInfo.username,
      email: this.studenInfo.email,
      password: this.studenInfo.password,
      subject: this.studentSubject
    };
    this.service.updateStuden(model, this.studenInfo.id).subscribe(res=>{
      Swal.fire({
        title: 'Success!',
        text: 'The result was successfully registered.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
}
  
}