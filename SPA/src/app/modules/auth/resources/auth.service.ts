import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { IUser } from './IUser';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl: string = environment.baseUrl;
  baseUrl = 'https://localhost:44389/';

  helper = new JwtHelperService();

  currentUser: IUser = {
    Email: null,
    Password: null,
    ConfirmPassword: null,
  };
  constructor(private http: HttpClient, private router: Router) { }

  register(model: any) {
    // const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.baseUrl + 'api/Account/Register', model
      // , { headers: reqHeader }
    );
  }
  userAuthentication(email, password) {
    const data = 'username=' + email + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      // , 'No-Auth': 'True'
    });
    return this.http.post(this.baseUrl + 'Token', data, { headers: reqHeader });
  }
  login(model: any): Observable<IUser> {
    return this.http.post(this.baseUrl + 'api/Account/Login', model).pipe(
      map((response: any) => {
        const decodedToken = this.helper.decodeToken(response.token);
        this.currentUser.Email = decodedToken.Email;
        this.currentUser.Password = decodedToken.JobTitle;
        this.currentUser.ConfirmPassword = decodedToken.role;
        localStorage.setItem('token', response.token);
        return this.currentUser;
      })
    );
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    // const expired = !this.helper.isTokenExpired(token);
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.currentUser = {
      Email: null,
      Password: null,
      ConfirmPassword: null,
    };
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  getUserClaims() {
    return this.http.get(this.baseUrl + 'api/Values'
      , { headers: new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') }) }
    );
  }
  deleteUser(id) {
    return this.http.get(this.baseUrl + 'api/Values/' + id
      , { headers: new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') }) }
    );
  }
}
