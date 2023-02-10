import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/model/user-model';
import { StorageHelper } from '../../core/helpers/storage.helper';
import { StorageEnum } from '../../core/enums/storage/storage.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user: UserModel = new UserModel();
  constructor(private storageHelper: StorageHelper, private router: Router) {

  }
  async ngOnInit() {
    this.user = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);
  }

  showOption(){
    debugger;
    let emails = ['josuecayetanohd@gmail.com', 'RTORME7@GMAIL.COM'];
    return emails.find(e=> e.toLowerCase() == this.user.email.toLowerCase()) != undefined;
  }

  async out(){
      await this.storageHelper.clear();
      this.router.navigate(['auth/login']);
  }



}
