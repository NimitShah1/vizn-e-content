import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivekeyPage } from './activekey.page';

const routes: Routes = [
  {
    path: '',
    component: ActivekeyPage,
  },
];

@NgModule({
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [ActivekeyPage],
})
export class ActivekeyPageModule {}
