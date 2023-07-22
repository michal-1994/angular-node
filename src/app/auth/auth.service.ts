import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly postsApi: string = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ email: string; password: string }>(
        this.postsApi + 'signup',
        authData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
