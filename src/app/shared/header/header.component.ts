import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthgardService } from 'src/app/login/authgard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  backIcon: boolean;
  constructor(
    private authgardService: AuthgardService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.backIcon = false;
    if (this.activatedRoute.snapshot.params.name !== undefined) {
      this.backIcon = true;
    }
  }
  backToHome(): void {
    this.router.navigate(['/image/add']);
  }
  logOut(): void {
    this.authgardService.Logout();
    this.router.navigate(['']);
  }
}
