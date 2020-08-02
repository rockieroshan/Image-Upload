import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../model/login-model';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuthgardService } from '../authgard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginform') loginform;
  showeye: boolean;
  loginmodel: LoginModel;
  userEmail: string;
  loading: boolean;

  constructor(
    private auth: AuthgardService,
    public msg: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginmodel = new LoginModel();
    this.showeye = false;
    this.userEmail = '';
    this.auth.Logout();
  }

  loginUser({ email, password }): void {
    this.loading = true;
    const token = 'QpwL5tke4Pnpja7X4';
    if (
      email === 'rakeshchandrasheker@gmail.com' &&
      password === 'Rakesh!123'
    ) {
      localStorage.setItem('userToken', token);
      this.router.navigate(['/image/add']);
      this.msg.addMessageToNotification(
        'success',
        'Success',
        'Logged in successfully'
      );
      this.loading = false;
    } else {
      this.loading = false;
      this.msg.addMessageToNotification(
        'error',
        'Error',
        'Please check your user-name/password'
      );
      this.loginform.reset();
    }
  }
  ngOnDestroy() {}
}
