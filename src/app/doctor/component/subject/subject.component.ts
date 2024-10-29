import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{
  subject : any;
  userRole : any;
  student : any[] = [];

  private service = inject(DoctorService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.getSubject();
    this.role();
  }

  getSubject(){
    this.service.getAllSubject().subscribe(res=>{
      this.subject = res;
    })
  }
  role(){
    this.authService.getRole().subscribe(res=>{
      this.userRole = res;
      this.getStudent();
    })
  }

  getStudent() {
    if(this.userRole?.role=='doctor'){
      this.authService.geteUser('students').subscribe((res: any) => {
          this.student = res;
      });
    }
}

onDelete(index: number): void {
  const subjectId = this.subject[index].id;
  this.subject.splice(index , 1);
  this.service.delete(subjectId).subscribe(res=>{
    Swal.fire({
      title: 'Success!',
      text: 'The Subject has been successfully deleted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  })
  const updatedStudents = this.student.map((item: any) => {
    item.subject = item.subject.filter((sub: any) => sub.id !== subjectId);
    return item;
  });
  updatedStudents.forEach((student: any) => {
    this.service.updateStuden(student, student.id).subscribe({
      next: (res: any) => {
      }
    });
  });
  this.student = updatedStudents;
}

}
