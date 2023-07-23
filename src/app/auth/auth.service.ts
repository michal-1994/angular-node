import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly postsApi: string = 'http://localhost:3000/api/user/';
  private token: string;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.postsApi + 'signup', authData).subscribe((response) => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>(this.postsApi + 'login', authData)
      .subscribe((response) => {
        console.log(response);
        const token = response.token;
        this.token = token;
      });
  }
}
