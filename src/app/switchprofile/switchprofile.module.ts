import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwitchprofilePageRoutingModule } from './switchprofile-routing.module';

import { SwitchprofilePage } from './switchprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwitchprofilePageRoutingModule
  ],
  declarations: [SwitchprofilePage]
})
export class SwitchprofilePageModule {}
