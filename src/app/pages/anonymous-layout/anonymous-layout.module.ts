import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonymousLayoutPageRoutingModule } from './anonymous-layout-routing.module';

import { AnonymousLayoutPage } from './anonymous-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnonymousLayoutPageRoutingModule
  ],
  declarations: [AnonymousLayoutPage]
})
export class AnonymousLayoutPageModule {}
