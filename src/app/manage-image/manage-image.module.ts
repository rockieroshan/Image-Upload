import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ViewImgComponent } from './view-img/view-img.component';
import { AddImgComponent } from './add-img/add-img.component';

@NgModule({
  declarations: [ViewImgComponent, AddImgComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FileUploadModule,
    DialogModule,
    TableModule
  ]
})
export class ManageImageModule {}
