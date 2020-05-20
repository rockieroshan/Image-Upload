import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddImgComponent } from './add-img/add-img.component';
import { ViewImgComponent } from './view-img/view-img.component';

const routes: Routes = [
  { path: 'view', component: AddImgComponent },
  { path: 'view/:id', component: ViewImgComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageImageRoutingModule {}
