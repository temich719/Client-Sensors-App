import { Component, OnInit } from '@angular/core';
import { Credentials } from '../Credentials';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  login?: string;
  password?: string;

  message?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(new Credentials(this.login, this.password));
  }

}
