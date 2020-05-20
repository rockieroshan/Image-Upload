import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { LoaderComponent } from './loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
