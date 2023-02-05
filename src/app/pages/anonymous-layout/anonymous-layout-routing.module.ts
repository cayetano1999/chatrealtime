import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonymousLayoutPage } from './anonymous-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AnonymousLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonymousLayoutPageRoutingModule {}
