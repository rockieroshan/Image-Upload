import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MANAGE } from '../consts/httpConsts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService {
  constructor(private http: HttpClient, private router: Router) {}

  logIn(payload): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, payload, {
      headers: {
        'X-META': MANAGE
      }
    });
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
