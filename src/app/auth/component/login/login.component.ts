import { Component, inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  user : any [] = [];
  typeValue : string   = '';

  private fb = inject(FormBuilder);
  private service = inject(AuthService);
  private router = inject(Router);
  constructor(){
    this.loginForm = this.fb.group({
      type : ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password:  ['', [Validators.required]]
    } )
  }

  ngOnInit(): void {
    this.loginForm.get('type')?.valueChanges.subscribe(value => {
      this.typeValue = value;
      this.getUser()
    });
  }
  getUser(){
    this.service.geteUser(this.typeValue).subscribe((res:any) => {
      this.user = res;
    })
  }  
  submit(){
    let index = this.user.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password);
    if(index == -1){
      Swal.fire({
        title: 'Error!',
        text: 'Email or Password is worng.',
        icon: 'error', 
        confirmButtonText: 'OK'
      });
    }else{
      const model ={
        username : this.user[index].username,
        role :this.typeValue,
        userID : this.user[index].id
      };
      this.service.login(model).subscribe((res:any) => {
        this.service.user.next(res);
        Swal.fire({
          title: 'Success!',
          text: 'Login success.',
          icon: 'success', 
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/subjects']);
      })
    }
  }


}