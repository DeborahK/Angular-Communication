import { Injectable } from '@angular/core';

import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser | null = null;
  redirectUrl = '';

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
