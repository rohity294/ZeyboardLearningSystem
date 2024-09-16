import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private requestHeaders = new HttpHeaders({
    //'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  async registerUser(userToRegister: User) {
    const backendUrl = 'http://localhost:8080/api/v1/user-data/register';
    return await this.http.post<any>(backendUrl, userToRegister).toPromise();
  }

  async loginUser(userAttemptingLogin: User) {
    const backendUrl = 'http://localhost:8080/api/v1/user-data/login';
    return await this.http.post<any>(backendUrl, userAttemptingLogin).toPromise();
  }
}
