import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from '../../../core/services/firebase/fire-auth.service';
import { AlertControllerService } from '../../../core/services/ionic-components/alert-controller.service';
import { UserGoogleData } from '../../../core/model/google-user.model';
import { FireDataBaseService } from '../../../core/services/firebase/fire-database.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserModel } from '../../../core/model/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  googleUserData: UserGoogleData;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private authService: FireAuthService, private fireDataBaseService: FireDataBaseService, private router: Router, private alertCtrl: AlertControllerService) { 
    this.fireDataBaseService._document = 'users/';
  }

  ngOnInit() {
  }

  loginWithGoogle(){
    this.blockUI.start('Iniciando sesión con Google');
    this.authService.loginWithGoogle().then(res=> {
      console.log(res);
      this.googleUserData = res?.user as any;

      let userToFirebase: UserModel = new UserModel();
      userToFirebase.email = this.googleUserData.email;
      userToFirebase.name = this.googleUserData.displayName;
      userToFirebase.urlPhonoGoogle = this.googleUserData.photoURL;
      userToFirebase.urlPhotoAvatar = '';
      this.addUserInFirebase(userToFirebase);
    }).catch(err=> {
      this.alertCtrl.show('Acceso denegado', JSON.stringify(err?.message));
      this.blockUI.stop();
    });
  }

  redirectToRegister(){
    this.router.navigate(['auth/sign-up'])
  }

  async addUserInFirebase(userData: UserModel){
    debugger;
    let exist = await this.fireDataBaseService.get('users/','email', userData.email);
    exist = JSON.parse(JSON.stringify(exist));
    console.log(exist);

    if(!exist){
      const res = await this.fireDataBaseService.add(userData);
    }

    if(exist && userData.urlPhotoAvatar.length == 0){
      this.router.navigate(['auth/select-avatar'])
    }
    this.blockUI.stop();
  }

}
