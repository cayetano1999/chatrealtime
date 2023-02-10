import { Component, OnInit } from '@angular/core';
import * as firebaseDatabase from 'firebase';
import { AnonymousModel } from 'src/app/core/model/anonymous.model';
import { snapshortToArray } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  ref = firebaseDatabase.database().ref('anonymous_message/');
  anonymouslist: Array<AnonymousModel> = [];

  constructor() {}
  ionViewWillEnter(): void {
    this.ref.on('value', resp => {
      console.log(JSON.stringify(resp));
      this.anonymouslist = snapshortToArray(resp) as any;
      this.anonymouslist.reverse();
    });
  }
}
