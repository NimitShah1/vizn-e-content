import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubvideolistPage } from './subvideolist.page';

const routes: Routes = [
  {
    path: '',
    component: SubvideolistPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubvideolistPageRoutingModule {}
