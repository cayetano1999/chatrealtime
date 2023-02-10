import { Component, OnInit } from '@angular/core';
import { FireDataBaseService } from '../../../core/services/firebase/fire-database.service';
import { UserModel } from '../../../core/model/user-model';
import { Router } from '@angular/router';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { StorageEnum } from 'src/app/core/enums/storage/storage.enum';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.page.html',
  styleUrls: ['./select-avatar.page.scss'],
})
export class SelectAvatarPage implements OnInit {
  urlApiAvatar: string = 'https://anonymous-animals.azurewebsites.net/animal/'
  avatars: Array<string> = [
    'Alligator',
    'Chipmunk',
    'Gopher',
    'Liger',
    'Quagga',
    'Anteater',
    'Chupacabra',
    'Grizzly',
    'Llama',
    'Rabbit',
    'Armadillo',
    'Cormorant',
    'Hedgehog',
    'Manatee',
    'Raccoon',
    'Auroch',
    'Coyote',
    'Hippo',
    'Mink',
    'Rhino',
    'Axolotl',
    'Crow',
    'Hyena',
    'Monkey',
    'Sheep',
    'Badger',
    'Dingo',
    'Ibex',
    'Moose',
    'Shrew',
    'Bat',
    'Dinosaur',
    'Ifrit',
    'Narwhal',
    'Skunk',
    'Beaver',
    'Dolphin',
    'Iguana',
    'Orangutan',
    'Squirrel',
    'Buffalo',
    'Duck',
    'Jackal',
    'Otter',
    'Tiger',
    'Camel',
    'Elephant',
    'Kangaroo',
    'Panda',
    'Turtle',
    'Capybara',
    'Ferret',
    'Koala',
    'Penguin',
    'Walrus',
    'Chameleon',
    'Fox',
    'Kraken',
    'Platypus',
    'Wolf',
    'Cheetah',
    'Frog',
    'Lemur',
    'Pumpkin',
    'Wolverine',
    'Chinchilla',
    'Giraffe',
    'Leopard',
    'Python',
    'Wombat',
  ]
  avatarSelected: string = '';

  constructor(private fireDatabase: FireDataBaseService, private router: Router, private storageHelper: StorageHelper) {
    this.fireDatabase._document = 'users/'
   }

  ngOnInit() {
  }

  onSelectAvatar(avatar: string){
    this.avatarSelected = avatar;
    let element = document.getElementById(avatar);

    let existclass = document.getElementsByClassName('avatar-selected').item(0);

    if(existclass){
      existclass.classList.remove('avatar-selected');
    }
    element?.classList.add('avatar-selected');
  }

  async setUserUrlAvatar(){
    let info = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);

    let user = await this.fireDatabase.get('users/', 'email', info?.email);
    user = JSON.parse(JSON.stringify(user)) as any;
    let key = Object.keys(user)[0];
    let data = user[key as keyof Object] as any;
    data.urlPhotoAvatar = this.urlApiAvatar + this.avatarSelected;
    await this.fireDatabase.update(key, data);
    await this.storageHelper.setStorageKey(StorageEnum.USER_DATA, data);
    await this.storageHelper.setStorageKey(StorageEnum.USER_FIRE_KEY, key);

    this.router.navigate(['tabs/tab1']);

  }

}
