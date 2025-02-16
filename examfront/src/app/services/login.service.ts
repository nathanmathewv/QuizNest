import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Get the current user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Log in user
  public loginUser(token: any): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
    return true;
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  // Log out user
  public logout(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return true;
  }

  // Get token
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Set user details
  public setUser(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Get user details
  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
    }
    this.logout();
    return null;
  }

  // Get user role
  public getUserRole(): string {
    const user = this.getUser();
    return user?.authorities?.[0]?.authority || '';
  }
}
