import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from '../helpers/storage.helper';
import { StorageEnum } from '../enums/storage/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate, CanDeactivate<any> {


  /**
   *
   */
  constructor(private storageHelper: StorageHelper, private router: Router) {
    
  }



  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      
      console.log(route);
      const isLogin: boolean = await this.storageHelper.getStorageKey(StorageEnum.IS_LOGIN);
      if(!isLogin){
        this.router.navigate(['auth/login'])
        return false;
      }
    return true;
  }
  
}
