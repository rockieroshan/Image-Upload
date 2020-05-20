import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoginModel } from '../../model/login-model';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthgardService } from '../authgard.service';
// {
//   "email": "eve.holt@reqres.in",
//   "password": "cityslicka"
// }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  showeye: boolean;
  switchlogintab: boolean;
  loginmodel: LoginModel;
  userEmail: string;
  loading: boolean;
  isLoginError: boolean;
  subscriptions: Subscription[] = [];
  unSubscribelogIn: Subscription;
  constructor(
    private auth: AuthgardService,
    public msg: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginmodel = new LoginModel();
    this.switchlogintab = true;
    this.showeye = false;
    this.userEmail = '';
    this.isLoginError = true;
  }
  loginUser({ email, password }): void {
    this.loading = true;
    const payload = {
      email,
      password
    };
    this.unSubscribelogIn = this.auth.logIn(payload).subscribe(
      res => {
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['/shop/view']);
        this.msg.addMessageToNotification(
          'success',
          'Success',
          'Logged in successfully'
        );
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.isLoginError = true;
        this.msg.addMessageToNotification(
          'error',
          'Error',
          'Please check your user-name/password'
        );
      }
    );
    this.subscriptions.push(this.unSubscribelogIn);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
