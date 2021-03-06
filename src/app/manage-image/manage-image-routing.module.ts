import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddImgComponent } from './add-img/add-img.component';
import { ViewImgComponent } from './view-img/view-img.component';

const routes: Routes = [
  { path: 'add', component: AddImgComponent },
  { path: 'view/:name', component: ViewImgComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageImageRoutingModule {}
