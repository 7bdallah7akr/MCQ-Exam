import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  service = inject(AuthService);
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.service.getRole().subscribe(res => {
      this.service.user.next(res);
    })
  }
}
