import { Component, OnInit , inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  service = inject(AuthService);

  user : any = null;
  ngOnInit(): void {
    this.service.user.subscribe((res:any)=>{
      if(res.role){
        this.user = res;
      }
    })
  }

  logOut(){
    const model = {};
    this.service.login(model).subscribe(res=>{
      this.user = null;
      this.service.user.next(res);
    })
  }
}
