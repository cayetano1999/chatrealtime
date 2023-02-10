import { Injectable } from '@angular/core';
import * as fireStorage from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

     fireStorage = fireStorage.storage();
    location = 'anonimos/'
    constructor() {
        
    }

    async uploadImg(image: any){
        try {
            const imageName = 'prueba';
            return new Promise((resolve, reject) => {
              const pictureRef = this.fireStorage.ref(this.location + imageName);
              pictureRef
                .put(image)
                .then(function () {
                  pictureRef.getDownloadURL().then((url: any) => {
                    resolve(url);
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            });
          } catch (e) {}
    }
}