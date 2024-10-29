import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userForm!:FormGroup;
  student : any [] = [];
  private fb = inject(FormBuilder);
  private services = inject(AuthService);
  private router = inject(Router);
  constructor(){
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required , Validators.minLength(4)]],
      confirmpassword: ['', Validators.required]
    } ,{
      validators : this.passwordMismatch
    });
  }
  passwordMismatch(form:FormGroup){
    const password = form.get('password');
    const confirmPassword = form.get('confirmpassword');
    return  password?.value === confirmPassword?.value ? null :{
      passwordMismatch :true 
    }

  }
  ngOnInit(): void {
    this.getstudent()
  }
  getstudent(){
    this.services.geteUser('students').subscribe((res:any) => {
      this.student = res;
    })
  }  
  submit(){
    const model = { 
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    let index = this.student.findIndex(item => item.email == this.userForm.value.email);
    if(index !== -1){
      Swal.fire({
        title: 'Error!',
        text: 'Email already exists',
        icon: 'error', 
        confirmButtonText: 'OK'
      });
    }else{
      this.services.createUser(model).subscribe(res=>{
        Swal.fire({
          title: 'Success!',
          text: 'Your account has been created successfully.',
          icon: 'success', 
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/login']);
      }) 
    }
  }
}


