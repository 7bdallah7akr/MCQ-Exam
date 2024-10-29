import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient);
  user = new Subject();

  createUser(model:any){
   return this.http.post('http://localhost:3000/students',model)
  }
  login(model:any){
    return this.http.put('http://localhost:3000/login/1',model)
   }
  geteUser(type : string){
    return this.http.get('http://localhost:3000/'+type)
   }
   getRole(){
    return this.http.get('http://localhost:3000/login/1')
   }
}
