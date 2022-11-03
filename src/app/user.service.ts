import { Injectable } from '@angular/core';
import { Credentials } from './Credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtResponse } from './JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerURL = 'http://localhost:8080/users/register';
  private signInURL = 'http://localhost:8080/users/signIn';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  register(credentials: Credentials): void {
    this.http.post(this.registerURL, credentials).subscribe();
  }

  signIn(credentials: Credentials): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.signInURL, credentials);
  }

}
