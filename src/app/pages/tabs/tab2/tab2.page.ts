
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import * as firebaseDatabase from 'firebase';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StorageEnum } from 'src/app/core/enums/storage/storage.enum';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { AnonymousModel } from 'src/app/core/model/anonymous.model';
import { AnonymousMessage } from 'src/app/core/model/anonymousMessage.model';
import { FireDataBaseService } from 'src/app/core/services/firebase/fire-database.service';
import { FireStorageService } from 'src/app/core/services/firebase/fire-storage.service';
import { AlertControllerService } from 'src/app/core/services/ionic-components/alert-controller.service';
import { snapshortToArray } from 'src/environments/environment';
import { UserModel } from '../../../core/model/user-model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  ref = firebaseDatabase.database().ref('message_realtime/');
  messageList: Array<AnonymousMessage> = [];
  model: AnonymousMessage = new AnonymousMessage();
  @BlockUI() blockUI: NgBlockUI;
  currentUser: UserModel = new UserModel();

  constructor(private datePipe: DatePipe,  private fireStorage: FireStorageService, private fireDatabase: FireDataBaseService, private storageHelper: StorageHelper, private alertCtrl: AlertControllerService) {
  }
  async ionViewWillEnter() {
    this.fireDatabase._document = 'message_realtime/'
    this.model.message = ''
    this.currentUser = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);
    this.ref.on('value', resp => {
      console.log(JSON.stringify(resp));
      this.messageList = snapshortToArray(resp) as any;
    });
  }


  async sendAnonymous(){

    if(this.model.message.trimStart().length == 0){
      this.alertCtrl.error('Mensaje vacío', 'El mensaje anonimo no puede estar vacío');
      return;
    }
    const user = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);
    debugger;
    this.model.user = user;
    this.model.date = this.datePipe.transform(new Date(), 'short') as any;
    const result = await this.fireDatabase.add(this.model);
    this.model = new AnonymousMessage();


  }

  madeByUser(message: AnonymousMessage){
    return message.user.email == this.currentUser.email;
  }


}

