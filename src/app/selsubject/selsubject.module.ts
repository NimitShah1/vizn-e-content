import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelsubjectPage } from './selsubject.page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SelsubjectPage,
  },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [SelsubjectPage],
})
export class SelsubjectPageModule {}
