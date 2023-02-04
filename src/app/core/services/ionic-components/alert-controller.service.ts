import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
    providedIn: 'root'
})
export class AlertControllerService {
    @BlockUI() blockUI: NgBlockUI;

    constructor(private alertController: AlertController) {

    }

    async confirmation(
        ok: (params?: any) => void,
        message: string,
        title: string,
        confirmText: string,
        cancel: (params?: any) => void,
        ) {

        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            animated: true,
            message: message,
            mode:'ios',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        cancel();
                    }
                }, {
                    text: confirmText,
                    handler: () => {
                        ok();
                    }
                }
            ]
        });
        this.blockUI.stop();
        await alert.present();

    }

    async show(header: string, message: string, textbtn?:string) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: header,
            message: message,
            mode: 'ios',
            buttons: [
                {
                    text: textbtn || 'Ok',
                    handler: () => {
                    }
                },
            ]

        });
        this.blockUI.stop();
        await alert.present();

        const { role } = await alert.onDidDismiss();
    }

    async error(header: string, message: string) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: header,
            message: message,
            mode: 'ios',
            buttons: [
                {
                    text: 'Ok',
                    cssClass:'text-danger',
                    handler: () => {
                    }
                },
            ]

        });
        
        this.blockUI.stop();
        await alert.present();

        const { role } = await alert.onDidDismiss();
    }


}
