import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayPanelModule,
    DialogModule,
    ToastModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    NotificationComponent,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [],
  exports: [
    LoaderComponent,
    NotificationComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [MessageService]
})
export class SharedcomponentModule {}
