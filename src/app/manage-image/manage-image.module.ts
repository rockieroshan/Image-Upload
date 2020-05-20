import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedcomponentModule } from '../shared/sharedcomponent.module';
import { AddImgComponent } from './add-img/add-img.component';
import { ManageImageRoutingModule } from './manage-image-routing.module';
import { ViewImgComponent } from './view-img/view-img.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewImgComponent, AddImgComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FileUploadModule,
    DialogModule,
    FormsModule,
    TableModule,
    TooltipModule,
    SharedcomponentModule,
    ManageImageRoutingModule
  ]
})
export class ManageImageModule {}
