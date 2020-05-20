import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthgardService } from 'src/app/login/authgard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authgardService: AuthgardService,
    private router: Router
  ) {}

  ngOnInit() {}
  logOut(): void {
    this.authgardService.Logout();
    this.router.navigate(['']);
  }
}
