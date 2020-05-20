import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BackendInterceptor } from './interceptors/backend.interceptors';
import { ConfirmationService } from 'primeng/api';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

// Primeng components
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';

// shared components module
import { NotificationService } from './shared/notification/notification.service';
import { SharedcomponentModule } from './shared/sharedcomponent.module';
import { LoginComponent } from './login/longin-component/login.component';
import { AuthGuard } from './login/auth-gaurd';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    SharedcomponentModule,
    DialogModule,
    DropdownModule,
    OverlayPanelModule
  ],
  providers: [
    AuthGuard,
    NotificationService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
