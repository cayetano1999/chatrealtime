import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FireStorageService } from '../../../core/services/firebase/fire-storage.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  providers:[FireStorageService, DatePipe],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}