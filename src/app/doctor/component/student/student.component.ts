import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  data : any;
  dataTable : any;

  private service = inject(AuthService)

  ngOnInit(): void {
    this.getStudent()
  }

  getStudent(){
    this.service.geteUser('students').subscribe((res:any)=>{
      this.data = res?.map((student:any) => {
        if(student.subject){
          return student?.subject.map((sub:any) => {
            return {
              name : student.username,
              subjectName : sub.name,
              degree : sub.degree
            }
          })
        }else{
          return [{
            name : student.username,
            subjectName : '-',
            degree : '-'
          }]
        }
      })
      this.dataTable = [];
      this.data.forEach((item : any)=>{
        item.forEach((subItem : any) => {
         this.dataTable.push({
           name : subItem.name,
            subjectName : subItem.subjectName,
            degree : subItem.degree
        })
        })
      })
    });
  }
}
