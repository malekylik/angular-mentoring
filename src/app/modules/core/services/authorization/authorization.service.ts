import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { authorizationStorageToken } from '../../../../constants/authorization';
import { User } from '../../../../models/user/user.model';
import { Token } from '../../../../models/token.model';
import { AUTH_URL } from '../../constants/api';

@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(AUTH_URL, user);
  }

  logout(): void {
    localStorage.removeItem(authorizationStorageToken);
  }

  storeToken(token: string): void {
    localStorage.setItem(authorizationStorageToken, token);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(authorizationStorageToken));
  }

  getUserInfo(): string | null {
    const userInfo: string = localStorage.getItem(authorizationStorageToken);
    return userInfo ? userInfo.split(' ')[0] : userInfo;
  }
}
