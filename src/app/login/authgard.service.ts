import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService {
  constructor(private router: Router) {}

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
