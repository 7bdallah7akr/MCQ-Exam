import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  http = inject(HttpClient);

  constructor() { }

  creatSubject(model:any){
    return this.http.post('http://localhost:3000/subjects',model)

  }
  updateSubject( model : any , id : any ){
    return this.http.put('http://localhost:3000/subjects/'+id,model)
  }
  delete(id : any){
    return this.http.delete('http://localhost:3000/subjects/'+id)
  }
  getAllSubject(){
    return this.http.get('http://localhost:3000/subjects/')
  }
  getSubject(id : any){
    return this.http.get('http://localhost:3000/subjects/'+id)
  }
  geteStuden(id : any){
    return this.http.get('http://localhost:3000/students/'+id)
  }
  updateStuden( model : any , id : any ){
    return this.http.put('http://localhost:3000/students/'+id,model)
  }  
  
}