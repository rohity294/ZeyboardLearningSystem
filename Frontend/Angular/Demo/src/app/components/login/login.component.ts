import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeService } from 'src/app/services/initialize.service';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private initializeService: InitializeService
  ) { }

  username: string = '';
  password: string = '';
  loginStatus: boolean = false;
  loginMessage: string = '';
  loginValidationPassed: boolean = false;
  loginValidationErrorMessage: string = '';

  validateLogin(): boolean {
    if (this.username === '' || this.password === '') {
      this.loginValidationPassed = false;
      this.loginValidationErrorMessage = 'One or more Login form fields left empty';
      return false;
    }
    this.loginValidationPassed = true;
    return true;
  }

  async login() {
    if (!this.validateLogin()) {
      return;
    }
    const userToLogin: User = {
      id: -1,
      username: this.username,
      password: this.password
    };

    await this.userService.loginUser(userToLogin).then(response => {
      if (response) {
        this.loginStatus = true;
        this.loginMessage = `Welcome, ${userToLogin.username}`;
        sessionStorage.setItem('loggedInUsername',userToLogin.username);
        this.router.navigate(['/home']);
      } else {
        this.loginStatus = false;
        this.loginMessage = 'Invalid Credentials!';
      }
    });

  }



}
