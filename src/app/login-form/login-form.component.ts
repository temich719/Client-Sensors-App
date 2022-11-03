import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Credentials } from '../Credentials';
import { JwtResponse } from '../JwtResponse';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  login?: string;
  password?: string;

  errorMessage: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  handleError = (error: HttpErrorResponse) => {
    if(error.status === 403) {
      this.errorMessage = true;
    }
  };
  
  signIn(): void {
    this.userService.signIn(new Credentials(this.login, this.password)).subscribe((data: JwtResponse) => {
      sessionStorage.setItem("jwtToken", data.token);
      sessionStorage.setItem("role", data.role);
      this.router.navigateByUrl('/sensors');
    }, error => {
      this.handleError(error);
    });  

  }

}
