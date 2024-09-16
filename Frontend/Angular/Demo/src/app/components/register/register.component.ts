import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private userService: UserService
  ) { }

  username: string = '';
  password: string = '';
  registrationStatus: boolean = false;
  regValidationError: boolean = false;
  registrationSuccessMessage: string = '';
  regValidationErrorMessage: string = '';

  validateRegistration():boolean{
    if(this.username.length<3 || this.password.length<3){
      this.regValidationError = true;
      this.regValidationErrorMessage = 'username and password must be at least 3 characters long';
      return false;
    }
    return true;
  }

  async register() {
    if(!this.validateRegistration()){
      return;
    }
    const userToRegister: User = {
      id: -1,
      username: this.username,
      password: this.password
    }
    await this.userService.registerUser(userToRegister).then(response => {
      if (response) {
        this.regValidationError = false;
        this.regValidationErrorMessage = '';
        this.registrationStatus = true;
        this.registrationSuccessMessage = 'Sucessfully registered, please proceed to login!';
      }
    })
  }
}




