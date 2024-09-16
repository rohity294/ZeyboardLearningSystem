import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() dataToParent: EventEmitter<string> = new EventEmitter<string>();
  isLoggedIn: boolean = false;
  selectedMenuItem: string = '';

  constructor() {
    if (sessionStorage.getItem('loggedInUsername')) {
      this.isLoggedIn = true;
    }
  }

  onRegisterClick() {
    this.receiveDataFromChild("Register");
  }

  onLoginClick() {
    this.receiveDataFromChild("Login");
  }

  onLogoutClick() {
    sessionStorage.removeItem('loggedInUsername');
    this.receiveDataFromChild("Home");
  }

  onHomeClick() {
    this.receiveDataFromChild("Home");
  }

  onAboutClick() {
    this.receiveDataFromChild("About");
  }

  receiveDataFromChild(data: string): void {
    this.selectedMenuItem = data;
    this.dataToParent.emit(this.selectedMenuItem);
  }
}
