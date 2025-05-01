import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  constructor() { 
  }

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
