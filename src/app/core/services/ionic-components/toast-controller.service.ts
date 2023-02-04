import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastController: ToastController) {

  }

  async showToast(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 1000,
      position: 'top',
      color:'dark'
    });

    toast.present();
  }

  async showToastSuccess(message: string){
   const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 2000,
      position: 'top',
      color: 'primary',
      icon: 'checkmark'
    });
    toast.present();

  }

  async showToastError(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 2000,
      position: 'top',
      color: 'danger',
      icon: 'close'

    });
    
    toast.present();
  }

  async showToastWarning(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 5000,
      position: 'bottom',
      color: 'warning',
    });
    
    toast.present();
  }
}
