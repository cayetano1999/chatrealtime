import { Component, OnInit } from '@angular/core';
import * as firebaseDatabase from 'firebase';
import { AnonymousModel } from 'src/app/core/model/anonymous.model';
import { snapshortToArray } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page {

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
