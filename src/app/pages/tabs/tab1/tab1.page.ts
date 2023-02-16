import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AnonymousModel } from 'src/app/core/model/anonymous.model';
import { FireStorageService } from '../../../core/services/firebase/fire-storage.service';
import { StorageHelper } from '../../../core/helpers/storage.helper';
import { AlertControllerService } from '../../../core/services/ionic-components/alert-controller.service';
import { FireDataBaseService } from '../../../core/services/firebase/fire-database.service';
import { StorageEnum } from '../../../core/enums/storage/storage.enum';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {

  comment: string = '';
  @BlockUI() blockUI: NgBlockUI;

  constructor(private datePipe: DatePipe, private fireStorage: FireStorageService, private fireDatabase: FireDataBaseService, private storageHelper: StorageHelper, private alertCtrl: AlertControllerService) {
  }
  ionViewWillEnter(): void {
    this.fireDatabase._document = 'anonymous_message/'
  }

  anonymousModel: AnonymousModel = new AnonymousModel();



  uploadPhoto(event: any) {
    if (event.target.files.length > 0) {
      this.blockUI.start('Cargando imágen...');
      this.fireStorage.uploadImg(event.target.files[0]).then(
        (res: any) => {
          if (res) {
            this.alertCtrl.show('Resultato', JSON.stringify(res));
            this.blockUI.stop();
            this.anonymousModel.urlPiture = res;
            console.log(res);
          }
        },
        (error: any) => {
          this.alertCtrl.error('Error', JSON.stringify(error));
        }
      );
    }
  }

  async sendAnonymous() {

    if (this.anonymousModel.comment.trimStart().length == 0) {
      this.alertCtrl.error('Mensaje vacío', 'El mensaje anonimo no puede estar vacío');
      return;
    }
    this.blockUI.start('Enviando anonimo...');
    const user = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);
    this.fireDatabase._document = 'anonymous_message/'
    this.anonymousModel.user = user;
    this.anonymousModel.date = this.datePipe.transform(new Date(), 'short') as any;
    const result = await this.fireDatabase.add(this.anonymousModel);
    this.blockUI.stop();
    this.alertCtrl.show('Anonimo enviado', 'Puedes enviar anonimos cuantas veces quieras. No hay limites!').then(res => {
      this.anonymousModel = new AnonymousModel();
    })


  }

}
